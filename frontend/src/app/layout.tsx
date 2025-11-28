import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Sidebar from "../components/Sidebar"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WellTrack - Produktivitas & Kesehatan Mental",
  description: "Lacak kebiasaan, mood, dan fokus untuk gaya hidup yang lebih sehat.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className="dark">
      <body
        className={`${_geist.variable} font-sans antialiased bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex h-screen overflow-hidden flex-col md:flex-row`}
      >
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          <div className="fixed top-0 left-1/4 w-96 h-96 bg-green-500/10 blur-[120px] pointer-events-none animate-pulse" />
          <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[120px] pointer-events-none animate-pulse" />

          <div className="relative z-10 max-w-6xl mx-auto">{children}</div>
        </main>

        <Analytics />
      </body>
    </html>
  )
}
