"use client";

import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

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
      {isEdit && name === clickedListName && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-slate-600 bg-opacity-50">
          <div className="px-6 relative flex h-96 w-64 flex-col items-center justify-center gap-3 rounded-md bg-bgLight shadow-md">
            <p className="text-2xl font-semibold">Edit List</p>
            <input
              onChange={(e) => {
                setEditedNameSample(e.target.value);
              }}
              type="text"
              value={editedNameSample}
              placeholder={clickedListName}
              maxLength={20}
            />
            <div className="flex h-48 w-48 items-center justify-center break-all rounded-md border-2 border-secondary bg-primary p-1 text-center">
              <span className="text-xl font-semibold">{editedNameSample ? editedNameSample : name}</span>
            </div>
            <button
              className="btn"
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
      <div className="relative flex h-48 w-48 items-center justify-center rounded-md border-2 border-secondary bg-primary p-1 text-center shadow-md shadow-neutral-800 transition lg:hover:scale-105">
        <p className="break-all text-2xl font-semibold">
          {isLoading && clickedListName == name ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <Link className="lg:hover:underline" href={`/dashboard/${name}`}>
              {name}
            </Link>
          )}
        </p>
        <div className="absolute right-1 top-1 flex gap-2 text-3xl">
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
