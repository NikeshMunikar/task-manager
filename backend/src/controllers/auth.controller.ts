import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await registerUser(email, password);
    res.status(result.success?201:400).json(result);
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(result.success?200:401).json(result);
  } catch (error) {
    next(error);
  }
};
