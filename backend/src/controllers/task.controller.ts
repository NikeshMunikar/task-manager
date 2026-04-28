import { Request, Response, type NextFunction } from "express";
import {
  createTask,
  deleteTaskById,
  getTask,
  getTaskById,
  updateTaskById,
} from "../services/task.service";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  validateCreateTaskInput,
  validateUpdateTaskInput,
  validateTaskId
} from "../validators/task.validator";

export const createTaskController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user!.email;

    const validated = validateCreateTaskInput(req.body);
    if (!validated) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }
    const { title, description } = validated;

    const task = createTask(title, user, description);

    return res.status(201).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getTasksController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user!.email;

    const tasks = getTask(user);
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskByIdController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskId = validateTaskId(req.params.id);
    const user = req.user!.email;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "No task id was found in the request",
      });
    }
    const task = getTaskById(taskId, user);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No task found with this id for this user",
      });
    }
    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTaskByIdController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskId = validateTaskId(req.params.id);
    const user = req.user!.email;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "No task id was found in the request",
      });
    }
    const result = deleteTaskById(taskId, user);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No task found with this id or you are not authorized",
      });
    }
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const updateTaskController = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user!.email;
    const taskId = validateTaskId(req.params.id);
    const validated = validateUpdateTaskInput(req.body);

    if (!validated) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
      });
    }

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "No task id was found in the request",
      });
    }
    const task = updateTaskById(taskId, user, validated);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No task found with this id or you are not authorized",
      });
    }
    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};
