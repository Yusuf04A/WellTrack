"use client"
import { useState } from "react"
import { cn } from "../../lib/utils"
import { Send, Heart, Smile, Frown, Moon, AlertCircle, Check } from "lucide-react"

const moods = [
    {
        label: "Amazing",
        icon: Smile,
        color: "from-emerald-500/20 dark:from-emerald-500/25 to-emerald-500/5 dark:to-emerald-500/10",
        border: "border-green-500/30 dark:border-green-500/30",
        textColor: "text-green-600 dark:text-green-400",
        shadowColor: "shadow-green-500/30 dark:shadow-green-500/40",
    },
    {
        label: "Good",
        icon: Heart,
        color: "from-green-500/20 dark:from-green-500/25 to-green-500/5 dark:to-green-500/10",
        border: "border-green-500/30 dark:border-green-500/30",
        textColor: "text-green-600 dark:text-green-400",
        shadowColor: "shadow-green-500/30 dark:shadow-green-500/40",
    },
    {
        label: "Neutral",
        icon: AlertCircle,
        color: "from-slate-500/20 dark:from-slate-500/25 to-slate-500/5 dark:to-slate-500/10",
        border: "border-slate-500/30 dark:border-slate-500/30",
        textColor: "text-slate-600 dark:text-slate-400",
        shadowColor: "shadow-slate-500/30 dark:shadow-slate-500/40",
    },
    {
        label: "Tired",
        icon: Moon,
        color: "from-amber-500/20 dark:from-amber-500/25 to-amber-500/5 dark:to-amber-500/10",
        border: "border-amber-500/30 dark:border-amber-500/30",
        textColor: "text-amber-600 dark:text-amber-400",
        shadowColor: "shadow-amber-500/30 dark:shadow-amber-500/40",
    },
    {
        label: "Stressed",
        icon: Frown,
        color: "from-red-500/20 dark:from-red-500/25 to-red-500/5 dark:to-red-500/10",
        border: "border-red-500/30 dark:border-red-500/30",
        textColor: "text-red-600 dark:text-red-400",
        shadowColor: "shadow-red-500/30 dark:shadow-red-500/40",
    },
]

const motivationalMessages = [
    "Terima kasih telah berbagi perasaanmu! Kamu luar biasa 💪",
    "Kesadaran diri adalah langkah pertama menuju perubahan positif ✨",
    "Setiap hari adalah kesempatan baru untuk tumbuh 🌱",
    "Kamu melakukan hal yang tepat dengan peduli pada kesehatan mental! 🌟",
    "Terus jaga kesejahteraanmu, kamu layak mendapatkan yang terbaik ❤️",
    "Mood mu telah dicatat. Kamu tidak sendirian dalam perjalanan ini 🤝",
    "Hebat! Terus lanjutkan komitmenmu untuk wellness 🎯",
    "Setiap mood adalah data berharga untuk self-awareness mu 📊",
]

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null)
    const [note, setNote] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const handleSave = () => {
        if (selectedMood && note.trim()) {
            console.log("Mood saved:", { mood: selectedMood, note })
            const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
            setSuccessMessage(randomMessage)
            setShowSuccess(true)

            setTimeout(() => {
                setShowSuccess(false)
                setSelectedMood(null)
                setNote("")
            }, 4000)
        }
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-10 pb-10">
            <div className="text-center space-y-3">
                <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white text-balance">
                    Bagaimana Mood <span className="gradient-text">Kamu</span> Hari Ini?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
                    Pilih salah satu yang paling menggambarkan perasaanmu saat ini.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                {moods.map((m, i) => (
                    <button
                        key={m.label}
                        onClick={() => setSelectedMood(m.label)}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl border transition-all duration-400 group",
                            selectedMood === m.label
                                ? `bg-gradient-to-br ${m.color} border-opacity-100 ${m.border} scale-105 shadow-lg ${m.shadowColor}`
                                : `bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border-slate-300/50 dark:border-slate-700/50 hover:border-green-500/50 dark:hover:border-green-500/50 hover:bg-slate-200/50 dark:hover:bg-slate-800/50`,
                        )}
                    >
                        <m.icon
                            size={40}
                            className={cn(
                                "mb-2 md:mb-4 block group-hover:scale-125 transition-transform duration-400",
                                selectedMood === m.label ? m.textColor : "text-slate-600 dark:text-slate-500",
                            )}
                        />
                        <span
                            className={cn(
                                "text-xs md:text-sm font-bold transition-colors duration-400",
                                selectedMood === m.label ? m.textColor : "text-slate-700 dark:text-slate-300",
                            )}
                        >
                            {m.label}
                        </span>
                    </button>
                ))}
            </div>

            <div
                className={cn(
                    "space-y-4 p-4 md:p-8 rounded-2xl border transition-all duration-500",
                    selectedMood
                        ? "bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border-green-500/30 shadow-lg shadow-green-500/20 dark:shadow-green-500/20"
                        : "bg-slate-100/50 dark:bg-slate-900/30 border-slate-300/50 dark:border-slate-700/30",
                )}
            >
                <div>
                    <label className="text-sm font-semibold text-slate-800 dark:text-slate-300 ml-1 block mb-3">
                        Ceritakan lebih lanjut (Opsional)
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Apa yang membuat perasaanmu seperti ini?"
                        className={cn(
                            "w-full h-24 md:h-32 bg-white/80 dark:bg-slate-950/50 border rounded-xl p-3 md:p-4 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-500 focus:outline-none focus:ring-2 resize-none transition-all duration-400",
                            selectedMood
                                ? "border-green-500/30 dark:border-green-500/30 focus:border-green-500/60 dark:focus:border-green-500/60 focus:bg-white/90 dark:focus:bg-slate-950/70 focus:ring-green-500"
                                : "border-slate-300/50 dark:border-slate-700/50 focus:border-slate-600/70 dark:focus:border-slate-600/70 focus:ring-slate-600",
                        )}
                    />
                </div>

                <button
                    onClick={handleSave}
                    disabled={!selectedMood}
                    className={cn(
                        "w-full py-3 md:py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-400",
                        selectedMood
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-400 hover:to-emerald-400 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105"
                            : "bg-slate-300 dark:bg-slate-800 text-slate-600 dark:text-slate-600 cursor-not-allowed",
                    )}
                >
                    <Send size={18} />
                    Simpan Mood
                </button>
            </div>

            {selectedMood && !showSuccess && (
                <div className="p-4 md:p-6 rounded-2xl bg-gradient-to-br from-green-600/10 dark:from-green-600/10 to-emerald-600/5 dark:to-emerald-600/10 border border-green-500/30 dark:border-green-500/30">
                    <p className="text-green-700 dark:text-green-300 font-semibold text-center text-sm md:text-base">
                        ✨ Sempurna! Kamu sedang mengambil langkah penting untuk kesejahteraan mental.
                    </p>
                </div>
            )}

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-white dark:from-slate-900 to-slate-100/50 dark:to-slate-950 rounded-2xl p-8 max-w-md w-full border border-green-500/30 shadow-2xl shadow-green-500/30 dark:shadow-green-500/20 animate-float-up">
                        <div className="text-center space-y-4">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-500/20 dark:from-green-500/25 to-emerald-500/10 dark:to-emerald-500/15 border border-green-500/30">
                                <Check size={40} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Berhasil Tersimpan!</h3>
                            <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">{successMessage}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
