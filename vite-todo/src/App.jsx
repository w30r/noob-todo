import { useState } from "react";
import { TaskCard } from "./components/TaskCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-900 backdrop-blur-xl h-auto w-screen text-white flex flex-col justify-center items-center py-56 overflow-scroll px-[800px]">
      <div className="h-auto w-full bg-white/10 rounded-lg p-24 flex flex-col justify-center items-center gap-4 ">
        <h1 className="text-5xl">MEOR NOOB: TODO LIST</h1>
        <input
          type="text"
          placeholder="Enter new task here"
          className="outline-none text-black w-1/2 h-12 rounded-xl border-2 border-black/40 px-8 py-2"
        />
        <div id="Tasks" className="flex flex-col w-3/4 gap-5">
          <TaskCard
            title="Create express.js API endpoint"
            description="This is the description just make it look nice please"
            created_at="2024-08-03 16:00"
            isDone={false}
          />
          <TaskCard
            title="title"
            description="description"
            created_at="created_at"
            isDone={true}
          />
          <TaskCard
            title="title"
            description="description"
            created_at="created_at"
            isDone={false}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
