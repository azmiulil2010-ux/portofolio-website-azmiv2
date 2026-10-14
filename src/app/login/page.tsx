import type { Metadata } from "next";
import Link from "next/link";
import { LuKeyRound, LuArrowLeft } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Doorpass Verification",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DoorpassGatePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <section
        role="region"
        aria-label="Verifikasi Doorpass"
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
          <LuKeyRound className="text-2xl" />
        </div>
        <h1 className="text-xl font-bold text-white">Akses Admin Dilindungi</h1>
        <p className="mt-2 text-xs text-slate-400">
          Halaman ini memerlukan verifikasi Doorpass untuk dapat mengakses portal admin.
        </p>

        {/* Form input Doorpass manual */}
        <form action="/login" method="GET" className="mt-6 space-y-3">
          <input
            name="doorpass"
            type="password"
            placeholder="Masukkan Doorpass..."
            required
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:from-indigo-500 hover:to-cyan-500 cursor-pointer"
          >
            Verifikasi Doorpass
          </button>
        </form>

        <div className="mt-6 border-t border-slate-800/80 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-cyan-300"
          >
            <LuArrowLeft size={14} />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </section>
    </main>
  );
}