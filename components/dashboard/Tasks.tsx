"use client";

import { TasksType } from "@/types/types";
import { useState } from "react";
import TaskItem from "./TaskItem";

type Props = {
  tasks: TasksType;
  listNameState: string;
};

export default function Tasks({ tasks, listNameState }: Props) {
  const [taskData, setTaskData] = useState(tasks);

  return (
    <div className="">
      {listNameState ? (
        taskData
        .filter((task) => task.listName === listNameState)
        .map((task, index) => (
          <TaskItem
            key={index}
            taskTitle={task.title}
            taskDescription={task.description}
          />
        ))
      ) : (
        <div>Select a list</div>
      )}
    </div>
  );
}
