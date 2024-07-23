"use client";

import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useState } from "react";

type Props = {
  handleIsEdit: (id: string) => void;
  handleEditTask: (
    obj: { title: string; description: string },
    taskId: string,
  ) => void;
  title: string;
  taskId: string;
  description?: string | null;
  isEdit: boolean;
  clickedTask: string;
  handleDeleteTask: (taskId: string) => void;
};

export default function TaskItem({
  handleIsEdit,
  handleEditTask,
  title,
  description,
  taskId,
  isEdit,
  clickedTask,
  handleDeleteTask,
}: Props) {
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });

  const handleEditInputValues = (val: string, name: string) => {
    setInputValues({ ...inputValues, [name]: val });
  };

  return (
    <div>
      {isEdit && clickedTask === title && (
        <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-slate-600 bg-opacity-50">
          <div className="relative flex h-64 w-64 flex-col items-center justify-center gap-3 rounded-md bg-bgLight shadow-md">
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
            <button onClick={() => handleEditTask(inputValues, clickedTask)}>
              Update
            </button>
          </div>
        </div>
      )}
      <div className="flex h-16 w-96 items-center justify-between rounded-md border-2 border-primary bg-secondary p-2 shadow-md shadow-neutral-800 transition lg:hover:scale-105 lg:hover:bg-primary">
        <div className="w-full">
          <p className="text-xl font-semibold">{title}</p>
          <p>{description ? description : "-"}</p>
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <button onClick={() => handleIsEdit(title)}>
            <MdEdit />
          </button>
          <button onClick={() => handleDeleteTask(title)}>
            <IoMdTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
