"use client";

import { TasksType } from "@/types/types";
import CreateTask from "./CreateTask";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "./TaskItem";
import toast from "react-hot-toast";

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
  const [isEdit, setIsEdit] = useState(false);
  const [clickedTask, setClickedTask] = useState("");

  // ADD NEW TASK -------------
  const handleAddNewTask = async () => {
    if (!inputValues.title) {
      toast.error("Missing title field");
      return;
    }
    if (inputValues) {
      try {
        toast.loading("Loading", { duration: 500 });
        const res = await fetch(`/api/lists/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ inputValues }),
        });

        if (res.ok) {
          toast.success("Created New Task");
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
        }
      } catch (error) {
        setInputValues({ title: "", description: "" });
      }
    }
  };

  // EDIT TASK ------------
  const handleEditTask = async (
    values: {
      title: string;
      description: string;
    },
    taskId: string,
  ) => {
    if (!values.title) {
      toast.error("Missing title field");
      return;
    }
    if (values.title) {
      try {
        toast.loading("Loading", { duration: 500 });
        const res = await fetch(`/api/lists/${endpoint}`, {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            values,
            taskId,
          }),
        });

        if (res.ok) {
          setIsEdit(false);
          setTasksData((prev) =>
            prev.map((i) =>
              i.id === taskId
                ? { ...i, title: values.title, description: values.description }
                : i,
            ),
          );
          toast.success("Nice");
        }
      } catch (error) {
        setIsEdit(false);
        toast.success("Something went wrong, try again later.");
      }
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (taskId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (confirmed) {
      try {
        toast.loading("Loading", { duration: 500 });
        const res = await fetch(`/api/lists/${endpoint}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            taskId,
          }),
        });

        if (res.ok) {
          toast.success("Deleted Task");
          setTasksData((prev) => prev.filter((i) => i.id !== taskId));
        }
      } catch (error) {
        toast.error("Something went wrong, try again later.");
      }
    }
  };

  const handleIsEdit = async (id: string) => {
    setIsEdit(!isEdit);
    setClickedTask(id);
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
          <TaskItem
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            isEdit={isEdit}
            clickedTask={clickedTask}
            taskId={i.id as string}
            handleIsEdit={handleIsEdit}
            title={i.title}
            description={i.description}
          />
        </div>
      ))}
    </div>
  );
}
