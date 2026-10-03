import type { Metadata } from "next";
import { LuCircleAlert } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DoorpassGatePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <section
        role="alert"
        className="w-full max-w-md rounded-2xl border border-rose-500/20 bg-slate-900/80 p-8 text-center shadow-2xl"
      >
        <LuCircleAlert className="mx-auto mb-4 text-3xl text-rose-400" />
        <h1 className="text-xl font-semibold text-white">Doorpass tidak valid</h1>
      </section>
    </main>
  );
}