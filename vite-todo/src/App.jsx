"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { TaskCard } from "./components/TaskCard";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

function App() {
  const [todo, setTodos] = useState([]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
    axios.put(`${apiUrl}/${id}`, {
      isDone: !todo.find((x) => x.id === id).isDone,
    });
  }

  useEffect(() => {
    getTodoTasks();
  }, []);

  return (
    <div className="bg-gray-900 backdrop-blur-xl h-screen w-screen text-white flex flex-col justify-center items-center p-80 overflow-scroll ">
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          Open dialog
        </Button>

        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-lg duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="text-3xl font-medium text-white "
                >
                  Todo archived.
                </DialogTitle>
                <p className="mt-2 text-sm/6 text-white/50">
                  You wil be damned.
                </p>
                <p className="-mt-2 text-sm/6 text-white/50">Goddamned.</p>
                <div className="mt-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Got it, thanks!
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </>
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
                // toggleStatus={toggleStatus}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
