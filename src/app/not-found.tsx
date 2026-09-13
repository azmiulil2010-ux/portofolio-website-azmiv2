import { LuArrowLeft, LuHouse, LuSearchX } from "react-icons/lu";
import ReturnHomeLink from "@/components/general/ReturnHomeLink";

export default function NotFound() {
  return (
    <main className="not-found-page relative flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.14),transparent_35%)]" />

      <section className="relative z-10 max-w-xl">
        <div className="mx-auto mb-8 grid h-20 w-20 place-items-center rounded-2xl border border-cyan-400/20 bg-slate-900/80 text-cyan-400 shadow-xl shadow-cyan-950/30">
          <LuSearchX size={38} aria-hidden="true" />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
          Error 404
        </p>
        <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mx-auto mb-8 max-w-md text-base leading-7 text-gray-400">
          URL yang kamu masukkan tidak tersedia atau mungkin sudah dipindahkan.
          Mari kembali ke halaman utama portofolio.
        </p>
        <ReturnHomeLink>
          <LuArrowLeft size={19} aria-hidden="true" />
          <LuHouse size={19} aria-hidden="true" />
          Kembali ke Beranda
        </ReturnHomeLink>
      </section>
    </main>
  );
}
