import { Request, Response } from "express";
import { createTask,deleteTaskById,getTask, getTaskById } from "../services/task.service";
import { AuthRequest } from "../middleware/auth.middleware";

export const createTaskController = (req: AuthRequest, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const user = req.user?.email;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const task = createTask(title, description, user);

    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getTasksController = (req:AuthRequest,res:Response)=>{
  try{
    if(!req.user?.email){
      return res.status(401).json({
        success:false,
        message:"No user email found in token"
      })
    }
    const result = getTask(req.user.email);
  if(result.length===0){
    return res.status(404).json({
      success:false,
      message:"No tasks found for this user"
    })
  }
  return res.status(200).json({
    success:true,
    tasks:result
  })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:`Server error: ${error instanceof Error?error.message:"Unknown error"}`
    })
  }
}

export const getTaskByIdController = (req:AuthRequest,res:Response)=>{
  try{
    const taskId = req.params.id ;
    if(!req.user?.email){
      return res.status(401).json({
        success:false,
        message:"No user email found in token"
      })
    }
    if(!taskId || typeof taskId !== "string"){
      return res.status(400).json({
        success:false,
        message:"No task id was found in the request"
      })
    }
    const result = getTaskById(taskId,req.user.email);
    if(!result){
      return res.status(404).json({
        success:false,
        message:"No task found with this id for this user"
      })
    }
    return res.status(200).json({
      success:true,
      result
    })

    
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:`Server error: ${error instanceof Error?error.message:"Unknown error"}`
    })
  }
}

export const deleteTaskByIdController = (req:AuthRequest,res:Response)=>{
  try{
    const taskId = req.params.id;
     if(!req.user?.email){
      return res.status(401).json({
        success:false,
        message:"No user email found in token"
      })
    }
    if(!taskId || typeof taskId !== "string"){
      return res.status(400).json({
        success:false,
        message:"No task id was found in the request"
      })
    }
    const result = deleteTaskById(taskId,req.user.email);
    if(!result){
      return res.status(404).json({
        success: false,
        message:"No task found with this id or you are not authorized"
      })
    }
    return res.status(200).json({
      success:true,
      message:"Task deleted successfully"
    })
  }catch(error){
    res.status(500).json({
      success:false,
      message:`Server error: ${error instanceof Error?error.message:"Unknown error"}`
    })
  }
}