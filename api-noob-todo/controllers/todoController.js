import Todo from "../models/Todo.js";

export const getAllTodos = async (req, res) => {
  try {
    const result = await Todo.find();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
  }
};

export const getTodoByID = async (req, res) => {
  try {
    console.log(`🌟 Finding a todo with _id: ${req.params.id}`);
    const result = await Todo.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Todo not found" });
    }
    console.log(`🌟 Found it!`, result);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Something went wrong", data: err });
  }
};

export const createTodo = async (req, res) => {
  try {
    console.log("🌟 Creating a new Todo...");
    const result = await Todo.create(req.body);
    console.log("🌟 Todo created", result);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong", data: err });
  }
};

export const deleteTodoByID = async (req, res) => {
  try {
    console.log(`🌟 Deleting a todo with _id: ${req.params.id}`);
    const result = await Todo.findByIdAndDelete(req.params.id);
    console.log(`🌟 Deleted it!`, result);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Something went wrong", data: err });
  }
};
export const updateTodoByID = async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Something went wrong", data: err });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(req.params.id, {
      isDone: !req.body.isDone,
    });
    if (req.body.isDone === undefined) {
      return res.status(400).json({ message: "isDone is required" });
    }
    return res.status(200).json({ result, message: "isDone toggled" });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: "Something went wrong", data: err });
  }
};
