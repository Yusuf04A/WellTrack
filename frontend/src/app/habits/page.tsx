"use client"
import { useState } from "react"
import { Check, Plus, Trash2 } from "lucide-react"
import { cn } from "../../lib/utils"

type Habit = {
    id: number
    title: string
    completed: boolean
    streak: number
}

export default function HabitsPage() {
    const [habits, setHabits] = useState<Habit[]>([
        { id: 1, title: "Minum Air 2 Liter", completed: true, streak: 5 },
        { id: 2, title: "Belajar Golang 1 Jam", completed: false, streak: 12 },
        { id: 3, title: "Workout Ringan", completed: false, streak: 3 },
        { id: 4, title: "Membaca Buku", completed: true, streak: 8 },
    ])

    const toggleHabit = (id: number) => {
        setHabits(habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h)))
    }

    const deleteHabit = (id: number) => {
        setHabits(habits.filter((h) => h.id !== id))
    }

    const completedCount = habits.filter((h) => h.completed).length

    return (
        <div className="space-y-6 md:space-y-8 animate-float-up">
            <div className="space-y-4">
                <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Daily Habits</h2>
                        <p className="text-slate-400 text-lg">Konsistensi adalah kunci kesuksesan 🔑</p>
                    </div>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-slate-950 px-4 md:px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-400 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 smooth-transition">
                        <Plus size={18} /> Tambah Habit
                    </button>
                </div>

                <div className="relative p-4 md:p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-green-500/20 hover-glow">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-300 font-medium">Progress Hari Ini</span>
                        <span className="text-green-400 font-bold text-lg">
                            {completedCount}/{habits.length}
                        </span>
                    </div>
                    <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 smooth-transition"
                            style={{ width: `${(completedCount / habits.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2 md:space-y-3">
                {habits.map((habit, i) => (
                    <div key={habit.id} style={{ animationDelay: `${i * 0.1}s` }} className="animate-float-up">
                        <div
                            onClick={() => toggleHabit(habit.id)}
                            className={cn(
                                "group flex items-center justify-between p-4 md:p-5 rounded-xl border transition-all duration-400 cursor-pointer hover-lift relative overflow-hidden",
                                habit.completed
                                    ? "bg-gradient-to-r from-green-600/10 to-emerald-600/10 border-green-500/30 hover:border-green-500/50"
                                    : "bg-gradient-to-r from-slate-900/50 to-slate-950/50 border-slate-700/50 hover:border-green-500/50 hover:bg-slate-900/70",
                            )}
                        >
                            {habit.completed && (
                                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                            )}

                            <div className="flex items-center gap-3 md:gap-4 flex-1 relative z-10">
                                <div
                                    className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-400 flex-shrink-0",
                                        habit.completed
                                            ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 shadow-lg shadow-green-500/50"
                                            : "border-slate-600 group-hover:border-green-500 group-hover:shadow-lg group-hover:shadow-green-500/30",
                                    )}
                                >
                                    {habit.completed && <Check size={16} className="text-slate-950 font-bold" />}
                                </div>
                                <span
                                    className={cn(
                                        "font-semibold text-sm md:text-base transition-all duration-400",
                                        habit.completed ? "text-slate-500 line-through" : "text-slate-100 group-hover:text-white",
                                    )}
                                >
                                    {habit.title}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 md:gap-4 relative z-10">
                                <div className="flex items-center gap-2 text-xs md:text-sm px-3 py-1 rounded-lg bg-slate-800/50 group-hover:bg-slate-800 transition-all duration-400">
                                    <span className="text-green-400 font-bold">🔥</span>
                                    <span className="text-slate-300 font-semibold">{habit.streak}</span>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        deleteHabit(habit.id)
                                    }}
                                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-400 opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
