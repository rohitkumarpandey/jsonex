import type { Metadata } from "next";
import { Geist, Geist_Mono, Darker_Grotesque } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookmarkPopup from "./components/Bookmark";
import { APP_METADATA } from "./constant/metadata";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = APP_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      data-theme="dark"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${darkerGrotesque.variable} h-full`}
    >
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="JSONex" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://jsonex.vercel.app",
              "@type": "WebApplication",
              name: "JSONex",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "All",
              description:
                "Online JSON viewer, formatter, and explorer tool.",
              url: "https://jsonex.vercel.app",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Analytics />
        <SpeedInsights />
        <Header />
        <div className="flex-1">{children}</div>
        <BookmarkPopup />
        <Footer />
      </body>
    </html>
  );
}