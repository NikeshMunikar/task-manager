import { api } from "./axios";

export type AuthResponse = {
  success: boolean;
  token: string;
  user: {
    email: string;
  }
};

const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
};

const register = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/register", { email, password });
  return res.data;
};

export const authApi = {
  login,
  register,
};
