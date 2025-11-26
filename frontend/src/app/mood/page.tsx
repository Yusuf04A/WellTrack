"use client";
import { useState } from "react";
import { cn } from "../../lib/utils";

const moods = [
    { label: "Amazing", emoji: "🤩", color: "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" },
    { label: "Good", emoji: "🙂", color: "bg-blue-500/20 border-blue-500/50 text-blue-400" },
    { label: "Neutral", emoji: "😐", color: "bg-zinc-500/20 border-zinc-500/50 text-zinc-400" },
    { label: "Tired", emoji: "😴", color: "bg-orange-500/20 border-orange-500/50 text-orange-400" },
    { label: "Stressed", emoji: "🤯", color: "bg-red-500/20 border-red-500/50 text-red-400" },
];

export default function MoodPage() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);

    return (
        <div className="max-w-2xl mx-auto text-center pt-10">
            <h2 className="text-3xl font-bold text-white mb-2">Bagaimana mood kamu hari ini?</h2>
            <p className="text-zinc-500 mb-10">Pilih satu yang paling menggambarkan perasaanmu.</p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
                {moods.map((m) => (
                    <button
                        key={m.label}
                        onClick={() => setSelectedMood(m.label)}
                        className={cn(
                            "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300",
                            selectedMood === m.label
                                ? `${m.color} scale-105 shadow-lg shadow-indigo-500/10`
                                : "bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/50"
                        )}
                    >
                        <span className="text-4xl mb-3 block transform hover:scale-110 transition-transform">{m.emoji}</span>
                        <span className="text-sm font-medium">{m.label}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-4 text-left">
                <label className="text-sm text-zinc-400 ml-1">Catatan (Opsional)</label>
                <textarea
                    className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                    placeholder="Ceritakan sedikit tentang hari ini..."
                ></textarea>
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors">
                    Simpan Mood
                </button>
            </div>
        </div>
    );
}