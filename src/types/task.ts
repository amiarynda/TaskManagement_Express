export type TaskStatus = "pending" | "completed";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};

export type CreateTaskInput = {
  title: string;
  description: string;
  status: TaskStatus;
};
