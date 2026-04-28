import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction)=>{
  const method = req.method;
  const url = req.originalUrl;
  const time = new Date().toLocaleString();
  
  console.log(`[${time}] ${method} ${url}`)

  next()
}

export default loggerMiddleware