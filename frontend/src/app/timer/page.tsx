"use client";
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "../../lib/utils";

export default function TimerPage() {
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 menit
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<"focus" | "break">("focus");

    useEffect(() => {
        let interval: any;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Disini bisa play sound effect
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex flex-col items-center justify-center pt-10">
            <div className="flex gap-2 p-1 bg-zinc-900 rounded-full border border-zinc-800 mb-10">
                <button
                    onClick={() => { setMode("focus"); setTimeLeft(25 * 60); setIsActive(false); }}
                    className={cn("px-6 py-2 rounded-full text-sm font-medium transition-all", mode === "focus" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-white")}
                >
                    Focus
                </button>
                <button
                    onClick={() => { setMode("break"); setTimeLeft(5 * 60); setIsActive(false); }}
                    className={cn("px-6 py-2 rounded-full text-sm font-medium transition-all", mode === "break" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-white")}
                >
                    Short Break
                </button>
            </div>

            {/* Timer Circle Effect */}
            <div className="relative mb-12 group">
                <div className={cn("absolute inset-0 bg-indigo-500/20 blur-[50px] rounded-full transition-all", isActive ? "scale-110 opacity-100" : "scale-100 opacity-50")}></div>
                <div className="relative text-9xl font-bold font-mono tracking-tighter text-white tabular-nums drop-shadow-2xl">
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    onClick={toggleTimer}
                    className="h-16 w-16 bg-white text-black rounded-2xl flex items-center justify-center hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
                >
                    {isActive ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
                </button>

                <button
                    onClick={resetTimer}
                    className="h-16 w-16 bg-zinc-900 text-zinc-400 border border-zinc-800 rounded-2xl flex items-center justify-center hover:bg-zinc-800 hover:text-white transition-colors"
                >
                    <RotateCcw size={28} />
                </button>
            </div>
        </div>
    );
}