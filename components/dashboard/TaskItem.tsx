"use client";

import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

type Props = {
  handleIsEdit: (id: string) => void;
  handleEditTask: (
    obj: { title: string; description: string },
    taskId: string,
  ) => void;
  handleIsCompleted: (bool: boolean, title: string) => void;
  handleDeleteTask: (taskName: string) => void;
  title: string;
  taskId: string;
  description?: string | null;
  isEdit: boolean;
  clickedTask: string;
  isCompleted: boolean;
};

export default function TaskItem({
  handleIsEdit,
  handleEditTask,
  handleIsCompleted,
  handleDeleteTask,
  title,
  description,
  isEdit,
  clickedTask,
  isCompleted,
}: Props) {
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });
  const [isCompletedState, setIsCompletedState] = useState(isCompleted);

  const handleEditInputValues = (val: string, name: string) => {
    setInputValues({ ...inputValues, [name]: val });
  };

  return (
    <div>
      {isEdit && clickedTask === title && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-slate-600 bg-opacity-50">
          <div className="relative flex h-64 w-64 flex-col items-center justify-center gap-3 rounded-md bg-bgLight px-6 shadow-md">
            <p className="text-2xl font-semibold">Edit Task</p>
            <label className="self-start" htmlFor="title">
              Title
            </label>
            <input
              onChange={(e) =>
                handleEditInputValues(e.target.value, e.target.name)
              }
              name="title"
              type="text"
              value={inputValues.title}
              placeholder={title}
              required
              maxLength={28}
            />
            <label className="self-start" htmlFor="title">
              Description {"(optional)"}
            </label>
            <input
              onChange={(e) =>
                handleEditInputValues(e.target.value, e.target.name)
              }
              name="description"
              type="text"
              value={inputValues.description}
              placeholder={description || ""}
              maxLength={28}
            />
            <button
              className="btn"
              onClick={() => handleEditTask(inputValues, clickedTask)}
            >
              Update
            </button>
            <button
              className="absolute right-1 top-1 z-10 text-2xl"
              onClick={() => {
                handleIsEdit("");
                setInputValues({ title: "", description: "" });
              }}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
      <div
        className={`flex h-16 w-96 border-2 items-center justify-between rounded-md border-primary bg-secondary p-2 ${isCompletedState ? "" : "border-2 shadow-md"} shadow-neutral-800 transition lg:hover:scale-105 lg:hover:bg-primary`}
      >
        <div className="w-full">
          <p
            className={`text-xl font-semibold ${isCompletedState ? "text-neutral-200 line-through" : ""}`}
          >
            {title}
          </p>
          <p
            className={`${isCompletedState ? "text-neutral-200 line-through" : ""}`}
          >
            {description ? description : "-"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <button
            className={`${isCompletedState ? "bg-text text-primary" : ""} rounded-md border-2 p-1 text-lg`}
            onClick={() => {
              const newCompletedState = !isCompletedState;
              setIsCompletedState(newCompletedState);
              handleIsCompleted(newCompletedState, title);
            }}
          >
            <FaCheck />
          </button>
          <button
            className={`${isEdit && clickedTask === title ? "bg-text text-primary" : ""} rounded-md border-2 p-1 text-lg`}
            onClick={() => handleIsEdit(title)}
          >
            <MdEdit />
          </button>
          <button onClick={() => handleDeleteTask(title)}>
            <IoMdTrash className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
