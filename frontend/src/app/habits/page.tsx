"use client";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

// Tipe data sementara (nanti ambil dari API Go)
type Habit = {
    id: number;
    title: string;
    completed: boolean;
    streak: number;
};

export default function HabitsPage() {
    const [habits, setHabits] = useState<Habit[]>([
        { id: 1, title: "Minum Air 2 Liter", completed: true, streak: 5 },
        { id: 2, title: "Belajar Golang 1 Jam", completed: false, streak: 12 },
        { id: 3, title: "Workout Ringan", completed: false, streak: 3 },
        { id: 4, title: "Membaca Buku", completed: true, streak: 8 },
    ]);

    const toggleHabit = (id: number) => {
        // Disini nanti panggil API ke Backend: PUT /api/habits/:id
        setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
    };

    return (
        <div className="max-w-2xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white">Daily Habits</h2>
                    <p className="text-zinc-500">Konsistensi adalah kunci.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
                    <Plus size={16} /> Tambah Baru
                </button>
            </div>

            <div className="space-y-3">
                {habits.map((habit) => (
                    <div
                        key={habit.id}
                        onClick={() => toggleHabit(habit.id)}
                        className={cn(
                            "group flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-300",
                            habit.completed
                                ? "bg-zinc-900/30 border-emerald-900/50 opacity-70"
                                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300",
                                habit.completed ? "bg-emerald-500 border-emerald-500" : "border-zinc-600 group-hover:border-indigo-500"
                            )}>
                                {habit.completed && <Check size={14} className="text-black" />}
                            </div>
                            <span className={cn("font-medium", habit.completed ? "text-zinc-500 line-through" : "text-zinc-200")}>
                                {habit.title}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-zinc-500 text-sm">
                            <span>🔥 {habit.streak} hari</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}