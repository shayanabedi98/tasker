"use client";

type Props = {
  taskTitle: string;
  taskDescription?: string | null;
};
export default function TaskItem({ taskTitle, taskDescription }: Props) {
  return (
    <div>
      <p>{taskTitle}</p>
      <p>{taskDescription ? taskDescription : ""}</p>
    </div>
  );
}
