"use client"

import { Activity, Clock, TrendingUp, CalendarDays, ArrowRight, MoreHorizontal, Zap } from "lucide-react"

export default function Home() {
  const stats = [
    {
      label: "Habits Selesai",
      value: "8/10",
      sub: "+2 dari kemarin",
      icon: Activity,
      gradient: "from-emerald-500/25 to-teal-500/5",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      glow: "hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.4)]",
    },
    {
      label: "Total Fokus",
      value: "4h 20m",
      sub: "Target tercapai!",
      icon: Clock,
      gradient: "from-cyan-500/25 to-blue-500/5",
      border: "border-cyan-500/30",
      iconColor: "text-cyan-400",
      glow: "hover:shadow-[0_0_50px_-10px_rgba(6,182,212,0.4)]",
    },
    {
      label: "Mood Rata-rata",
      value: "😊",
      sub: "Stabil & Bahagia",
      icon: TrendingUp,
      gradient: "from-emerald-500/25 to-cyan-500/5",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      glow: "hover:shadow-[0_0_50px_-10px_rgba(16,185,129,0.4)]",
    },
  ]

  const priorityItems = [
    { title: "Lari Pagi (30m)", color: "bg-orange-400", delay: "0s" },
    { title: "Review Code Backend", color: "bg-cyan-400", delay: "0.1s" },
    { title: "Membaca Buku 📚", color: "bg-emerald-400", delay: "0.2s" },
  ]

  return (
    <div className="space-y-10 pb-10 animate-float-up">
      {/* --- Header --- */}
      <div className="relative">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-3">
          Selamat Pagi, <span className="gradient-text">Asus</span> 👋
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
          Progress kamu hari ini luar biasa. Mari pertahankan momentumnya dan raih target wellness kamu! 💪
        </p>
      </div>

      {/* --- Stats Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 0.15}s` }}
            className={`group relative p-8 rounded-2xl border ${stat.border} bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:bg-slate-900/60 ${stat.glow} animate-float-up`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div
                  className={`p-3 rounded-2xl bg-slate-950/60 border border-white/10 ${stat.iconColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-950/50 text-slate-400 border border-white/10 uppercase tracking-wider">
                  {stat.sub}
                </span>
              </div>

              <h3 className="text-5xl font-bold text-white tracking-tight mb-2">{stat.value}</h3>
              <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart Area */}
        <div className="lg:col-span-2 relative group animate-float-up">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-emerald-600/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative p-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/20 h-96 flex flex-col items-center justify-center text-center overflow-hidden hover-glow">
            <div className="relative z-10 space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 border border-cyan-500/30">
                <CalendarDays size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-slate-200 font-bold text-2xl">Statistik Mingguan</h3>
              <p className="text-slate-500 max-w-sm text-base">
                Grafik aktivitas akan muncul di sini setelah kamu menyelesaikan lebih banyak habits minggu ini.
              </p>
            </div>
          </div>
        </div>

        {/* Priorities List */}
        <div className="relative group h-full animate-float-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-1 bg-gradient-to-b from-cyan-600/20 to-slate-950/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/20 h-full flex flex-col hover-glow">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-white font-bold text-lg">Prioritas Hari Ini</h3>
                <p className="text-xs text-slate-500 mt-1">Target fokus kamu</p>
              </div>
              <button className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-300 transition-all duration-300 hover:scale-110">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="space-y-3 flex-1">
              {priorityItems.map((item, idx) => (
                <div
                  key={idx}
                  style={{ animationDelay: item.delay }}
                  className="group/item flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:from-slate-800/80 hover:to-slate-900/80 hover:border-cyan-500/50 transition-all cursor-pointer duration-300 animate-float-up hover-lift"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-3 h-3 rounded-full ${item.color} shadow-lg shadow-current/50 group-hover/item:scale-150 transition-transform duration-300`}
                    />
                    <span className="text-sm text-slate-300 font-medium group-hover/item:text-white transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-slate-600 -translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 group-hover/item:text-cyan-400 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            <button className="w-full py-4 mt-6 text-sm font-semibold text-slate-400 border border-dashed border-slate-700 rounded-xl hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all duration-300 group/add flex items-center justify-center gap-2">
              <Zap size={16} className="group-hover/add:scale-110 transition-transform" />
              Tambah Target Baru
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
