import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/general/SiteChrome";
import { cookies } from "next/headers";
import { absoluteSiteUrl, siteUrl } from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight:["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Portofolio Azmi",
    template: "%s | Muhammad Ulil Azmi",
  },
  description:
    "Website portofolio Muhammad Ulil Azmi yang menampilkan project, skill, dan pengalaman dalam pengembangan website dan aplikasi.",
  keywords: [
    "Muhammad Ulil Azmi",
    "portofolio",
    "web developer",
    "Next.js",
    "React",
    "pengembangan website",
    "UI/UX",
  ],
  authors: [{ name: "Muhammad Ulil Azmi" }],
  creator: "Muhammad Ulil Azmi",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: absoluteSiteUrl("/"),
    siteName: "Portofolio Muhammad Ulil Azmi",
    title: "Portofolio Muhammad Ulil Azmi",
    description:
      "Website portofolio Muhammad Ulil Azmi yang menampilkan project, skill, dan pengalaman dalam pengembangan website dan aplikasi.",
    images: [
      {
        url: absoluteSiteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Portofolio Muhammad Ulil Azmi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portofolio Muhammad Ulil Azmi",
    description:
      "Website portofolio Muhammad Ulil Azmi yang menampilkan project, skill, dan pengalaman dalam pengembangan website dan aplikasi.",
    images: [absoluteSiteUrl("/opengraph-image")],
  },
  icons: {
    icon : "/logoo.png",
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const skipSplash = cookieStore.get("portfolioIntroSeen")?.value === "1";

  return (
    <html lang="id" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logo.png?v=3" type="image/png" />
      </head>
      <body className={`${poppins.className} theme-transition antialiased bg-slate-950`}>
        <SiteChrome skipSplash={skipSplash}>{children}</SiteChrome>
      </body>
    </html>
  );
}
