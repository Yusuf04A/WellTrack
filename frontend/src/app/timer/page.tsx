"use client"
import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Check } from "lucide-react"
import { cn } from "../../lib/utils"

export default function TimerPage() {
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState<"focus" | "break">("focus")
    const [sessionsCompleted, setSessionsCompleted] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const notificationShownRef = useRef(false)

    useEffect(() => {
        let interval: any
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false)
            if (mode === "focus") {
                setSessionsCompleted((s) => s + 1)
            }

            if (!notificationShownRef.current) {
                notificationShownRef.current = true

                // Show browser notification
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("WellTrack", {
                        body: mode === "focus" ? "Waktu fokus selesai! Ambil istirahat." : "Istirahat selesai! Siap fokus lagi?",
                        icon: "/icon.svg",
                        tag: "welltrack-timer",
                    })
                }

                // Play sound
                const audioUrl = "data:audio/wav;base64,UklGRiYAAABXQVZFZm10IBAAAAABAAEAQB8AAAB9AAACABAAZGF0YQIAAAAAAA=="
                const audio = new Audio(audioUrl)
                audio.play().catch(() => {
                    console.log("Audio play failed")
                })

                setTimeout(() => {
                    notificationShownRef.current = false
                }, 1000)
            }
        }
        return () => clearInterval(interval)
    }, [isActive, timeLeft, mode])

    useEffect(() => {
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission()
        }
    }, [])

    const toggleTimer = () => setIsActive(!isActive)

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60)
        notificationShownRef.current = false
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const progress = ((mode === "focus" ? 25 * 60 : 5 * 60) - timeLeft) / (mode === "focus" ? 25 * 60 : 5 * 60)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-8 md:space-y-12 pt-10 pb-10 animate-float-up">
            <div className="flex gap-3 p-2 bg-slate-900/50 border border-slate-700/50 rounded-full hover-glow">
                <button
                    onClick={() => {
                        setMode("focus")
                        setTimeLeft(25 * 60)
                        setIsActive(false)
                        notificationShownRef.current = false
                    }}
                    className={cn(
                        "px-6 md:px-8 py-2 md:py-3 rounded-full text-sm font-bold transition-all duration-400 smooth-transition",
                        mode === "focus"
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-slate-950 shadow-lg shadow-green-500/30"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                    )}
                >
                    Focus (25m)
                </button>
                <button
                    onClick={() => {
                        setMode("break")
                        setTimeLeft(5 * 60)
                        setIsActive(false)
                        notificationShownRef.current = false
                    }}
                    className={cn(
                        "px-6 md:px-8 py-2 md:py-3 rounded-full text-sm font-bold transition-all duration-400 smooth-transition",
                        mode === "break"
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                    )}
                >
                    Break (5m)
                </button>
            </div>

            <div className="relative">
                <div className="relative w-64 md:w-72 h-64 md:h-72 flex items-center justify-center">
                    <div
                        className={cn(
                            "absolute inset-0 rounded-full transition-all duration-300 smooth-transition",
                            isActive
                                ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-[60px] animate-pulse"
                                : "bg-slate-600/10 blur-[60px]",
                        )}
                    />

                    <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(71, 85, 105, 0.2)" strokeWidth="2" />

                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#progressGradient)"
                            strokeWidth="3"
                            strokeDasharray={`${progress * 282.6} 282.6`}
                            strokeLinecap="round"
                            style={{
                                transform: "rotate(-90deg)",
                                transformOrigin: "50% 50%",
                                transition: "stroke-dasharray 1s linear",
                            }}
                        />

                        <defs>
                            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#22c55e" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="relative z-10 text-center">
                        <div className="text-6xl md:text-8xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 tracking-tighter drop-shadow-2xl">
                            {formatTime(timeLeft)}
                        </div>
                        <p className="text-slate-400 text-xs md:text-sm font-medium mt-3 md:mt-4 uppercase tracking-widest">
                            {mode === "focus" ? "Waktu Fokus" : "Istirahat"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 md:gap-4">
                <button
                    onClick={toggleTimer}
                    className={cn(
                        "h-14 md:h-16 w-14 md:w-16 rounded-2xl flex items-center justify-center font-bold transition-all duration-400 hover:scale-110 hover:shadow-lg smooth-transition",
                        isActive
                            ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                            : "bg-gradient-to-r from-green-500 to-emerald-500 text-slate-950 shadow-lg shadow-green-500/30 hover:shadow-green-500/50",
                    )}
                >
                    {isActive ? <Pause size={28} fill="white" /> : <Play size={28} fill="white" className="ml-1" />}
                </button>

                <button
                    onClick={resetTimer}
                    className="h-14 md:h-16 w-14 md:w-16 bg-slate-900/50 text-slate-400 border border-slate-700/50 rounded-2xl flex items-center justify-center hover:bg-slate-800/70 hover:border-green-500/50 hover:text-green-400 transition-all duration-400 hover:scale-110 hover:shadow-lg smooth-transition"
                >
                    <RotateCcw size={24} />
                </button>
            </div>

            <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/30 hover-glow animate-gentle-float">
                <div className="flex items-center gap-3 md:gap-4">
                    <Check size={24} className="text-green-400 flex-shrink-0" />
                    <div>
                        <p className="text-slate-400 text-sm">Sesi Selesai Hari Ini</p>
                        <p className="text-2xl md:text-3xl font-bold text-white">
                            {sessionsCompleted}
                            <span className="text-green-400 ml-2">🎯</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-md text-center space-y-3 p-4 md:p-6 rounded-2xl bg-slate-900/30 border border-slate-700/30">
                <p className="text-slate-400 text-sm leading-relaxed">
                    💡 <strong className="text-slate-200">Tips:</strong> Fokus tanpa gangguan untuk hasil maksimal. Timer akan
                    tetap berjalan meski kamu berpindah halaman.
                </p>
            </div>
        </div>
    )
}
