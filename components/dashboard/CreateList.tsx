"use client";

import { IoMdClose } from "react-icons/io";
import { IoIosAlert } from "react-icons/io";

type Props = {
  inputValue: string;
  errorMessage: boolean;
  handleListInputChange: (str: string) => void;
  handleAddNewList: () => void;
  handleIsCreate: () => void;
};

export default function CreateList({
  inputValue,
  errorMessage,
  handleListInputChange,
  handleAddNewList,
  handleIsCreate,
}: Props) {
  return (
    <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-slate-600 bg-opacity-50">
      <div className="relative flex h-64 w-64 flex-col items-center justify-center gap-3 rounded-md bg-bgLight shadow-md">
        {errorMessage && (
          <div className="absolute bottom-1 left-0 flex w-full items-center justify-center gap-x-2">
            <span>Field cannot be empty</span>
            <IoIosAlert className="text-2xl text-red-500" />
          </div>
        )}
        <p className="text-2xl font-semibold">Create List</p>

        <p>{"(Max. 20 characters)"}</p>
        <input
          className="rounded-rm text-black"
          type="text"
          onChange={(e) => handleListInputChange(e.target.value)}
          value={inputValue}
          maxLength={20}
        />
        <button
          className="rounded-md border-2 border-secondary bg-primary p-1 text-lg font-semibold"
          onClick={handleAddNewList}
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
  );
}
