type Task = {
  id: string;
  title: string;
  description?: string;
  user: string;
  completed: boolean;
};

const tasks: Task[] = [];

export const createTask = (
  title: string,
  user: string,
  description?: string
) => {
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    ...(description !== undefined && {description}),
    user,
    completed: false,
  };

  tasks.push(newTask);
  return newTask;
};

export const getTask = (user: string): Task[] => {
  return tasks.filter((t) => t.user === user);
};

export const getTaskById = (id: string, user: string): Task | null => {
  const task = tasks.find((t) => t.id === id);
  //For IDOR
  if (!task) return null;
  if (task.user !== user) return null;

  return task;
};

export const deleteTaskById = (id: string, user: string): boolean | null => {
  const index = tasks.findIndex((task) => task.id === id && task.user === user);

  if (index === -1) return null;
  tasks.splice(index, 1);
  return true;
};

export const updateTaskById = (
  id: string,
  user: string,
  updates: Partial<Pick<Task, "title" | "description" | "completed">>,
): Task | null => {
  const task = tasks.find((t) => t.id === id && t.user === user);
  if (!task) return null;
  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.completed !== undefined) task.completed = updates.completed;

  return task;
};
