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
      {isEdit && clickedTask === taskId && (
        <div>
          <input
            onChange={(e) =>
              handleEditInputValues(e.target.value, e.target.name)
            }
            name="title"
            type="text"
            value={inputValues.title}
            placeholder={title}
            required
          />
          <input
            onChange={(e) =>
              handleEditInputValues(e.target.value, e.target.name)
            }
            name="description"
            type="text"
            value={inputValues.description}
            placeholder={description || ""}
          />
          <button onClick={() => handleEditTask(inputValues, clickedTask)}>
            Update
          </button>
        </div>
      )}
      <div className="flex min-w-52 justify-between gap-2 rounded-md bg-primary p-1">
        <div>
          <p className="text-2xl font-bold">{title}</p>
          <p>{description}</p>
        </div>
        <div className="flex items-center gap-2 text-2xl">
          <button onClick={() => handleIsEdit(taskId)}>
            <MdEdit />
          </button>
          <button onClick={() => handleDeleteTask(taskId)}>
            <IoMdTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
