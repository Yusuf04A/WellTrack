"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../lib/utils"; // Pakai relative path biar aman
import { LayoutDashboard, CheckSquare, Smile, Timer, Flame, Settings } from "lucide-react";

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Habits", icon: CheckSquare, href: "/habits" },
    { name: "Mood Tracker", icon: Smile, href: "/mood" },
    { name: "Focus Timer", icon: Timer, href: "/timer" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 border-r border-white/5 bg-zinc-950/50 backdrop-blur-xl h-screen flex flex-col p-6 fixed md:relative z-50">
            {/* Logo Section */}
            <div className="mb-10 flex items-center gap-3 px-2">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <span className="text-white font-bold text-xl">W</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white tracking-tight">WellTrack</h1>
                    <p className="text-xs text-zinc-500">Beta Version</p>
                </div>
            </div>

            {/* Menu Navigation */}
            <nav className="space-y-2 flex-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                                    : "text-zinc-500 hover:text-zinc-200"
                            )}
                        >
                            {/* Background Active dengan Gradient Halus */}
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/10 border border-indigo-500/20 rounded-xl" />
                            )}

                            <item.icon
                                className={cn(
                                    "w-5 h-5 relative z-10 transition-colors",
                                    isActive ? "text-indigo-400" : "text-zinc-600 group-hover:text-zinc-300"
                                )}
                            />
                            <span className="font-medium relative z-10">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section: Streak Card */}
            <div className="mt-auto pt-6">
                <div className="relative p-5 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 overflow-hidden group">
                    {/* Glow animation behind */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 blur-[40px] rounded-full group-hover:bg-orange-500/20 transition-all"></div>

                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                            <Flame size={18} fill="currentColor" />
                        </div>
                        <span className="text-sm font-medium text-zinc-300">Streak Kamu</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <span className="text-3xl font-bold text-white">12</span>
                        <span className="text-sm text-zinc-500 mb-1.5">Hari Beruntun! 🔥</span>
                    </div>
                </div>

                {/* User Profile Mini (Opsional, biar area bawah penuh) */}
                <div className="flex items-center gap-3 mt-6 px-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                        <span className="text-xs font-bold text-zinc-400">N</span>
                    </div>
                    <div className="text-xs text-zinc-400">Pengaturan Akun</div>
                </div>
            </div>
        </aside>
    );
}