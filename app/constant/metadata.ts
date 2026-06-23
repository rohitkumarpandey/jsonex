import { Metadata } from "next";

export const APP_METADATA: Metadata = {
  metadataBase: new URL("https://jsonex.vercel.app"),

  title:
    "JSON Viewer, Formatter & Explorer Online | JSONex",

  description:
    "Free online JSON viewer, formatter, and explorer. Visualize JSON in tree view, edit with real-time validation, and explore relationships with graph visualization. Built for developers.",

  keywords: [
    "JSON viewer online",
    "JSON formatter online",
    "JSON editor",
    "JSON explorer",
    "JSON visualizer",
    "format JSON",
    "beautify JSON",
    "JSON tree view",
    "JSON graph visualization",
    "developer JSON tool",
  ],

  openGraph: {
    title: "JSON Viewer, Formatter & Explorer | JSONex",
    description:
      "Visualize, format, and explore JSON with tree view, graph explorer, and real-time editor.",
    url: "https://jsonex.vercel.app",
    siteName: "JSONex",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JSONex JSON Tool",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "JSONex - JSON Viewer & Formatter",
    description:
      "Powerful JSON viewer, formatter, and explorer for developers.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
  category: "developer tools",
};