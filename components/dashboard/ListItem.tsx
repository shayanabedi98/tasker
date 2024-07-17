"use client";

import { IoIosCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";

type Props = {
  listIndex: number;
  listName: string;
  listId: string;
  handleViewEdit: (str1: string, str2: string) => void;
  handleNotViewEdit: (str: string) => void;
  submitEdit: (str: string) => void;
  viewEdit: boolean;
  viewEditId: string;
  editValue: string;
  handleEditChange: (str: string) => void;
  handleDelete: (str: string) => void;
  handleListIndex: (num: number) => void;
  editedName: string;
};

export default function ListItem({
  listIndex,
  listName,
  listId,
  viewEdit,
  editedName,
  viewEditId,
  handleViewEdit,
  handleNotViewEdit,
  handleListIndex,
  handleEditChange,
  submitEdit,
  handleDelete,
}: Props) {
  return (
    <div className="bg-primary flex h-20 w-full items-center justify-between gap-4 p-4">
      {viewEdit && viewEditId == listId ? (
        <div className="flex gap-2">
          <input
            placeholder={listName}
            value={editedName}
            onChange={(e) => handleEditChange(e.target.value)}
            className="rounded-sm p-1 font-semibold text-black"
          />
          <button
            className="bg-bgDark flex w-10 items-center justify-center text-4xl"
            onClick={() => submitEdit(listId)}
          >
            <IoIosCheckmark />
          </button>
          <button
            className="bg-bgDark flex w-10 items-center justify-center text-2xl"
            onClick={() => handleNotViewEdit(listId)}
          >
            <IoMdClose />
          </button>
        </div>
      ) : (
        <div className="font-bold">{listName}</div>
      )}
      <div className="flex items-center gap-2">
        {viewEdit && viewEditId === listId ? (
          ""
        ) : (
          <button
            className="text-[26px]"
            onClick={() => {
              handleViewEdit(listId, listName);
              handleListIndex(listIndex);
            }}
          >
            <HiPencilAlt />
          </button>
        )}
        <button className="text-[22px]" onClick={() => handleDelete(listId)}>
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
}
