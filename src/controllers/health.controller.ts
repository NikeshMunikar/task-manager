import { Request,Response } from "express";
import { getHealthStatus } from "../services/health.service";

export const healthController = (req:Request, res:Response):void=>{
  const result = getHealthStatus();
  res.status(200).json(result)
}