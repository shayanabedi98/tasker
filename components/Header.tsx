"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaList } from "react-icons/fa6";

export default function Header() {
  const { status, data: session } = useSession();
  const router = useRouter();

  return (
    <header className="flex justify-between py-10">
      <Link className="flex items-center gap-2" href={"/"}>
        <FaList className="rounded-md bg-primary p-1 text-4xl" />
        <span className="text-4xl font-bold">Tasker</span>
      </Link>

      {status === "authenticated" ? (
        <div>
          <button
            className="flex items-center gap-3 font-semibold"
            onClick={() => signOut()}
          >
            <span>{session?.user?.name}</span>
            <Image
              className="rounded-full border-[3px] border-primary"
              src={session.user?.image || ""}
              alt="user profile picture"
              height={40}
              width={40}
            />
          </button>
        </div>
      ) : (
        <div>
          <button
            className="min-w-20 rounded-md bg-primary px-6 py-2 font-semibold"
            onClick={() => router.push("/sign-in")}
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}
