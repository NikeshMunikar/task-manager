import {Request, Response } from "express";

const errorMiddleware = (err:unknown, req:Request, res: Response)=>{
  const message = err instanceof Error?err.message:"Unknown error"
  console.error("Error: ", message)
  res.status(500).json({
    success: false,
    error: message,
  })
}

export default errorMiddleware