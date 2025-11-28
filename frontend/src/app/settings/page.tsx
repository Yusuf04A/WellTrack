"use client"
import { useState } from "react"
import { Save, Bell, Volume2, Clock, Trash2, LogOut } from "lucide-react"
import { cn } from "../../lib/utils"

export default function SettingsPage() {
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: true,
        focusTime: 25,
        breakTime: 5,
        soundEnabled: true,
    })

    const [saved, setSaved] = useState(false)

    const handleToggle = (key: keyof typeof settings) => {
        setSettings((prev) => ({
            ...prev,
            [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
        }))
        setSaved(false)
    }

    const handleSave = () => {
        console.log("Settings saved:", settings)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-float-up pb-10">
            <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white">Pengaturan</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Sesuaikan aplikasi sesuai preferensi mu</p>
            </div>

            {/* Notifications Section */}
            <div className="relative group animate-float-up" style={{ animationDelay: "0.1s" }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/10 dark:from-green-600/20 to-emerald-600/10 dark:to-emerald-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
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
                                "relative h-8 w-16 rounded-full transition-all duration-400 smooth-transition",
                                settings.notifications
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                    : "bg-slate-300 dark:bg-slate-700",
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute top-1 h-6 w-6 bg-white rounded-full transition-all duration-400 smooth-transition",
                                    settings.notifications ? "right-1" : "left-1",
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sound Section */}
            <div className="relative group animate-float-up" style={{ animationDelay: "0.2s" }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/10 dark:from-green-600/20 to-emerald-600/10 dark:to-emerald-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
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
                                "relative h-8 w-16 rounded-full transition-all duration-400 smooth-transition",
                                settings.soundEnabled
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                                    : "bg-slate-300 dark:bg-slate-700",
                            )}
                        >
                            <div
                                className={cn(
                                    "absolute top-1 h-6 w-6 bg-white rounded-full transition-all duration-400 smooth-transition",
                                    settings.soundEnabled ? "right-1" : "left-1",
                                )}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Focus Time Section */}
            <div className="relative group animate-float-up" style={{ animationDelay: "0.3s" }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/10 dark:from-green-600/20 to-emerald-600/10 dark:to-emerald-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
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
                                setSaved(false)
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
            <div className="relative group animate-float-up" style={{ animationDelay: "0.4s" }}>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600/10 dark:from-green-600/20 to-emerald-600/10 dark:to-emerald-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
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
                                setSaved(false)
                            }}
                            className="flex-1 h-2 bg-slate-300 dark:bg-slate-700 rounded-full cursor-pointer accent-green-500"
                        />
                        <span className="text-green-600 dark:text-green-400 font-bold text-lg w-12 text-right">
                            {settings.breakTime}m
                        </span>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-3 animate-float-up" style={{ animationDelay: "0.5s" }}>
                <h3 className="text-slate-700 dark:text-slate-300 font-bold text-sm uppercase tracking-wider">Zona Bahaya</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 dark:from-red-500/10 to-red-500/5 dark:to-red-500/10 border border-red-500/30 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/20 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-400 flex items-center justify-center gap-2 smooth-transition">
                        <Trash2 size={18} />
                        Hapus Semua Data
                    </button>
                    <button className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 dark:from-orange-500/10 to-orange-500/5 dark:to-orange-500/10 border border-orange-500/30 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 dark:hover:bg-orange-500/20 hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-all duration-400 flex items-center justify-center gap-2 smooth-transition">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Save Button */}
            <div
                className="sticky bottom-0 flex gap-4 pt-6 pb-4 bg-gradient-to-t from-white dark:from-slate-950 to-transparent -mx-8 px-8 animate-float-up"
                style={{ animationDelay: "0.6s" }}
            >
                <button
                    onClick={handleSave}
                    className={cn(
                        "flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-400 smooth-transition",
                        saved
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30 scale-105"
                            : "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105",
                    )}
                >
                    <Save size={20} />
                    {saved ? "Tersimpan!" : "Simpan Pengaturan"}
                </button>
            </div>
        </div>
    )
}
