"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { TaskCard } from "./components/TaskCard";

function App() {
  const [todo, setTodos] = useState([]);

  function getTodoTasks() {
    axios
      .get("http://localhost:3002/api")
      .then((res) => setTodos(res.data))
      .catch((error) => console.error(error));
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
        />
        <div id="Tasks" className="flex flex-col w-3/4 gap-5">
          {todo.map((x) => (
            <TaskCard
              key={x._id}
              title={x.title}
              description={x.description}
              created_at={x.created_at}
              isDone={x.isDone}
            />
          ))}
          {/* <TaskCard
            title="Create express.js API endpoint"
            description="This is the description just make it look nice please"
            created_at="2024-08-03 16:00"
            isDone={false}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
