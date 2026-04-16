import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createTaskController, getTasksController, getTaskByIdController, deleteTaskByIdController } from "../controllers/task.controller";

const router = Router();

router.post("/",authMiddleware, createTaskController);

router.get("/",authMiddleware, getTasksController);

router.get("/:id", authMiddleware, getTaskByIdController);

router.delete("/:id",authMiddleware,deleteTaskByIdController)

export default router;

