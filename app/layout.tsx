// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { OrgaClientProvider } from "./providers/OrgaClientProvider";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TUVOZAMIGA - Una voz amiga que te escucha",
  description:
    "Escucha activa, empatía y conversación cálida cuando más lo necesitas. Una voz amiga disponible de día o de madrugada, directamente en tu navegador.",
  keywords: [
    "voz amiga",
    "compañía",
    "escucha activa",
    "soledad",
    "conversación",
    "asistente de voz",
    "tuvozamiga",
  ],
  authors: [{ name: "TUVOZAMIGA" }],
  icons: {
    icon: [
      {
        url: "/favicon/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: {
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/favicon/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/favicon/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "TUVOZAMIGA - Una voz amiga que te escucha",
    description:
      "Escucha activa, empatía y conversación cálida cuando más lo necesitas. De día o de madrugada.",
    url: "https://tuvozamiga.vercel.app",
    siteName: "TUVOZAMIGA",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TUVOZAMIGA - Una voz amiga que te escucha",
    description:
      "Escucha activa, empatía y conversación cálida cuando más lo necesitas. De día o de madrugada.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geist.className} antialiased`}>
        <OrgaClientProvider>{children}</OrgaClientProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
