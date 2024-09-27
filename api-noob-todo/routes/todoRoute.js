import express from "express";
import {
  createTodo,
  deleteTodoByID,
  getAllTodos,
  getTodoByID,
  updateTodoByID,
  toggleStatus,
} from "../controllers/todoController.js";

const route = express.Router();
route.get("/", getAllTodos);
route.get("/:id", getTodoByID);
route.post("/", createTodo);
route.delete("/:id", deleteTodoByID);
route.put("/:id", updateTodoByID);
route.put("/:id/toggle", toggleStatus);

export default route;
