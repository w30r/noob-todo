import React from "react";
import { FaTrash } from "react-icons/fa";

export const TaskCard = ({
  id,
  title,
  description,
  created_at,
  isDone,
  handleDeleteTodo,
  toggleStatus,
}) => {
  return (
    <div
      onClick={() => toggleStatus(id)}
      className="flex items-center justify-between h-auto hover:scale-[1.01] duration-200 w-full bg-white/10 backdrop-blur-xl shadow-xl outline-1 outline-white rounded-xl p-8"
    >
      <div>
        <h1 className="text-3xl">{title}</h1>
        <h1>{description}</h1>
        <h1 className="text-gray-400 ">{created_at}</h1>
        {isDone ? (
          <h1 className="bg-green-300 text-black font-bold p-1 mt-2 rounded-full w-[100px] text-center">
            Done
          </h1>
        ) : (
          <h1 className="bg-red-300 text-black font-bold p-1 mt-2 rounded-full w-[100px] text-center">
            Not done
          </h1>
        )}
      </div>
      <div>
        <FaTrash
          onClick={() => handleDeleteTodo(id)}
          className="text-3xl duration-150 hover:text-red-500"
        />
      </div>
    </div>
  );
};
