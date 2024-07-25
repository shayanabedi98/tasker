import SignInButton from "@/components/sign-in/SignInButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center gap-10">
      <h1>Sign in</h1>
      <h2>Log into your Google account to get started.</h2>
      <p className="text-center">
        Tasker is your personal to-do list app, designed to help you stay
        organized and manage your tasks efficiently. With seamless Google
        integration, you can easily keep track of your to-dos anytime, anywhere.
      </p>
      <SignInButton />
      {/* <div className="mt-6 text-center">
        <p>Features:</p>
        <ul className="list-inside list-disc text-left">
          <li>Simple and intuitive task management</li>
          <li>Secure and reliable with MongoDB</li>
          <li>Fast performance with Next.js</li>
          <li>Accessible from any device</li>
          <li>Customizable task categories</li>
        </ul>
      </div> */}
    </div>
  );
}
