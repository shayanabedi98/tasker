import { authOptions } from "@/app/api/auth/[...nextauth]/options";
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
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
    });

    const list = await prisma.list.findFirst({
      where: { name: decodeURIComponent(name), userId: user?.id },
    });

    tasks = await prisma.task.findMany({
      where: { listName: decodeURIComponent(name), listId: list?.id },
    });
  } catch (error) {
    throw error;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>{decodeURIComponent(name)}</h1>
      <Tasks tasks={tasks!} endpointName={name} />
    </div>
  );
}
