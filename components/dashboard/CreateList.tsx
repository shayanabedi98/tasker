"use client";

import { IoMdClose } from "react-icons/io";

type Props = {
  inputValue: string;
  handleListInputChange: (str: string) => void;
  handleAddNewList: () => void;
  handleIsCreate: () => void;
};

export default function CreateList({
  inputValue,
  handleListInputChange,
  handleAddNewList,
  handleIsCreate,
}: Props) {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-slate-600 bg-opacity-50">
      <div className="relative flex h-64 w-64 flex-col items-center justify-center gap-3 rounded-md bg-bgLight px-6 shadow-md">
        <p className="text-2xl font-semibold">Create List</p>
        <p>{"(Max. 20 characters)"}</p>
        <input
          type="text"
          onChange={(e) => handleListInputChange(e.target.value)}
          value={inputValue}
          maxLength={20}
        />
        <button className="btn" onClick={handleAddNewList}>
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
  );
}
