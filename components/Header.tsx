"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaList } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function Header() {
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const { status, data: session } = useSession();
  const router = useRouter();
  const miniMenu = useRef<HTMLImageElement | null>(null);
  const path = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (miniMenu.current && !miniMenu.current.contains(e.target as Node)) {
        setShowMiniMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    if (!showMiniMenu) {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMiniMenu]);

  return (
    <header className="flex justify-between border-b-2 border-slate-300 py-10">
      <Link className="flex items-center gap-2" href={`/`}>
        <FaList className="rounded-md bg-primary p-1 text-4xl" />
        <span className="text-4xl font-bold">Tasker</span>
      </Link>

      {status === "authenticated" ? (
        <div className="relative">
          <div className="flex items-center gap-3 font-semibold">
            <span>Hello, {session?.user?.name}</span>
            <Image
              ref={miniMenu}
              className="cursor-pointer rounded-full border-[3px] border-primary lg:hover:scale-110 lg:hover:border-white transition"
              src={session.user?.image || ""}
              alt="user profile picture"
              height={40}
              width={40}
              onClick={() => {
                setShowMiniMenu(!showMiniMenu);
              }}
            />
          </div>
          {showMiniMenu && (
            <div className="absolute right-0 top-12 flex min-h-28 min-w-56 flex-col items-center justify-center gap-4 rounded-md border-2 border-primary bg-bgLight p-2 shadow-md">
              <span className="text-sm">{session.user?.email}</span>
              <Link
                className="font-bold transition lg:hover:text-blue-400"
                href={"/dashboard"}
              >
                Dashboard
              </Link>
              <button
                className="min-w-20 rounded-md bg-primary px-6 py-2 font-semibold"
                onClick={() => signOut()}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : path !== "/sign-in" ? (
        <div>
          <button className="btn" onClick={() => router.push("/sign-in")}>
            Sign In
          </button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
