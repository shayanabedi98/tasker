"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const { status, data: session } = useSession();
  const router = useRouter();

  return (
    <header className="flex justify-between py-10">
      <Link className="flex items-center gap-1" href={"/"}>
        <svg
          className="h-10"
          fill="#236BA5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#236BA5"
        >
          <g id="SVGRepo_bgCarrier"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z"></path>
            <path d="m11 13.586-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"></path>
          </g>
        </svg>

        <span className="text-primary text-4xl font-bold">Tasker</span>
      </Link>

      {status === "authenticated" ? (
        <div className="text-text">
          <button
            className="text-primary font-semibold flex items-center gap-3"
            onClick={() => signOut()}
          >
            <span>{session?.user?.name}</span>
            <Image className="rounded-full border-primary border-[3px]" src={session.user?.image || ""} alt="user profile picture" height={40} width={40} />
          </button>
        </div>
      ) : (
        <div>
          <button className="font-semibold min-w-20 rounded-md bg-primary py-2 px-6" onClick={() => router.push("/sign-in")}>Sign In</button>
        </div>
      )}
    </header>
  );
}
