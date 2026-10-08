"use client";

import { useState } from "react";
import { LuSend } from "react-icons/lu";
import toast from "react-hot-toast";

const inputStyles =
  "contact-input w-full rounded-xl border border-slate-800/90 bg-slate-950/80 px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 shadow-inner outline-none transition-all duration-300 focus:border-cyan-400 focus:bg-slate-900/90 focus:ring-2 focus:ring-cyan-400/20";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "07c415b2-a130-4cc9-a8f1-a15685c51146");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        form.reset();
        toast.success("Pesan berhasil terkirim! Terima kasih telah menghubungi.", {
          style: {
            background: "#0f172a",
            color: "#38bdf8",
            border: "1px solid rgba(56, 189, 248, 0.3)",
          },
        });
      } else {
        toast.error("Gagal mengirim pesan. Silakan coba lagi.", {
          style: {
            background: "#0f172a",
            color: "#f87171",
            border: "1px solid rgba(248, 113, 113, 0.3)",
          },
        });
      }
    } catch {
      toast.error("Terjadi kesalahan jaringan.", {
        style: {
          background: "#0f172a",
          color: "#f87171",
        },
      });
    }

    setLoading(false);
  };

  return (
    <form
      suppressHydrationWarning
      onSubmit={onSubmit}
      className="contact-form relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-slate-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
          Direct Transmission
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Encrypted &bull; Fast Reply
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-xs font-semibold text-slate-300">
            Nama Anda
          </label>
          <input
            id="contact-name"
            type="text"
            placeholder="John Doe"
            className={inputStyles}
            required
            name="name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1 block text-xs font-semibold text-slate-300">
            Email Anda
          </label>
          <input
            id="contact-email"
            type="email"
            placeholder="johndoe@example.com"
            className={inputStyles}
            required
            name="email"
          />
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-1 block text-xs font-semibold text-slate-300">
            Subjek Pesan
          </label>
          <input
            id="contact-subject"
            type="text"
            placeholder="Kolaborasi Project / Tanya Sesuatu"
            className={inputStyles}
            required
            name="subject"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1 block text-xs font-semibold text-slate-300">
            Isi Pesan
          </label>
          <textarea
            id="contact-message"
            placeholder="Tuliskan pesan atau detail project Anda di sini..."
            required
            className={`${inputStyles} resize-none`}
            rows={4}
            name="message"
          />
        </div>

        <button
          disabled={loading}
          className="group relative mt-2 flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.55)] hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Transmitting message...</span>
            </>
          ) : (
            <>
              <LuSend size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              <span>Kirim Pesan Sekarang</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
