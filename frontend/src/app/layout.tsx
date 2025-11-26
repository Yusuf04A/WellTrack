import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "../components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WellTrack - Productivity & Wellness",
  description: "Track habits, mood, and focus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Tambahkan class "dark" di sini agar CSS dark mode jalan
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-200 flex h-screen overflow-hidden`}
      >
        {/* Sidebar Navigasi */}
        <Sidebar />

        {/* Area Utama (Konten) */}
        <main className="flex-1 overflow-y-auto p-8 relative">

          {/* Efek Glow Background (Estetika) */}
          <div className="absolute top-0 left-0 w-full h-96 bg-indigo-900/10 blur-[100px] pointer-events-none" />

          {/* Konten Halaman */}
          <div className="relative z-10 max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}