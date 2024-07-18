import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { name: string } },
) {
  const { title, description } = await req.json();
  const { name } = params;

  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        listName: name,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Could not create task." });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { name: string } },
) {
  const { name } = params;
  try {
    const tasks = await prisma.task.findMany({
      where: { listName: name },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Could not get tasks",
    });
  }
}
