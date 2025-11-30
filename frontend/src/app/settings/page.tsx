"use client"
import { useState } from "react"
import { Bell, Volume2, Clock, LogOut, Moon, Sun } from "lucide-react"
import { cn } from "../../lib/utils"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        notifications: true,
        soundEnabled: true,
        focusTime: 25,
        breakTime: 5,
        darkMode: true,
    })

    const handleToggle = (key: keyof typeof settings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
        }))
    }

    const handleLogout = () => {
        console.log("Logout")
        alert("Anda berhasil logout!")
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-10">
            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">Pengaturan</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Sesuaikan aplikasi sesuai preferensi mu</p>
            </div>

            {/* Theme Toggle */}
            <div className="relative group">
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border border-green-500/20 hover-glow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-green-500/15 dark:bg-green-500/20 border border-green-500/30 dark:border-green-500/30">
                                {settings.darkMode ? (
                                    <Moon size={24} className="text-green-600 dark:text-green-400" />
                                ) : (
                                    <Sun size={24} className="text-green-600 dark:text-green-400" />
                                )}
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-bold">Tema</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">
                                    {settings.darkMode ? "Mode Gelap" : "Mode Terang"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle("darkMode")}
                            className={cn(
                                "relative h-8 w-16 rounded-full transition-all duration-300",
                                settings.darkMode ? "bg-gradient-to-r from-green-500 to-emerald-500" : "bg-slate-300 dark:bg-slate-700",
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute top-1 h-6 w-6 bg-white rounded-full transition-all duration-300",
                                    settings.darkMode ? "right-1" : "left-1",
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="relative group">
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border border-green-500/20 hover-glow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-green-500/15 dark:bg-green-500/20 border border-green-500/30 dark:border-green-500/30">
                                <Bell size={24} className="text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-bold">Notifikasi</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Terima notifikasi ketika timer selesai</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle("notifications")}
                            className={cn(
                                "relative h-8 w-16 rounded-full transition-all duration-300",
                                settings.notifications
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                    : "bg-slate-300 dark:bg-slate-700",
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute top-1 h-6 w-6 bg-white rounded-full transition-all duration-300",
                                    settings.notifications ? "right-1" : "left-1",
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sound Section */}
            <div className="relative group">
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border border-green-500/20 hover-glow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-green-500/15 dark:bg-green-500/20 border border-green-500/30 dark:border-green-500/30">
                                <Volume2 size={24} className="text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-slate-900 dark:text-white font-bold">Suara</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Mainkan suara ketika timer selesai</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle("soundEnabled")}
                            className={cn(
                                "relative h-8 w-16 rounded-full transition-all duration-300",
                                settings.soundEnabled
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                    : "bg-slate-300 dark:bg-slate-700",
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute top-1 h-6 w-6 bg-white rounded-full transition-all duration-300",
                                    settings.soundEnabled ? "right-1" : "left-1",
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Focus Time Section */}
            <div className="relative group">
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border border-green-500/20 hover-glow space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-green-500/15 dark:bg-green-500/20 border border-green-500/30 dark:border-green-500/30">
                            <Clock size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-bold">Durasi Fokus</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Durasi sesi fokus (menit)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-16">
                        <input
                            type="range"
                            min="15"
                            max="60"
                            value={settings.focusTime}
                            onChange={(e) => {
                                setSettings((prev) => ({ ...prev, focusTime: Number.parseInt(e.target.value) }))
                            }}
                            className="flex-1 h-2 bg-slate-300 dark:bg-slate-700 rounded-full cursor-pointer accent-green-500"
                        />
                        <span className="text-green-600 dark:text-green-400 font-bold text-lg w-12 text-right">
                            {settings.focusTime}m
                        </span>
                    </div>
                </div>
            </div>

            {/* Break Time Section */}
            <div className="relative group">
                <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border border-green-500/20 hover-glow space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-green-500/15 dark:bg-green-500/20 border border-green-500/30 dark:border-green-500/30">
                            <Clock size={24} className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white font-bold">Durasi Istirahat</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm">Durasi sesi istirahat (menit)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 ml-16">
                        <input
                            type="range"
                            min="1"
                            max="15"
                            value={settings.breakTime}
                            onChange={(e) => {
                                setSettings((prev) => ({ ...prev, breakTime: Number.parseInt(e.target.value) }))
                            }}
                            className="flex-1 h-2 bg-slate-300 dark:bg-slate-700 rounded-full cursor-pointer accent-green-500"
                        />
                        <span className="text-green-600 dark:text-green-400 font-bold text-lg w-12 text-right">
                            {settings.breakTime}m
                        </span>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="space-y-3">
                <h3 className="text-slate-700 dark:text-slate-300 font-bold text-sm uppercase tracking-wider">Akun</h3>
                <button
                    onClick={handleLogout}
                    className="w-full p-4 rounded-xl bg-gradient-to-br from-red-500/10 dark:from-red-500/10 to-red-500/5 dark:to-red-500/10 border border-red-500/30 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/20 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>

            {/* Static Save Button */}
            <div className="sticky bottom-24 md:bottom-0 flex gap-4 pt-6 pb-4 bg-gradient-to-t from-white dark:from-slate-950 to-transparent -mx-8 px-8">
                <button
                    disabled
                    className="flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white opacity-50 cursor-not-allowed"
                >
                    Pengaturan Tersimpan Otomatis
                </button>
            </div>
        </div>
    )
}
