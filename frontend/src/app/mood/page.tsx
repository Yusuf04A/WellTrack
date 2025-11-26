"use client"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { Send } from "lucide-react"

const moods = [
    {
        label: "Amazing",
        emoji: "🤩",
        color: "from-emerald-500/20 to-emerald-500/5",
        border: "border-emerald-500/30",
        textColor: "text-emerald-400",
        shadowColor: "shadow-emerald-500/30",
    },
    {
        label: "Good",
        emoji: "🙂",
        color: "from-cyan-500/20 to-cyan-500/5",
        border: "border-cyan-500/30",
        textColor: "text-cyan-400",
        shadowColor: "shadow-cyan-500/30",
    },
    {
        label: "Neutral",
        emoji: "😐",
        color: "from-slate-500/20 to-slate-500/5",
        border: "border-slate-500/30",
        textColor: "text-slate-400",
        shadowColor: "shadow-slate-500/30",
    },
    {
        label: "Tired",
        emoji: "😴",
        color: "from-amber-500/20 to-amber-500/5",
        border: "border-amber-500/30",
        textColor: "text-amber-400",
        shadowColor: "shadow-amber-500/30",
    },
    {
        label: "Stressed",
        emoji: "😰",
        color: "from-red-500/20 to-red-500/5",
        border: "border-red-500/30",
        textColor: "text-red-400",
        shadowColor: "shadow-red-500/30",
    },
]

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null)
    const [note, setNote] = useState("")

    const handleSave = () => {
        if (selectedMood && note.trim()) {
            console.log("Mood saved:", { mood: selectedMood, note })
            setSelectedMood(null)
            setNote("")
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-10 animate-float-up">
            <div className="text-center space-y-3">
                <h2 className="text-5xl md:text-6xl font-bold text-white">
                    Bagaimana Mood <span className="gradient-text">Kamu</span> Hari Ini?
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Pilih salah satu yang paling menggambarkan perasaanmu saat ini.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {moods.map((m, i) => (
                    <button
                        key={m.label}
                        style={{ animationDelay: `${i * 0.1}s` }}
                        onClick={() => setSelectedMood(m.label)}
                        className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 animate-float-up group",
                            selectedMood === m.label
                                ? `bg-gradient-to-br ${m.color} border-opacity-100 ${m.border} scale-105 shadow-lg ${m.shadowColor}`
                                : `bg-gradient-to-br from-slate-900 to-slate-950 border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/50`,
                        )}
                    >
                        <span className="text-5xl mb-4 block group-hover:scale-125 transition-transform duration-300">
                            {m.emoji}
                        </span>
                        <span
                            className={cn(
                                "text-sm font-bold transition-colors duration-300",
                                selectedMood === m.label ? m.textColor : "text-slate-300",
                            )}
                        >
                            {m.label}
                        </span>
                    </button>
                ))}
            </div>

            <div
                className={cn(
                    "space-y-4 p-8 rounded-2xl border transition-all duration-500",
                    selectedMood
                        ? "bg-gradient-to-br from-slate-900 to-slate-950 border-cyan-500/30 shadow-lg shadow-cyan-500/20"
                        : "bg-slate-900/30 border-slate-700/30",
                )}
            >
                <div>
                    <label className="text-sm font-semibold text-slate-300 ml-1 block mb-3">
                        Ceritakan lebih lanjut (Opsional)
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Apa yang membuat perasaanmu seperti ini?"
                        className={cn(
                            "w-full h-32 bg-slate-950/50 border rounded-xl p-4 text-slate-100 placeholder-slate-500 focus-ring resize-none transition-all duration-300",
                            selectedMood
                                ? "border-cyan-500/30 focus:border-cyan-500/60 focus:bg-slate-950/70"
                                : "border-slate-700/50 focus:border-slate-600/70",
                        )}
                    />
                </div>

                <button
                    onClick={handleSave}
                    disabled={!selectedMood}
                    className={cn(
                        "w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300",
                        selectedMood
                            ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
                            : "bg-slate-800 text-slate-600 cursor-not-allowed",
                    )}
                >
                    <Send size={18} />
                    Simpan Mood
                </button>
            </div>

            {selectedMood && (
                <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600/10 to-cyan-600/10 border border-emerald-500/30 animate-float-up">
                    <p className="text-emerald-300 font-semibold text-center">
                        ✨ Sempurna! Kamu sedang mengambil langkah penting untuk kesejahteraan mental.
                    </p>
                </div>
            )}
        </div>
    )
}
