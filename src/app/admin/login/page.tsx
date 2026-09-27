"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "../actions";
import { LuLock, LuMail, LuKeyRound, LuArrowRight, LuShieldAlert } from "react-icons/lu";

const initialState: ActionState = {
  success: false,
  error: null,
};

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <div className="admin-auth-page w-full max-w-md mx-auto">
      {/* Container Card */}
      <div className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        {/* Glow effect */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-20 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Icon & Title */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
            <LuLock className="text-2xl" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Masuk dengan akun Supabase yang telah terdaftar
          </p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-xs text-rose-300">
            <LuShieldAlert className="text-base shrink-0 mt-0.5" />
            <p>{state.error}</p>
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Email Admin
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <LuMail className="text-base" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-medium text-slate-300 mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <LuKeyRound className="text-base" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-800 bg-slate-950/60 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-cyan-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:from-indigo-500 hover:to-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span>{isPending ? "Memverifikasi..." : "Login"}</span>
            {!isPending && <LuArrowRight className="text-base" />}
          </button>
        </form>

        {/* Security badge info */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
          <p className="text-[11px] text-slate-500">
            Doorpass tervalidasi • Supabase Authentication
          </p>
        </div>
      </div>
    </div>
  );
}
