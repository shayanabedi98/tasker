import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 flex w-full flex-col items-center justify-center border-t-2 border-slate-300 py-10">
      <span className="text-sm">
        Copyright &copy; {new Date().getFullYear()} Shayan Abedi,{" "}
        <Link
          href={"/https://pantheras.ca"}
          target="_blank"
          className="underline"
        >
          Pantheras Digital
        </Link>
      </span>
    </footer>
  );
}
