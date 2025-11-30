"use client"

import { useState } from "react"
import { Activity, Clock, CalendarDays, Zap, Heart, X, Plus } from "lucide-react"

export default function Home() {
  const [showAddTarget, setShowAddTarget] = useState(false)
  const [newTarget, setNewTarget] = useState("")
  const [targets, setTargets] = useState<string[]>(["Lari Pagi (30m)", "Review Code Backend", "Membaca Buku"])

  const stats = [
    {
      label: "Habits Selesai",
      value: "8/10",
      sub: "+2 dari kemarin",
      icon: Activity,
      gradient: "from-emerald-500/15 dark:from-emerald-500/25 to-teal-500/5 dark:to-teal-500/10",
      border: "border-green-500/30 dark:border-green-500/30",
      iconColor: "text-green-600 dark:text-green-400",
      glow: "hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.2)]",
    },
    {
      label: "Total Fokus",
      value: "4h 20m",
      sub: "Target tercapai!",
      icon: Clock,
      gradient: "from-green-500/15 dark:from-green-500/25 to-emerald-500/5 dark:to-emerald-500/10",
      border: "border-green-500/30 dark:border-green-500/30",
      iconColor: "text-green-600 dark:text-green-400",
      glow: "hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.2)]",
    },
    {
      label: "Mood Rata-rata",
      value: "😊",
      sub: "Stabil & Bahagia",
      icon: Heart,
      gradient: "from-emerald-500/15 dark:from-emerald-500/25 to-green-500/5 dark:to-green-500/10",
      border: "border-green-500/30 dark:border-green-500/30",
      iconColor: "text-green-600 dark:text-green-400",
      glow: "hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)] dark:hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.2)]",
    },
  ]

  const handleAddTarget = () => {
    if (newTarget.trim()) {
      setTargets([...targets, newTarget])
      setNewTarget("")
      setShowAddTarget(false)
    }
  }

  const removeTarget = (index: number) => {
    setTargets(targets.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-10 pb-10">
      {/* --- Header --- */}
      <div className="relative">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3 text-balance dark:text-white">
          Selamat Pagi, <span className="gradient-text">Asus</span> 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl leading-relaxed">
          Progress kamu hari ini luar biasa. Mari pertahankan momentumnya dan raih target wellness kamu!
        </p>
      </div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`group relative p-6 md:p-8 rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.gradient} dark:bg-slate-900/40 dark:backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/50 dark:hover:bg-slate-900/60 ${stat.glow}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6 md:mb-8">
                <div
                  className={`p-3 rounded-2xl bg-white/60 dark:bg-slate-950/60 border border-green-500/20 dark:border-white/10 ${stat.iconColor} shadow-md group-hover:scale-110 transition-transform duration-400`}
                >
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-950/50 dark:bg-slate-950/50 text-slate-700 dark:text-slate-400 border border-green-500/20 dark:border-white/10 uppercase tracking-wider">
                  {stat.sub}
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                {stat.value}
              </h3>
              <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Chart Area - Statistics */}
        <div className="lg:col-span-2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600/10 dark:from-green-600/20 to-emerald-600/10 dark:to-emerald-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border border-green-500/20 h-80 md:h-96 flex flex-col items-center justify-center text-center overflow-hidden hover-glow">
            <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500/15 dark:from-green-500/20 to-emerald-500/10 dark:to-emerald-500/10 rounded-full flex items-center justify-center mb-6 shadow-md shadow-green-500/15 dark:shadow-green-500/20 border border-green-500/30 dark:border-green-500/30">
                <CalendarDays size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-slate-800 dark:text-slate-200 font-bold text-xl md:text-2xl">Statistik Mingguan</h3>
              <p className="text-slate-600 dark:text-slate-500 max-w-sm text-sm md:text-base">
                Grafik aktivitas akan muncul di sini setelah kamu menyelesaikan lebih banyak habits minggu ini.
              </p>
              <div className="pt-4 flex gap-2 flex-wrap justify-center">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-semibold">
                  Senin: 7/10
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-semibold">
                  Selasa: 8/10
                </span>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-semibold">
                  Rabu: 6/10
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Priorities List */}
        <div className="relative group h-full">
          <div className="absolute -inset-1 bg-gradient-to-b from-green-600/10 dark:from-green-600/20 to-slate-950/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative p-4 md:p-6 rounded-2xl bg-gradient-to-br from-white/80 dark:from-slate-900 to-slate-100/50 dark:to-slate-950 border border-green-500/20 h-full flex flex-col hover-glow">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-lg">Prioritas Hari Ini</h3>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Target fokus kamu</p>
              </div>
            </div>

            <div className="space-y-3 flex-1 max-h-64 overflow-y-auto">
              {targets.map((item, idx) => (
                <div
                  key={idx}
                  className="group/item flex items-center justify-between p-3 md:p-4 rounded-xl bg-gradient-to-r from-slate-100/50 dark:from-slate-800/50 to-slate-50/50 dark:to-slate-900/50 border border-slate-300/50 dark:border-slate-700/50 hover:from-slate-200/70 dark:hover:from-slate-800/80 hover:to-slate-100/70 dark:hover:to-slate-900/80 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all cursor-pointer duration-400 hover-lift"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 shadow-md shadow-green-500/50" />
                    <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 font-medium group-hover/item:text-slate-900 dark:group-hover/item:text-white transition-colors truncate">
                      {item}
                    </span>
                  </div>
                  <button
                    onClick={() => removeTarget(idx)}
                    className="ml-2 p-1 hover:bg-red-500/20 text-red-500 dark:text-red-400 rounded opacity-0 group-hover/item:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAddTarget(true)}
              className="w-full py-3 md:py-4 mt-4 md:mt-6 text-xs md:text-sm font-semibold text-green-600 dark:text-green-400 border border-dashed border-green-500/50 dark:border-green-500/50 rounded-xl hover:text-green-700 dark:hover:text-green-300 hover:border-green-500 dark:hover:border-green-500 hover:bg-green-500/5 dark:hover:bg-green-500/5 transition-all duration-400 group/add flex items-center justify-center gap-2"
            >
              <Zap size={16} className="group-hover/add:scale-110 transition-transform duration-400" />
              Tambah Target Baru
            </button>
          </div>
        </div>
      </div>

      {/* Modal Tambah Target */}
      {showAddTarget && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4 md:p-0">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 w-full max-w-md border border-green-500/20 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Tambah Target Baru</h3>
              <button
                onClick={() => setShowAddTarget(false)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Target Baru
                </label>
                <input
                  type="text"
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  placeholder="Contoh: Jogging 5km"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  onKeyPress={(e) => e.key === "Enter" && handleAddTarget()}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddTarget(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-all duration-300"
                >
                  Batal
                </button>
                <button
                  onClick={handleAddTarget}
                  disabled={!newTarget.trim()}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:from-green-400 hover:to-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Tambah
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
