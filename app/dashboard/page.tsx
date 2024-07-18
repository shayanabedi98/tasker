import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import Lists from "@/components/dashboard/Lists";

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
      <h1>Lists</h1>
      <Lists lists={lists} />
    </div>
  );
}
