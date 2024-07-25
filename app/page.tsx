import mockup from "@/public/mock1.png";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  return (
    <main className="flex flex-col items-center">
      <div className="flex rounded-md border-4 border-primary shadow-lg shadow-neutral-800">
        <div className="flex w-1/2 flex-col items-start justify-center gap-10 rounded-l-md bg-bgLight px-10 text-start">
          <h1 className="font-bold">Welcome to Tasker</h1>
          <p className="text-start text-2xl">
            Stay organized and boost your productivity with Tasker.
          </p>
          <p>
            Create and edit multiple lists of tasks while Tasker securely holds
            all data in a MongoDB databse, which you can only have access to
            through your Google account.
          </p>
        </div>
        <div className="w-1/2">
          <Image
            className="rounded-r-md object-cover"
            src={mockup}
            alt="screenshot of tasker list page"
          />
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center gap-4">
        <h2 className="text-4xl">Get Started with Tasker</h2>
        <button className="btn h-16">
          <Link className="px-6 py-2 text-xl" href={"/sign-in"}>
            Join Tasker
          </Link>
        </button>
      </div>
    </main>
  );
}
