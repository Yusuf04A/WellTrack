"use client"
import { useState, useEffect } from "react"
import { Play, Pause, RotateCcw, Check } from "lucide-react"
import { cn } from "../../lib/utils"

export default function TimerPage() {
    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false)
    const [mode, setMode] = useState<"focus" | "break">("focus")
    const [sessionsCompleted, setSessionsCompleted] = useState(0)

    useEffect(() => {
        let interval: any
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false)
            if (mode === "focus") {
                setSessionsCompleted((s) => s + 1)
            }
        }
        return () => clearInterval(interval)
    }, [isActive, timeLeft, mode])

    const toggleTimer = () => setIsActive(!isActive)

    const resetTimer = () => {
        setIsActive(false)
        setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const progress = ((mode === "focus" ? 25 * 60 : 5 * 60) - timeLeft) / (mode === "focus" ? 25 * 60 : 5 * 60)

    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-12 pt-10 animate-float-up">
            <div className="flex gap-3 p-2 bg-slate-900/50 border border-slate-700/50 rounded-full hover-glow">
                <button
                    onClick={() => {
                        setMode("focus")
                        setTimeLeft(25 * 60)
                        setIsActive(false)
                    }}
                    className={cn(
                        "px-8 py-3 rounded-full text-sm font-bold transition-all duration-300",
                        mode === "focus"
                            ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-lg shadow-cyan-500/30"
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
                    }}
                    className={cn(
                        "px-8 py-3 rounded-full text-sm font-bold transition-all duration-300",
                        mode === "break"
                            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50",
                    )}
                >
                    Break (5m)
                </button>
            </div>

            <div className="relative">
                <div className="relative w-72 h-72 flex items-center justify-center">
                    <div
                        className={cn(
                            "absolute inset-0 rounded-full transition-all duration-300",
                            isActive
                                ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-[60px] animate-pulse"
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
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                        </defs>
                    </svg>

                    <div className="relative z-10 text-center">
                        <div className="text-8xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 tracking-tighter drop-shadow-2xl">
                            {formatTime(timeLeft)}
                        </div>
                        <p className="text-slate-400 text-sm font-medium mt-4 uppercase tracking-widest">
                            {mode === "focus" ? "Waktu Fokus" : "Istirahat"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={toggleTimer}
                    className={cn(
                        "h-16 w-16 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 hover:shadow-lg",
                        isActive
                            ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                            : "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50",
                    )}
                >
                    {isActive ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
                </button>

                <button
                    onClick={resetTimer}
                    className="h-16 w-16 bg-slate-900/50 text-slate-400 border border-slate-700/50 rounded-2xl flex items-center justify-center hover:bg-slate-800/70 hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                    <RotateCcw size={28} />
                </button>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-600/10 to-amber-600/5 border border-orange-500/30 hover-glow">
                <div className="flex items-center gap-3">
                    <Check size={24} className="text-orange-400" />
                    <div>
                        <p className="text-slate-400 text-sm">Sesi Selesai Hari Ini</p>
                        <p className="text-3xl font-bold text-white">
                            {sessionsCompleted}
                            <span className="text-orange-400 ml-2">🎯</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-md text-center space-y-3 p-6 rounded-2xl bg-slate-900/30 border border-slate-700/30">
                <p className="text-slate-400 text-sm leading-relaxed">
                    💡 <strong className="text-slate-200">Tips:</strong> Fokus tanpa gangguan untuk hasil maksimal.
                </p>
            </div>
        </div>
    )
}
