type CreateTaskInput = {
  title: string;
  description?: string;
};

type UpdateTaskInput = {
  title?:string;
  description?:string;
  completed?:boolean;
}

export const validateCreateTaskInput = (
  data: unknown,
): CreateTaskInput | null => {
  if (!data || typeof data !== "object") return null;

  const { title, description, completed } = data as Record<string, unknown>;

  if (completed !== undefined) return null;

  if (typeof title !== "string" || title.trim() === "" || title.length > 100) return null;

  if (description !== undefined && typeof description !== "string") return null;

 const result: CreateTaskInput = {
   title: title.trim(),
 }

 if(description !== undefined){
  result.description = description;
 }

 return result;
};

export const validateUpdateTaskInput = (
  data:unknown,
): UpdateTaskInput | null =>{
  if (!data || typeof data !== "object") return null;

  const {title,description,completed} = data as Record<string, unknown>;

  if (title === undefined && description === undefined && completed === undefined) return null;

  const result: UpdateTaskInput = {};
  if (title !== undefined){
  if (typeof title !== "string" || title.trim() === "") return null;
    result.title = title.trim();
  }

  if (description !== undefined){
    if (typeof description !=="string") return null;
    result.description = description;
  }

  if(completed !== undefined){
    if (typeof completed !== "boolean") return null;
    result.completed = completed;
  }
  return result;
}

export const validateTaskId = (id: unknown): string | null =>{
  if (typeof id !== "string" || id.trim() ==="") return null;
  return id.trim();
}