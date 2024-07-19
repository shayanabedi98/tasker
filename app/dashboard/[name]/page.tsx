import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Tasks from "@/components/dashboard/Tasks";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    name: string;
  };
};

export default async function ListPage({ params }: Props) {
  const { name } = params;
  const session = await getServerSession(authOptions);
  let tasks;

  if (!session) {
    redirect("/sign-in");
  }

  try {
    tasks = await prisma.task.findMany({
      where: { listName: name, authorEmail: session.user?.email as string },
    });
  } catch (error) {}

  return (
    <div>
      <h1>{name}</h1>
      <Tasks tasks={tasks!} />
    </div>
  );
}
