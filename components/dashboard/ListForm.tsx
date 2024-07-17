"use client";

import { useState } from "react";

type Props = {
  handleAddNewList: (str: string) => void;
};

export default function ListForm({ handleAddNewList }: Props) {
  const [newListName, setNewListName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName) {
      alert("Must complete field to create a new list.");
      return;
    }

    if (newListName) {
      try {
        const res = await fetch("/api/lists", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            newListName,
          }),
        });

        if (res.ok) {
          handleAddNewList(newListName);
          setNewListName("");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-secondary flex h-12 items-center justify-between pl-4"
    >
      <input
        placeholder="Create New List"
        className="w-[70%] rounded-sm px-1 py-1 text-black"
        type="text"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
      />
      <button className="bg-bgDark h-full w-20 p-2 font-semibold" type="submit">
        Create
      </button>
    </form>
  );
}
