"use client";

import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SongProvider } from "@/contexts/SongContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Karaoke de Instrumentos",
  description: "App de karaoke de instrumentos"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SongProvider>
          <main>{children}</main>
        </SongProvider>
      </body>
    </html>
  );
}
