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
    const lists = await prisma.list.findMany({
      where: { authorEmail: "abedishayan@gmail.com" },
    });
    return NextResponse.json(lists);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not get task lists" });
  }
}

export async function POST(req: Request) {
  const { newListName } = await req.json();
  const session = await getServerSession(authOptions);

  if (!newListName) {
    return NextResponse.json({ message: "Missing fields" });
  }

  //   if (!session) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  try {
    const list = await prisma.list.create({
      data: {
        name: newListName,
        authorEmail: "abedishayan@gmail.com",
      },
    });
    return NextResponse.json(list);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not create task list" + error });
  }
}

export async function PUT(req: Request) {
  const { editedName, id } = await req.json();

  try {
    const list = await prisma.list.update({
      where: { id },
      data: {
        name: editedName,
      },
    });
    return NextResponse.json(list);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not update list" });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  //   if (!session) {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }

  const { id } = await req.json();
  try {
    const list = await prisma.list.findUnique({
      where: { id },
    });

    if (!list) {
      return NextResponse.json({ message: "List not found" }, { status: 404 });
    }

    const deleteTasks = await prisma.task.deleteMany({
      where: { listName: list.name },
    });

    const deleteList = await prisma.list.delete({
      where: { id },
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
