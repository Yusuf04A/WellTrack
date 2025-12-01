"use client"
import { useState } from "react"
import { Check, Plus, Trash2, X, Save } from "lucide-react"
import { cn } from "../../lib/utils"

type Habit = {
    id: number
    title: string
    completed: boolean
    streak: number
    targets?: string[]
    days?: number
    duration?: number
}

type PendingChanges = {
    [key: number]: boolean
}

export default function HabitsPage() {
    const [habits, setHabits] = useState<Habit[]>([
        {
            id: 1,
            title: "Minum Air 2 Liter",
            completed: true,
            streak: 5,
            targets: ["2 liter", "4 gelas"],
            days: 5,
            duration: 30,
        },
        { id: 2, title: "Belajar Golang 1 Jam", completed: false, streak: 12, targets: ["1 jam"], days: 12, duration: 60 },
        { id: 3, title: "Workout Ringan", completed: false, streak: 3, days: 3, duration: 45 },
        { id: 4, title: "Membaca Buku", completed: true, streak: 8, targets: ["20 halaman"], days: 8, duration: 20 },
    ])

    const [pendingChanges, setPendingChanges] = useState<PendingChanges>({})
    const [showAddModal, setShowAddModal] = useState(false)
    const [newHabitTitle, setNewHabitTitle] = useState("")
    const [newTargets, setNewTargets] = useState<string[]>([""])
    const [newDays, setNewDays] = useState(1)
    const [newDuration, setNewDuration] = useState(30)

    const toggleHabit = (id: number) => {
        setPendingChanges((prev) => ({
            ...prev,
            [id]: !prev[id],
        }))
    }

    const saveChanges = () => {
        if (Object.keys(pendingChanges).length > 0) {
            const updatedHabits = habits.map((h) => {
                if (pendingChanges[h.id] !== undefined) {
                    return { ...h, completed: pendingChanges[h.id] }
                }
                return h
            })
            setHabits(updatedHabits)
            setPendingChanges({})
        }
    }

    const cancelChanges = () => {
        setPendingChanges({})
    }

    const deleteHabit = (id: number) => {
        setHabits(habits.filter((h) => h.id !== id))
    }

    const addHabit = () => {
        if (newHabitTitle.trim()) {
            const newHabit: Habit = {
                id: Math.max(...habits.map((h) => h.id), 0) + 1,
                title: newHabitTitle,
                completed: false,
                streak: 0,
                targets: newTargets.filter((t) => t.trim()),
                days: newDays,
                duration: newDuration,
            }
            setHabits([...habits, newHabit])
            setNewHabitTitle("")
            setNewTargets([""])
            setNewDays(1)
            setNewDuration(30)
            setShowAddModal(false)
        }
    }

    const addTargetField = () => {
        setNewTargets([...newTargets, ""])
    }

    const updateTarget = (index: number, value: string) => {
        const updated = [...newTargets]
        updated[index] = value
        setNewTargets(updated)
    }

    const removeTarget = (index: number) => {
        setNewTargets(newTargets.filter((_, i) => i !== index))
    }

    const completedCount = habits.filter((h) => {
        const hasChange = h.id in pendingChanges
        return hasChange ? pendingChanges[h.id] : h.completed
    }).length

    const hasPendingChanges = Object.keys(pendingChanges).length > 0

    return (
        <div className="space-y-6 md:space-y-8 pb-32 md:pb-10">
            <div className="space-y-4">
                <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">Daily Habits</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">Konsistensi adalah kunci kesuksesan</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white dark:text-slate-950 px-4 md:px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30"
                    >
                        <Plus size={18} /> Tambah Habit
                    </button>
                </div>

                <div className="relative p-4 md:p-6 rounded-2xl bg-gradient-to-r from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border border-green-500/20 hover-glow">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Progress Hari Ini</span>
                        <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                            {completedCount}/{habits.length}
                        </span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-300/50 dark:border-slate-700/50">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500"
                            style={{ width: `${(completedCount / habits.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2 md:space-y-3">
                {habits.map((habit) => {
                    const isChanged = pendingChanges[habit.id] !== undefined
                    const futureState = isChanged ? pendingChanges[habit.id] : habit.completed

                    return (
                        <div key={habit.id} className="space-y-2">
                            <div
                                className={cn(
                                    "group flex items-center justify-between p-4 md:p-5 rounded-xl border transition-all duration-300 cursor-pointer hover-lift relative overflow-hidden",
                                    futureState
                                        ? "bg-gradient-to-r from-green-600/10 dark:from-green-600/10 to-emerald-600/5 dark:to-emerald-600/10 border-green-500/30 hover:border-green-500/50"
                                        : "bg-gradient-to-r from-slate-100/50 dark:from-slate-900/50 to-slate-50/50 dark:to-slate-950/50 border-slate-300/50 dark:border-slate-700/50 hover:border-green-500/50 dark:hover:border-green-500/50 hover:bg-slate-200/30 dark:hover:bg-slate-900/70",
                                )}
                            >
                                {futureState && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 dark:from-green-600/5 to-emerald-600/5 dark:to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                )}

                                <div className="flex items-center gap-3 md:gap-4 flex-1 relative z-10">
                                    <button
                                        onClick={() => toggleHabit(habit.id)}
                                        className={cn(
                                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0",
                                            futureState
                                                ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-400 shadow-md shadow-green-500/50"
                                                : "border-slate-400 dark:border-slate-600 group-hover:border-green-500 dark:group-hover:border-green-500 group-hover:shadow-lg group-hover:shadow-green-500/30 dark:group-hover:shadow-green-500/30",
                                        )}
                                    >
                                        {futureState && <Check size={16} className="text-white font-bold" />}
                                    </button>
                                    <div className="flex-1">
                                        <span
                                            className={cn(
                                                "font-semibold text-sm md:text-base transition-all duration-300 block",
                                                futureState
                                                    ? "text-slate-500 dark:text-slate-500 line-through"
                                                    : "text-slate-800 dark:text-slate-100 group-hover:text-slate-900 dark:group-hover:text-white",
                                            )}
                                        >
                                            {habit.title}
                                        </span>
                                        {(habit.targets || habit.duration) && (
                                            <div className="flex gap-2 mt-2 flex-wrap items-center">
                                                {habit.targets &&
                                                    habit.targets.length > 0 &&
                                                    habit.targets.map((target, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-xs px-2 py-1 rounded-full bg-green-500/10 dark:bg-green-500/15 text-green-700 dark:text-green-300 border border-green-500/30"
                                                        >
                                                            {target}
                                                        </span>
                                                    ))}
                                                {habit.duration && (
                                                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                                                        {habit.duration}m
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 md:gap-3 relative z-10">
                                    <div className="text-xs md:text-sm px-2 md:px-3 py-1 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 group-hover:bg-slate-300 dark:group-hover:bg-slate-800 transition-all duration-300">
                                        <span className="text-slate-700 dark:text-slate-300 font-semibold">{habit.streak} hari</span>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteHabit(habit.id)
                                        }}
                                        className="p-2 text-slate-500 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/10 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {hasPendingChanges && (
                <div className="fixed bottom-0 left-0 right-0 flex gap-3 z-40 p-4 md:p-8 bg-gradient-to-t from-white dark:from-slate-950 to-transparent md:relative md:bg-none md:from-transparent md:py-6">
                    <button
                        onClick={cancelChanges}
                        className="flex-1 py-3 rounded-xl bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                    >
                        <X size={16} /> Batalkan
                    </button>
                    <button
                        onClick={saveChanges}
                        className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-500/30"
                    >
                        <Save size={16} /> Simpan Perubahan
                    </button>
                </div>
            )}

            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 md:p-0">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto border border-green-500/20 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tambah Habit Baru</h3>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all duration-300"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Habit title input */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    Nama Habit
                                </label>
                                <input
                                    type="text"
                                    value={newHabitTitle}
                                    onChange={(e) => setNewHabitTitle(e.target.value)}
                                    placeholder="Contoh: Meditasi Pagi"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                                />
                            </div>

                            {/* Days input */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    Target Hari (opsional)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="365"
                                    value={newDays}
                                    onChange={(e) => setNewDays(Number.parseInt(e.target.value) || 1)}
                                    placeholder="Contoh: 30"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Target berapa hari untuk habit ini</p>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    Durasi (menit)
                                </label>
                                <input
                                    type="number"
                                    min="5"
                                    max="480"
                                    value={newDuration}
                                    onChange={(e) => setNewDuration(Number.parseInt(e.target.value) || 30)}
                                    placeholder="Contoh: 30"
                                    className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Berapa menit durasi habit ini</p>
                            </div>

                            {/* Targets section */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                                    Target (Opsional)
                                </label>
                                <div className="space-y-2">
                                    {newTargets.map((target, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={target}
                                                onChange={(e) => updateTarget(index, e.target.value)}
                                                placeholder={`Target ${index + 1}`}
                                                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                                            />
                                            {newTargets.length > 1 && (
                                                <button
                                                    onClick={() => removeTarget(index)}
                                                    className="p-2 hover:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg transition-all duration-300"
                                                >
                                                    <X size={18} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button
                                    onClick={addTargetField}
                                    className="mt-2 text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-all duration-300"
                                >
                                    + Tambah Target
                                </button>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-all duration-300"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={addHabit}
                                    disabled={!newHabitTitle.trim()}
                                    className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-400 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    Tambah
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
