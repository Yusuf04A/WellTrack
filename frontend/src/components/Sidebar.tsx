"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils"
import { LayoutDashboard, CheckSquare, Smile, Timer, Flame, Settings, TrendingUp, Menu, X } from "lucide-react"
import { useState } from "react"

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Habits", icon: CheckSquare, href: "/habits" },
    { name: "Mood", icon: Smile, href: "/mood" },
    { name: "Focus Timer", icon: Timer, href: "/timer" },
    { name: "Settings", icon: Settings, href: "/settings" },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 transition-all duration-300"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {isOpen && <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)} />}

            <aside
                className={cn(
                    "w-64 border-r border-green-500/20 bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-xl h-screen flex flex-col p-6 overflow-y-auto fixed md:relative z-40 md:z-0 transition-all duration-300 ease-out",
                    isOpen ? "left-0" : "-left-64 md:left-0",
                )}
            >
                {/* Logo Section */}
                <div className="mb-12 flex items-center gap-3 px-3 animate-float-up">
                    <div className="h-10 w-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-green-400/30">
                        <TrendingUp size={20} className="text-slate-950 font-bold" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold gradient-text">WellTrack</h1>
                        <p className="text-xs text-slate-400">v1.0</p>
                    </div>
                </div>

                {/* Menu Navigation */}
                <nav className="space-y-2 flex-1">
                    {menuItems.map((item, i) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                style={{ animationDelay: `${i * 0.08}s` }}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-400 group relative overflow-hidden animate-smooth-slide-in",
                                    isActive ? "text-green-300 shadow-lg shadow-green-500/30" : "text-slate-400 hover:text-slate-200",
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/10 border border-green-500/30 rounded-xl animate-pulse-glow" />
                                )}

                                <item.icon
                                    className={cn(
                                        "w-5 h-5 relative z-10 transition-all duration-400",
                                        isActive
                                            ? "text-green-300 scale-110"
                                            : "text-slate-500 group-hover:text-green-400 group-hover:scale-110",
                                    )}
                                />
                                <span className="font-medium relative z-10 text-sm">{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom Section: Streak Card */}
                <div className="mt-auto pt-6 space-y-4">
                    <div className="relative p-5 rounded-2xl bg-gradient-to-br from-green-600/10 to-emerald-600/5 border border-green-500/30 overflow-hidden group hover-lift animate-gentle-float">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/15 blur-[40px] rounded-full group-hover:bg-green-500/30 transition-all duration-400" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Flame size={16} className="text-green-400" fill="currentColor" />
                                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Streak Anda</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-white">12</span>
                                <span className="text-sm text-slate-400 mb-1">Hari Beruntun! 🔥</span>
                            </div>
                        </div>
                    </div>

                    <Link href="/settings" onClick={() => setIsOpen(false)} className="w-full block">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/30 border border-slate-700/50 text-slate-400 hover:bg-slate-700/50 hover:border-green-500/50 hover:text-green-300 transition-all duration-400 group smooth-transition">
                            <Settings size={18} className="group-hover:rotate-45 transition-transform duration-500" />
                            <span className="text-sm font-medium">Pengaturan</span>
                        </button>
                    </Link>
                </div>
            </aside>
        </>
    )
}
