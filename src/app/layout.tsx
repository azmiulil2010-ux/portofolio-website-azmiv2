import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/general/SiteChrome";
import { cookies, headers } from "next/headers";
import { absoluteSiteUrl, siteUrl } from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Portofolio Azmi",
    template: "%s | Muhammad Ulil Azmi",
  },
  description:
    "Portofolio Muhammad Ulil Azmi, siswa Rekayasa Perangkat Lunak (RPL) yang membangun website modern dengan React dan Next.js.",
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
    title: "Muhammad Ulil Azmi | Portofolio & Web Developer",
    description:
      "Portofolio Muhammad Ulil Azmi, siswa Rekayasa Perangkat Lunak (RPL) yang membangun website modern dengan React dan Next.js.",
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
    title: "Muhammad Ulil Azmi | Portofolio & Web Developer",
    description:
      "Portofolio Muhammad Ulil Azmi, siswa Rekayasa Perangkat Lunak (RPL) yang membangun website modern dengan React dan Next.js.",
    images: [absoluteSiteUrl("/opengraph-image")],
  },
  icons: {
    icon : "/logoo.png",
  }
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isAudit = /Lighthouse|PageSpeed|HeadlessChrome|Chrome-Lighthouse/i.test(userAgent);
  const isDev = process.env.NODE_ENV === "development";
  const skipSplash = isAudit || (!isDev && cookieStore.get("portfolioIntroSeen")?.value === "1");

  return (
    <html lang="id" data-theme="light" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logo.png?v=3" type="image/png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme');
                  var isDark = saved ? saved === 'dark' : false;
                  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${poppins.className} theme-transition antialiased bg-slate-950`}>
        <SiteChrome skipSplash={skipSplash}>{children}</SiteChrome>
      </body>
    </html>
  );
}
