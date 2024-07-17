"use client";

import { useState } from "react";
import ListItem from "./ListItem";
import { NextResponse } from "next/server";
import ListForm from "./ListForm";

type Props = {
  lists: List[];
};

type List = {
  id?: string;
  name: string;
};

export default function Lists({ lists }: Props) {
  const [viewEdit, setViewEdit] = useState(false);
  const [listIndex, setListIndex] = useState(0);
  const [viewEditId, setViewEditId] = useState("");
  const [editedName, setEditedName] = useState(lists[listIndex]?.name);
  const [listData, setListData] = useState(lists);

  const handleViewEdit = (id: string, name: string) => {
    setViewEdit(true);
    setViewEditId(id);
    setEditedName(name);
  };

  const handleNotViewEdit = () => {
    setViewEdit(false);
  };

  const handleEditChange = (str: string) => {
    setEditedName(str);
  };

  const handleListIndex = (num: number) => {
    setListIndex(num);
  };

  const handleAddNewList = (newName: string) => {
    setListData((prev) => {
      return [...prev, { name: newName }];
    });
  };

  const submitEdit = async (id: string) => {
    if (!editedName || editedName === "") {
      alert("Cannot leave field empty");
      return;
    }

    if (editedName) {
      setViewEdit(false);
      try {
        const res = await fetch("/api/lists", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ editedName, id }),
        });
        if (res.ok) {
          setListData((prevData) =>
            prevData.map((list) =>
              list.id === id ? { ...list, name: editedName } : list,
            ),
          );
          setViewEdit(false);
          setEditedName("");
          return NextResponse.json({ message: "Updated list" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/lists", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setListData((prevData) => prevData.filter((list) => list.id !== id));
        return NextResponse.json({ message: "Deleted list" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-1">
      <div className="w-full">
        <ListForm handleAddNewList={handleAddNewList} />
      </div>
      {listData.length > 0 ? (
        listData.map((list, index) => (
          <ListItem
            handleListIndex={handleListIndex}
            handleDelete={handleDelete}
            submitEdit={submitEdit}
            handleNotViewEdit={handleNotViewEdit}
            editedName={editedName}
            handleEditChange={handleEditChange}
            editValue={list.name}
            viewEditId={viewEditId}
            viewEdit={viewEdit}
            handleViewEdit={handleViewEdit}
            key={index}
            listName={list.name}
            listIndex={index}
            listId={list.id!}
          />
        ))
      ) : (
        <div>No lists found, create new</div>
      )}
    </div>
  );
}
