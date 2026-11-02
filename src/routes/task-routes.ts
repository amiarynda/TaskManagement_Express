import { Router } from "express";
import TaskController from "../controllers/task-controller";

const routes = Router();

routes.get("/", TaskController.getTasks);
routes.get("/:id", TaskController.getTaskById);
routes.post("/", TaskController.createTask);
routes.put("/:id", TaskController.updateTask);
routes.delete("/:id", TaskController.deleteTask);

export default routes;
