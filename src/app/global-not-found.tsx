import { Poppins } from "next/font/google";
import "./globals.css";
import NotFound from "./not-found";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function GlobalNotFound() {
  return (
    <html lang="id" data-theme="dark" className="dark" suppressHydrationWarning>
      <body
        className={`${poppins.className} theme-transition antialiased bg-slate-950`}
        suppressHydrationWarning
      >
        <NotFound />
      </body>
    </html>
  );
}
