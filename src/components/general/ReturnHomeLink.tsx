"use client";

import { useEffect } from "react";

export default function ReturnHomeLink({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.cookie = "skipSplash=; Max-Age=0; path=/";
  }, []);

  return (
    <a
      href="/"
      onClick={() => {
        document.cookie = "skipSplash=1; Max-Age=30; path=/";
      }}
      className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-blue-900 to-purple-800 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:from-blue-800 hover:to-purple-700 active:scale-[0.98]"
    >
      {children}
    </a>
  );
}
