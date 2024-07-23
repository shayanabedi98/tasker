"use client";

import { TasksType } from "@/types/types";
import CreateTask from "./CreateTask";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskItem from "./TaskItem";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";

type Props = {
  tasks: TasksType;
  endpointName: string;
};

export default function Tasks({ tasks, endpointName }: Props) {
  const router = useRouter();
  const endpoint = endpointName;

  const [tasksData, setTasksData] = useState(tasks);
  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [clickedTask, setClickedTask] = useState("");

  // ADD NEW TASK -------------
  const handleAddNewTask = async () => {
    if (!inputValues.title) {
      toast.error("Missing title field");
      return;
    }

    if (tasksData.some((i) => i.title == inputValues.title)) {
      toast.error("Task name already exists. Pick a new name :)");
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
          router.refresh();
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
    taskName: string,
  ) => {
    if (!values.title) {
      toast.error("Missing title field");
      return;
    }
    
    if (values.title !== taskName && tasksData.some((i) => i.title === values.title)) {
      toast.error("Task name already exists. Pick a new name :)");
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
            taskName,
          }),
        });

        if (res.ok) {
          setIsEdit(false);
          setTasksData((prev) =>
            prev.map((i) =>
              i.title === taskName
                ? { ...i, title: values.title, description: values.description }
                : i,
            ),
          );
          toast.success("Task Updated");
          router.refresh();
        }
      } catch (error) {
        setIsEdit(false);
        toast.success("Something went wrong, try again later.");
      }
    }
  };

  // DELETE TASK
  const handleDeleteTask = async (taskName: string) => {
    router.refresh();
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
            taskName,
          }),
        });

        if (res.ok) {
          toast.success("Deleted Task");
          setTasksData((prev) => prev.filter((i) => i.title !== taskName));
          router.refresh();
        }
      } catch (error) {
        toast.error("Something went wrong, try again later.");
      }
    }
  };

  const handleIsEdit = async (name: string) => {
    setIsEdit(!isEdit);
    setClickedTask(name);
  };

  const handleTaskInputChange = (value: string, name: string) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div className="mt-16">
      <div>
        <CreateTask
          isCreate={isCreate}
          handleTaskInputChange={handleTaskInputChange}
          handleAddNewTask={handleAddNewTask}
          inputValues={inputValues}
        />
      </div>
      <div className="grid grid-cols-3 gap-10">
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
        <div>
          <button className="flex h-16 w-96 items-center justify-center rounded-md border-2 border-primary bg-secondary p-1 text-center text-4xl shadow-md shadow-neutral-800 transition lg:hover:scale-105 lg:hover:bg-primary" onClick={() => setIsCreate(true)}>
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
