import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options"; 
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
    const user = await prisma.user.findUnique({
      where: { email: session?.user?.email as string },
    });
    lists = await prisma.list.findMany({
      where: { userId: user?.id },
    });
  } catch (error) {
    throw error;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Lists</h1>
      <h2 className="mt-4">Your task lists, all in one place.</h2>
      <p className="mt-4">Create a new list or select an existing one to start making tasks.</p>
      <Lists lists={lists} />
    </div>
  );
}
