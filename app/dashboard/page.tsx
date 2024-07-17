import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Lists from "@/components/dashboard/Lists";
import prisma from "@/lib/prismadb";
import Tasks from "@/components/dashboard/Tasks";
import ListForm from "@/components/dashboard/ListForm";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  let lists;

  if (!session) {
    redirect("/sign-in");
  }

  try {
    lists = await prisma.list.findMany({
      where: { authorEmail: session?.user?.email! },
    });
  } catch (error) {
    throw error;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Dashboard</h1>
      <div className="mx-auto flex xl:w-[1280px]">
        <div className="container-mt bg-secondary border-secondary gap-1 flex w-1/3 flex-col border-2">
          <Lists lists={lists} />
        </div>
        <Tasks />
      </div>
    </div>
  );
}
