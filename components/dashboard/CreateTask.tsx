"use client";

import { IoMdClose } from "react-icons/io";

type InputValues = {
  title: string;
  description: string;
};

type Props = {
  inputValues: InputValues;
  handleTaskInputChange: (value: string, name: string) => void;
  handleAddNewTask: (obj: InputValues) => void;
  handleIsCreate: () => void;
  isCreate: boolean;
};

export default function CreateTask({
  handleTaskInputChange,
  handleAddNewTask,
  handleIsCreate,
  inputValues,
  isCreate,
}: Props) {
  return (
    isCreate && (
      <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-slate-600 bg-opacity-50">
        <div className="relative flex h-64 w-64 flex-col items-center justify-center gap-3 rounded-md bg-bgLight px-6 shadow-md">
          <p className="text-2xl font-semibold">Create Task</p>
          <label className="self-start" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            onChange={(e) =>
              handleTaskInputChange(e.target.value, e.target.name)
            }
            value={inputValues.title}
            maxLength={28}
          />
          <label className="self-start" htmlFor="description">
            Description {"(optional)"}
          </label>
          <input
            type="text"
            name="description"
            onChange={(e) =>
              handleTaskInputChange(e.target.value, e.target.name)
            }
            value={inputValues.description}
            maxLength={28}
          />
          <button
            className="btn"
            onClick={() => {
              handleAddNewTask(inputValues);
              handleIsCreate();
            }}
          >
            Create
          </button>
          <button
            className="absolute right-1 top-1 z-10 text-2xl"
            onClick={handleIsCreate}
          >
            <IoMdClose />
          </button>
        </div>
      </div>
    )
  );
}
