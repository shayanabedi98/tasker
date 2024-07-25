import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { name: string } },
) {
  const session = await getServerSession(authOptions);
  const { name } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    const list = await prisma.list.findFirst({
      where: { name: name, userId: user?.id },
    });
    const tasks = await prisma.task.findMany({
      where: { listName: name, listId: list?.id },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not get tasks" });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { name: string } },
) {
  const session = await getServerSession(authOptions);
  const { inputValues } = await req.json();
  const { name } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    const list = await prisma.list.findFirst({
      where: { name: name, userId: user?.id },
    });
    if (!list) {
      return NextResponse.json({ message: "List not found" }, { status: 404 });
    }
    const task = await prisma.task.create({
      data: {
        title: inputValues.title,
        description: inputValues.description || null,
        listId: list?.id,
        listName: name,
        isCompleted: false,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not create task" });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { name: string; id: string } },
) {
  const session = await getServerSession(authOptions);
  const { name } = params;
  const { values, taskName, bool } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    const list = await prisma.list.findFirst({
      where: { name, userId: user?.id },
    });

    if (!list) {
      return NextResponse.json({ message: "Could not find list" });
    }

    const task = await prisma.task.findFirst({
      where: { listId: list?.id, title: taskName },
    });

    if (bool !== true && bool !== false) {
      const updateTask = await prisma.task.update({
        where: { id: task?.id, listId: list?.id },
        data: {
          title: values.title,
          description: values.description,
        },
      });
      return NextResponse.json(updateTask);
    }

    if (bool === true || bool === false) {
      const toggleComplete = await prisma.task.update({
        where: { listId: list.id, id: task?.id },
        data: {
          isCompleted: bool,
        },
      });

      return NextResponse.json(toggleComplete);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not update task." });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { name: string } },
) {
  const session = await getServerSession(authOptions);
  const { name } = params;
  const { taskName } = await req.json();

  if (!taskName) {
    return NextResponse.json({ message: "Task ID not found" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    const list = await prisma.list.findFirst({
      where: { name, userId: user?.id },
    });

    const task = await prisma.task.findFirst({
      where: { listId: list?.id, title: taskName },
    });

    const deleteTask = await prisma.task.delete({
      where: { listId: list?.id, id: task?.id },
    });
    return NextResponse.json(deleteTask);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not delete task" });
  }
}
