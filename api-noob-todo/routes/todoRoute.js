import express from "express";
import {
  createTodo,
  deleteTodoByID,
  getAllTodos,
  getTodoByID,
  updateTodoByID,
} from "../controllers/todoController.js";

const route = express.Router();
route.get("/", getAllTodos);
route.get("/:id", getTodoByID);
route.post("/", createTodo);
route.delete("/:id", deleteTodoByID);
route.put("/:id", updateTodoByID);

export default route;
