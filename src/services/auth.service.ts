import argon2 from "argon2";
import jwt from "jsonwebtoken";
import "dotenv/config";

type User = {
  email: string;
  passwordHash: string;
};

const users: User[] = [];

type AuthResponse = {
  success: boolean;
  user?: {
    email: string;
  };
  token?: string;

};

export const registerUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    return {
      success: false,
    };
  }
  const passwordHash = await argon2.hash(password);
  users.push({ email, passwordHash });
  return {
    success: true,
    user: {
      email,
    },
  };
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const user = users.find((u) => u.email === email);
  if (!user) {
    return {
      success: false,
    };
  }

  const isValid = await argon2.verify(user.passwordHash, password);
  if (!isValid) {
    return {
      success: false,
    };
  }

  const payload = {
    email: user.email
  }

  const secret = process.env.JWT_SECRET as string;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }
  const token = jwt.sign(payload, secret, {expiresIn: "1h"});

  return {
    success: true,
    user: {
      email: user.email,
    },
    token,
  };
};
