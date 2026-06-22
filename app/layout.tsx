import type { Metadata } from "next";
import { Geist, Geist_Mono, Darker_Grotesque } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookmarkPopup from "./components/Bookmark";
import FeedbackForm from "./components/Feedback";

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

export const metadata: Metadata = {
  title: "JSON Explorer | Developer-first JSON tool",
  description: "Developer-first JSON tool",
};

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
      <body className="min-h-full flex flex-col font-sans">
        <Analytics />
        <SpeedInsights />
        <Header />
        <div className="flex-1">{children}</div>
        <BookmarkPopup/>
        <Footer /> 
      </body>
    </html>
  );
}