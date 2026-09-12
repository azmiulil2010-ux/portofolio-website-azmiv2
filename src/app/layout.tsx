import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/general/navbar/Navbar";
import Footer from "@/components/general/Footer";
import ScrollTopButton from "@/components/general/ScrollTopButton";
import AnimationLayout from "../../layouts/AnimationLayout";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Azmi Portofolio Website",
  description: "Portofolio karya teknologi SMKN 1 Pasuruan",
  icons: {
    icon : "/logoo.png",
  }
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logo.png?v=3" type="image/png" />
      </head>
      <body className={`${poppins.className} theme-transition antialiased bg-slate-950`}>
        <Navbar />
        <AnimationLayout>{children}</AnimationLayout>
        <Footer />
        <ScrollTopButton />
        <Toaster />
      </body>
    </html>
  );
}
