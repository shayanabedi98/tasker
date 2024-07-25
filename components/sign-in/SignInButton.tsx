"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

export default function SignInButton() {
  return (
    <button
      className="flex items-center justify-center gap-3 rounded-full bg-primary p-4 font-semibold shadow-md transition lg:hover:bg-text lg:hover:text-primary"
      onClick={() => signIn("google")}
    >
      <FaGoogle className="text-3xl" />
      <span>Sign in with Google</span>
    </button>
  );
}
