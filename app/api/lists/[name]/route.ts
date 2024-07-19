import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(
  req: Request,
  { params }: { params: { name: string } },
) {
  const session = await getServerSession(authOptions);
  const { inputValues } = await req.json();
  const { name } = params;

  try {
    const task = await prisma.task.create({
      data: {
        title: inputValues.title,
        description: inputValues.description,
        listName: name,
        authorEmail: session?.user?.email as string,
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
