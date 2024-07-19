"use client";

import { ListType } from "@/types/types";
import { useState } from "react";
import ListItem from "./ListItem";
import { v4 as uuidv4 } from "uuid";
import CreateList from "./CreateList";
import { FiPlus } from "react-icons/fi";

type Props = {
  lists: ListType;
};

export default function Lists({ lists }: Props) {
  const [listsData, setListsData] = useState(lists);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [clickedListName, setClickedListName] = useState("");

  const handleAddNewList = async () => {
    if (!inputValue.trim()) {
      setErrorMessage(true);
      return;
    } else {
      setErrorMessage(false);
    }

    if (listsData.some((i) => i.name === inputValue)) {
      alert("List already exists");
      return;
    }

    if (inputValue) {
      try {
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
          const newList = {
            id: uuidv4(),
            name: inputValue,
          };
          setListsData((prev) => [...prev, newList]);
          setInputValue("");
          setIsCreate(false);
        }
      } catch (error) {
        setInputValue("");
        setIsCreate(false);
      }
    }
  };

  const handleEditList = async (listName: string, newListName: string) => {
    if (!newListName) {
      setErrorMessage(true);
    } else {
      setErrorMessage(false);
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
          setListsData((prev) =>
            prev.map((i) =>
              i.name === listName ? { ...i, name: newListName } : i,
            ),
          );
          setIsEdit(false);
          setClickedListName("");
        }
      } catch (error) {
        setIsEdit(false);
        setClickedListName("");
      }
    }
  };

  const handleDeleteList = async (id: string, name: string) => {
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
      }
    } catch (error) {
      setIsLoading(false);
      setClickedListName("");
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
    <div className="mt-16">
      <div className="flex justify-center gap-4">
        <h2>Create New List</h2>
        <button
          onClick={handleIsCreate}
          className="rounded-md border-2 border-secondary bg-primary text-4xl"
        >
          <FiPlus />
        </button>
      </div>
      {isCreate && (
        <div className="flex">
          <CreateList
            errorMessage={errorMessage}
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
            errorMessage={errorMessage}
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
      </div>
    </div>
  );
}
