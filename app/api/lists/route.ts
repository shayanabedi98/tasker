import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  //   if (!session) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    const lists = await prisma.list.findMany({
      where: { userId: user?.id },
    });
    return NextResponse.json(lists);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not get task lists" });
  }
}

export async function POST(req: Request) {
  const { inputValue } = await req.json();
  const session = await getServerSession(authOptions);

  if (!inputValue) {
    return NextResponse.json({ message: "Missing fields" });
  }

  //   if (!session) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const list = await prisma.list.create({
      data: {
        userId: user?.id,
        name: inputValue,
      },
    });
    return NextResponse.json(list);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not create task list" + error });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const { listName, newListName } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    const findList = await prisma.list.findFirst({
      where: { name: listName, userId: user?.id },
    });
    const updateList = await prisma.list.update({
      where: { id: findList?.id},
      data: {
        name: newListName,
      },
    });
    return NextResponse.json(updateList);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not update list" });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const { name } = await req.json();

  //   if (!session) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });

    const list = await prisma.list.findFirst({
      where: { userId: user?.id, name: name },
    });

    if (!list) {
      return NextResponse.json({ message: "List not found" }, { status: 404 });
    }

    const deleteTasks = await prisma.task.deleteMany({
      where: { listName: list.name, listId: list.id },
    });

    const deleteList = await prisma.list.delete({
      where: { name, id: list.id },
    });

    return NextResponse.json({
      list: deleteList,
      tasks: deleteTasks,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not delete" }, { status: 500 });
  }
}
