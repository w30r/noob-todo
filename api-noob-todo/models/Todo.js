import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  isDone: { type: Boolean, default: false },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;
