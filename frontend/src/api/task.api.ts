import { api } from "./axios";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description?: string;
}

type GetTasksResponse = {
  success: boolean;
  tasks: Task[];
}

type TaskResponse = {
  success: boolean;
  task: Task;
}


const getTasks = async (): Promise<GetTasksResponse> => {
  const res = await api.get<GetTasksResponse>("/tasks");
  return res.data;
};

const createTask = async (
  title: string,
  description?: string,
): Promise<TaskResponse> => {
  const res = await api.post<TaskResponse>("/tasks", { title, description });
  return res.data;
};

const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

const updateTask = async (
  id: string,
  title?: string,
  description?: string,
  completed?: boolean,
): Promise<TaskResponse> => {
  const res = await api.patch<TaskResponse>(`/tasks/${id}`, {
    title,
    description,
    completed,
  });
  return res.data;
};

export const taskApi = {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
}