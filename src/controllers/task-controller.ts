import { Request, Response } from "express";
import { CreateTaskInput, Task, TaskStatus } from "../types/task";

const dataTasks: Task[] = [
  {
    id: 1,
    title: "Belajar Express.js",
    description: "Memahami routing dan controller.",
    status: "completed",
  },
  {
    id: 2,
    title: "Mengerjakan Task Management API",
    description: "Membuat endpoint CRUD menggunakan TypeScript.",
    status: "pending",
  },
  {
    id: 3,
    title: "Testing API dengan Postman",
    description: "Menguji seluruh endpoint dan status code.",
    status: "pending",
  },
];

const allowedStatuses: TaskStatus[] = ["pending", "completed"];

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const isValidStatus = (value: unknown): value is TaskStatus =>
  typeof value === "string" && allowedStatuses.includes(value as TaskStatus);

export class TaskController {
  // GET /tasks — mengambil seluruh task
  getTasks = (_req: Request, res: Response) => {
    return res.status(200).json({
      success: true,
      message: "Get all tasks success",
      data: dataTasks,
    });
  };

  // GET /tasks/:id — mengambil satu task berdasarkan ID
  getTaskById = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka bulat positif",
      });
    }

    const task = dataTasks.find((item) => item.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task tidak ditemukan",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get task detail success",
      data: task,
    });
  };

  // POST /tasks — menambahkan task baru
  createTask = (req: Request, res: Response) => {
    const { title, description, status } = req.body ?? {};

    if (!isNonEmptyString(title) || !isNonEmptyString(description)) {
      return res.status(400).json({
        success: false,
        message: "Title dan description wajib diisi dengan teks yang valid",
      });
    }

    if (!isValidStatus(status)) {
      return res.status(400).json({
        success: false,
        message: "Status wajib berupa 'pending' atau 'completed'",
      });
    }

    const newId =
      dataTasks.length > 0
        ? Math.max(...dataTasks.map((task) => task.id)) + 1
        : 1;

    const newTask: Task = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      status,
    };

    dataTasks.push(newTask);

    return res.status(201).json({
      success: true,
      message: "Create task success",
      data: newTask,
    });
  };

  // PUT /tasks/:id — memperbarui seluruh field task
  updateTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka bulat positif",
      });
    }

    const task = dataTasks.find((item) => item.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task tidak ditemukan",
      });
    }

    const { title, description, status } = req.body ?? {};

    if (!isNonEmptyString(title) || !isNonEmptyString(description)) {
      return res.status(400).json({
        success: false,
        message: "Title dan description wajib diisi dengan teks yang valid",
      });
    }

    if (!isValidStatus(status)) {
      return res.status(400).json({
        success: false,
        message: "Status wajib berupa 'pending' atau 'completed'",
      });
    }

    const updatedTask: Task = {
      ...task,
      title: title.trim(),
      description: description.trim(),
      status,
    };

    const index = dataTasks.findIndex((item) => item.id === id);
    dataTasks[index] = updatedTask;

    return res.status(200).json({
      success: true,
      message: "Update task success",
      data: updatedTask,
    });
  };

  // DELETE /tasks/:id — menghapus task berdasarkan ID
  deleteTask = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "ID harus berupa angka bulat positif",
      });
    }

    const index = dataTasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Task tidak ditemukan",
      });
    }

    const deletedTask = dataTasks.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      message: "Delete task success",
      data: deletedTask,
    });
  };
}

export default new TaskController();
