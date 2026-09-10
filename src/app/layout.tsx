import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/navbar/Navbar";
import Footer from "@/components/general/Footer";
import ScrollTopButton from "@/components/general/ScrollTopButton";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Azmi Portofolio Website",
  description: "Azmi Portofolio Website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.className} theme-transition antialiased bg-slate-950`}>
        <Navbar />
        {children}
        <Footer />
        <ScrollTopButton />
      </body>
    </html>
  );
}
