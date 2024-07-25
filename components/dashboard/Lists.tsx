"use client";

import { ListType } from "@/types/types";
import { useState } from "react";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";
import CreateList from "./CreateList";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  lists: ListType;
};

export default function Lists({ lists }: Props) {
  const [listsData, setListsData] = useState(lists);
  const [inputValue, setInputValue] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [clickedListName, setClickedListName] = useState("");
  const router = useRouter();

  const handleAddNewList = async () => {
    if (!inputValue.trim()) {
      toast.error("List name cannot be empty.")
      return;
    }

    if (listsData.some((i) => i.name === inputValue)) {
      toast.error("List name already exists. Pick a new one :)");
      return;
    }

    if (inputValue) {
      try {
        toast.loading("Loading", { duration: 500 });
        const res = await fetch("/api/lists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputValue,
          }),
        });

        if (res.ok) {
          toast.success("Created new list.");
          const newList = {
            id: uuidv4(),
            name: inputValue,
          };
          setListsData((prev) => [...prev, newList]);
          setInputValue("");
          setIsCreate(false);
          router.refresh();
        }
      } catch (error) {
        setInputValue("");
        setIsCreate(false);
      }
    }
  };

  const handleEditList = async (listName: string, newListName: string) => {
    if (!newListName) {
      toast.error("List name cannot be empty.")
    } else {

    }

    if (listsData.some((i) => i.name === newListName)) {
      toast.error("List name already exists. Pick a new one :)");
      return;
    }

    if (newListName) {
      try {
        const res = await fetch("/api/lists", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            listName,
            newListName,
          }),
        });

        if (res.ok) {
          toast.success("Updated list");
          setListsData((prev) =>
            prev.map((i) =>
              i.name === listName ? { ...i, name: newListName } : i,
            ),
          );
          setIsEdit(false);
          setClickedListName("");
          router.refresh();
        }
      } catch (error) {
        setIsEdit(false);
        setClickedListName("");
      }
    }
  };

  const handleDeleteList = async (id: string, name: string) => {
    const confirmed = window.confirm(
      "Are you sure you want do delete this list and all of its tasks?",
    );

    if (confirmed) {
      try {
        setClickedListName(name);
        setIsLoading(true);
        const res = await fetch("/api/lists", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
          }),
        });

        if (res.ok) {
          setIsLoading(false);
          setClickedListName("");
          setListsData((prev) => prev.filter((list) => list.name !== name));
          router.refresh();
          toast.success("List deleted");
        }
      } catch (error) {
        setIsLoading(false);
        setClickedListName("");
      }
    }
  };

  const handleListInputChange = (str: string) => {
    setInputValue(str);
  };

  const handleIsCreate = () => {
    setIsCreate(!isCreate);
  };

  const handleIsEdit = (name: string) => {
    setIsEdit(!isEdit);
    setClickedListName(name);
  };

  return (
    <div className="">
      <div className="flex justify-center gap-4"></div>
      {isCreate && (
        <div className="flex">
          <CreateList
            handleIsCreate={handleIsCreate}
            inputValue={inputValue}
            handleListInputChange={handleListInputChange}
            handleAddNewList={handleAddNewList}
          />
        </div>
      )}
      <div className="mt-16 grid grid-cols-4 gap-10">
        {listsData.map((i, index) => (
          <ListItem
            handleEditList={handleEditList}
            isEdit={isEdit}
            clickedListName={clickedListName}
            handleIsEdit={handleIsEdit}
            key={index}
            isLoading={isLoading}
            handleDeleteList={handleDeleteList}
            id={i.id}
            name={i.name}
          />
        ))}
        <button
          onClick={handleIsCreate}
          className="flex h-48 w-48 items-center justify-center rounded-md border-2 border-primary bg-secondary p-1 text-center text-4xl shadow-md shadow-neutral-800 transition lg:hover:scale-105 lg:hover:bg-primary"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
