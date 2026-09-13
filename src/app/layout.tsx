import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/general/SiteChrome";
import { cookies } from "next/headers";

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

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const skipSplash = cookieStore.get("skipSplash")?.value === "1";

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logo.png?v=3" type="image/png" />
      </head>
      <body className={`${poppins.className} theme-transition antialiased bg-slate-950`}>
        <SiteChrome skipSplash={skipSplash}>{children}</SiteChrome>
      </body>
    </html>
  );
}
