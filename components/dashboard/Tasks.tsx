"use client";

import { TasksType } from "@/types/types";
import CreateTask from "./CreateTask";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  tasks: TasksType;
  endpointName: string;
};

export default function Tasks({ tasks, endpointName }: Props) {
  const endpoint = endpointName;

  const [tasksData, setTasksData] = useState(tasks);
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState(false);

  const handleAddNewTask = async () => {
    if (!inputValues.title) {
      setErrorMessage(true);
      return;
    } else {
      setErrorMessage(false);
    }

    if (inputValues) {
      try {
        const res = await fetch(`/api/lists/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ inputValues }),
        });

        if (res.ok) {
          setTasksData((prev) => [
            ...prev,
            {
              id: uuidv4(),
              title: inputValues.title,
              description: inputValues.description,
              listName: endpoint,
            },
          ]);
          setInputValues({ title: "", description: "" });
          setErrorMessage(false);
        }
      } catch (error) {
        setInputValues({ title: "", description: "" });
        setErrorMessage(false);
      }
    }
  };

  const handleTaskInputChange = (value: string, name: string) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div className="mt-16">
      <div>
        <CreateTask
          handleTaskInputChange={handleTaskInputChange}
          handleAddNewTask={handleAddNewTask}
          inputValues={inputValues}
        />
      </div>
      {tasksData.map((i, index) => (
        <div key={index} className="flex gap-2">
          <p className="font-bold">{i.title}:</p>
          <p>{i.description}</p>
        </div>
      ))}
    </div>
  );
}
