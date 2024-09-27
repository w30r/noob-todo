"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { TaskCard } from "./components/TaskCard";

function App() {
  const [todo, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const apiUrl = import.meta.env.API_URL || "http://localhost:3002/api";

  function getTodoTasks() {
    axios
      .get(apiUrl)
      .then((res) => setTodos(res.data))
      .catch((error) => console.error(error))
      .finally(() => console.log(todo));
  }

  function handleDeleteTodo(id) {
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => getTodoTasks())
      .catch((error) => console.error(error));
  }

  function handleCreateTodo() {
    axios
      .post(apiUrl, {
        title: newTodoTitle,
        description: newTodoTitle,
      })
      .then(() => getTodoTasks())
      .catch((error) => console.error(error));

    setNewTodoTitle("");
  }

  function toggleStatus(id) {
    axios
      .put(`${apiUrl}/${id}/toggle`)
      .then(() => getTodoTasks())
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getTodoTasks();
  }, []);

  return (
    <div className="bg-gray-900 backdrop-blur-xl h-screen w-screen text-white flex flex-col justify-center items-center p-80 overflow-scroll ">
      <div className="h-auto w-full bg-white/10 rounded-lg p-24 flex flex-col justify-center items-center gap-4 ">
        <h1 className="text-3xl font-semibold sm:text-5xl">MEOR NOOB</h1>
        <h1 className="text-3xl font-semibold sm:text-5xl -mt-5">TODO LIST</h1>
        <input
          type="text"
          placeholder="Enter new task here"
          className="outline-none text-black w-1/2 h-12 rounded-xl border-2 border-black/40 px-8 py-2"
          onChange={(e) => setNewTodoTitle(e.target.value)}
          value={newTodoTitle}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateTodo();
            }
          }}
        />
        <div id="Tasks" className="flex flex-col w-3/4 gap-5">
          {todo
            .slice()
            .reverse()
            .map((x) => (
              <TaskCard
                key={x._id}
                id={x._id}
                title={x.title}
                description={x.description}
                created_at={x.created_at}
                isDone={x.isDone}
                handleDeleteTodo={handleDeleteTodo}
                toggleStatus={toggleStatus}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
