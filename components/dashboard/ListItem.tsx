"use client";

import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";

type Props = {
  name: string;
  isEdit: boolean;
  isLoading: boolean;
  id: string;
  clickedListName: string;
  handleDeleteList: (name: string, id: string) => void;
  handleIsEdit: (name: string) => void;
  handleEditList: (name: string, editedNameSample: string) => void;
};

export default function ListItem({
  name,
  isEdit,
  isLoading,
  id,
  clickedListName,
  handleDeleteList,
  handleIsEdit,
  handleEditList,
}: Props) {
  const [editedNameSample, setEditedNameSample] = useState("");
  return (
    <div>
      {isEdit && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-slate-600 bg-opacity-50">
          <div className="relative flex h-80 w-64 flex-col items-center justify-center gap-3 rounded-md bg-bgLight shadow-md">
            <input
              className="w-48 rounded-sm px-1 text-black"
              onChange={(e) => {
                setEditedNameSample(e.target.value);
              }}
              type="text"
              value={editedNameSample}
              placeholder={clickedListName}
              maxLength={20}
            />
            <div className="flex h-48 w-48 items-center justify-center rounded-md border-2 border-secondary bg-primary p-1 text-center">
              <span className="text-2xl font-semibold">{editedNameSample}</span>
            </div>
            <button
              className="rounded-md border-2 border-secondary bg-primary p-1 text-lg font-semibold"
              onClick={() => handleEditList(name, editedNameSample)}
            >
              Update
            </button>
            <button
              className="absolute right-1 top-1 z-10 text-2xl"
              onClick={() => {
                handleIsEdit("");
                setEditedNameSample("");
              }}
            >
              <IoMdClose />
            </button>
          </div>
        </div>
      )}
      <div className="relative flex h-48 w-48 items-center justify-center rounded-md border-2 border-secondary bg-primary p-1 text-center transition lg:hover:scale-105">
        <p className="cursor-pointer text-2xl font-semibold">
          {isLoading && clickedListName == name ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <span className="lg:hover:underline">{name}</span>
          )}
        </p>
        <div className="absolute right-1 top-1 flex gap-2 text-2xl">
          <MdEdit
            className="cursor-pointer rounded-sm bg-bgLight p-1"
            onClick={() => handleIsEdit(name)}
          />
          <IoMdTrash
            className="cursor-pointer rounded-sm bg-bgLight p-1"
            onClick={() => handleDeleteList(id, name)}
          />
        </div>
      </div>
    </div>
  );
}
