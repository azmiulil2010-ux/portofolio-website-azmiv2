import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { cookies } from "next/headers";
import { verifyDoorpassToken, DOORPASS_COOKIE_NAME } from "@/lib/doorpass";
import { logoutAction } from "./actions";
import {
  LuLayoutDashboard,
  LuFolderGit2,
  LuSparkles,
  LuUser,
  LuWrench,
  LuBriefcase,
  LuFileText,
  LuMail,
  LuLogOut,
  LuExternalLink,
  LuShieldCheck,
} from "react-icons/lu";
import { Toaster } from "react-hot-toast";
import AdminThemeToggle from "@/components/general/AdminThemeToggle";
import Footer from "@/components/general/Footer";

export const metadata: Metadata = {
  title: "Admin Panel | Portofolio Azmi",
  description: "Area Pengelolaan Portofolio Azmi",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const cookieStore = await cookies();
  const doorpassToken = cookieStore.get(DOORPASS_COOKIE_NAME)?.value;
  const isDoorpassValid =
    user && doorpassToken
      ? await verifyDoorpassToken(doorpassToken, user.id)
      : false;

  // Jika belum login atau belum melewati Doorpass, tampilkan tampilan terpusat tanpa sidebar
  if (!user || !isDoorpassValid) {
    return (
      <div className="admin-auth-shell flex min-h-screen flex-col bg-slate-950 p-4 text-slate-100">
        <AdminThemeToggle className="fixed right-4 top-4 z-50" />
        <main className="flex flex-1 items-center justify-center">
          <Toaster position="top-right" />
          {children}
        </main>
        <Footer />
      </div>
    );
  }

  // Navigasi Section Portfolio
  const portfolioSections = [
    { name: "Hero", icon: LuSparkles, status: "Read Only", href: "/#home" },
    { name: "About", icon: LuUser, status: "Read Only", href: "/#about" },
    { name: "Skills", icon: LuWrench, status: "Read Only", href: "/#skills" },
    { name: "Services", icon: LuBriefcase, status: "Read Only", href: "/#services" },
    {
      name: "Projects",
      icon: LuFolderGit2,
      status: "CRUD Aktif",
      href: "/admin/proyek",
      active: true,
    },
    { name: "Resume", icon: LuFileText, status: "Read Only", href: "/#about" },
    { name: "Contact", icon: LuMail, status: "Read Only", href: "/#contact" },
  ];

  return (
    <div className="admin-shell min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <Toaster position="top-right" />

      {/* Sidebar Admin */}
      <aside className="w-full md:w-72 bg-slate-900/90 border-r border-slate-800/80 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Header */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <LuShieldCheck className="text-white text-xl" />
              </div>
              <div>
                <h1 className="font-bold text-base tracking-wide text-white">
                  ADMIN PORTFOLIO
                </h1>
                <p className="text-xs text-cyan-400 font-medium flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Sesi Terverifikasi
                </p>
              </div>
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="p-4 space-y-6">
            <div>
              <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
                Menu Utama
              </p>
              <Link
                href="/admin/proyek"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-indigo-600/20 text-cyan-300 border border-indigo-500/30 transition-all hover:bg-indigo-600/30"
              >
                <LuLayoutDashboard className="text-lg text-cyan-400" />
                <span>Dashboard Proyek</span>
              </Link>
            </div>

            {/* List Seluruh Section Portfolio */}
            <div>
              <div className="px-3 mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
                  Daftar Section Website
                </p>
                <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                  7 Bagian
                </span>
              </div>
              <ul className="space-y-1">
                {portfolioSections.map((sec) => {
                  const Icon = sec.icon;
                  const isCurrent = sec.active;
                  return (
                    <li key={sec.name}>
                      <Link
                        href={sec.href}
                        className={`admin-nav-link flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isCurrent
                            ? "admin-nav-current bg-slate-800/90 text-white font-semibold border-l-2 border-cyan-400"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon
                            className={
                              isCurrent ? "text-cyan-400" : "text-slate-400"
                            }
                          />
                          <span>{sec.name}</span>
                        </div>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            isCurrent
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {sec.status}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* User Info & Logout Button */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60">
          <div className="mb-3 px-2">
            <p className="text-[11px] text-slate-400">Admin Aktif</p>
            <p className="text-xs font-medium text-slate-200 truncate">
              {user.email}
            </p>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer"
            >
              <LuLogOut />
              <span>Keluar (Logout)</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-slate-200 font-medium">Pengelolaan Proyek</span>
          </div>
          <div className="flex items-center gap-4">
            <AdminThemeToggle />
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <span>Lihat Website Publik</span>
              <LuExternalLink size={13} />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
