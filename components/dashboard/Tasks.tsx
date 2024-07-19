"use client";

import { TasksType } from "@/types/types";

type Props = {
  tasks: TasksType;
};

export default function Tasks({ tasks }: Props) {
  return (
    <div className="mt-16">
      {tasks.map((i, index) => (
        <div key={index}>
          <p>{i.title}</p>
          <p>{i.description}</p>
        </div>
      ))}
    </div>
  );
}
