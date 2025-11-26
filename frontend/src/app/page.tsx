"use client";

import { Activity, Clock, TrendingUp, CalendarDays, ArrowRight, MoreHorizontal } from "lucide-react";

export default function Home() {
  const stats = [
    {
      label: "Habits Selesai",
      value: "8/10",
      sub: "+2 dari kemarin",
      icon: Activity,
      // Warna spesifik untuk tiap kartu
      gradient: "from-emerald-500/20 to-teal-500/5", 
      border: "border-emerald-500/20",
      iconColor: "text-emerald-400",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]"
    },
    {
      label: "Total Fokus",
      value: "4j 20m",
      sub: "Target tercapai",
      icon: Clock,
      gradient: "from-blue-500/20 to-indigo-500/5",
      border: "border-blue-500/20",
      iconColor: "text-blue-400",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]"
    },
    {
      label: "Mood Rata-rata",
      value: "😊 Happy",
      sub: "Stabil",
      icon: TrendingUp,
      gradient: "from-purple-500/20 to-pink-500/5",
      border: "border-purple-500/20",
      iconColor: "text-purple-400",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]"
    },
  ];

  return (
    <div className="space-y-10 pt-6 pb-10">
      
      {/* --- Header dengan Gradient Text --- */}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
          Selamat Malam, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Asus</span> 👋
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl">
          Progress kamu hari ini luar biasa. Pertahankan momentumnya!
        </p>
      </div>

      {/* --- Stats Cards (Glow Effect) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`group relative p-6 rounded-3xl border ${stat.border} bg-zinc-900/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:-translate-y-1 ${stat.glow}`}
          >
            {/* Background Gradient Halus */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className={`p-3 rounded-2xl bg-zinc-950/50 border border-white/5 ${stat.iconColor} shadow-lg`}>
                        <stat.icon size={24} />
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-950/50 text-zinc-400 border border-white/5">
                        {stat.sub}
                    </span>
                </div>
                
                <h3 className="text-4xl font-bold text-white tracking-tight mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Area (Left - Wide) */}
        <div className="lg:col-span-2 relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-[2rem] blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative p-8 rounded-[1.8rem] bg-zinc-950 border border-white/5 h-80 flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Decorative Grid Background */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none"></div>
                
                <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-inner shadow-black/50 border border-zinc-800">
                    <CalendarDays size={32} className="text-zinc-600" />
                </div>
                <h3 className="text-zinc-300 font-semibold text-xl mb-2">Statistik Mingguan</h3>
                <p className="text-zinc-600 max-w-sm text-sm">
                    Grafik aktivitas akan muncul di sini setelah kamu menyelesaikan lebih banyak habits minggu ini.
                </p>
            </div>
        </div>

        {/* Priorities List (Right - Narrow) */}
        <div className="relative group h-full">
            <div className="absolute -inset-0.5 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[2rem] blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative p-6 rounded-[1.8rem] bg-zinc-950 border border-white/5 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-semibold text-lg">Prioritas Besok</h3>
                    <button className="p-2 hover:bg-zinc-900 rounded-lg text-zinc-500 transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
                
                <div className="space-y-3 flex-1">
                    {[
                    { title: "Lari Pagi (30m)", color: "bg-orange-500", glow: "shadow-orange-500/50" },
                    { title: "Review Code Backend", color: "bg-blue-500", glow: "shadow-blue-500/50" },
                    { title: "Membaca Buku", color: "bg-pink-500", glow: "shadow-pink-500/50" }
                    ].map((item, idx) => (
                    <div key={idx} className="group/item flex items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/80 hover:border-zinc-700 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${item.color} ${item.glow} shadow-[0_0_10px]`}></div>
                            <span className="text-sm text-zinc-300 font-medium group-hover/item:text-white">{item.title}</span>
                        </div>
                        <ArrowRight size={14} className="text-zinc-600 -translate-x-2 opacity-0 group-hover/item:translate-x-0 group-hover/item:opacity-100 transition-all" />
                    </div>
                    ))}
                </div>

                <button className="w-full py-4 mt-6 text-sm font-medium text-zinc-400 border border-dashed border-zinc-800 rounded-2xl hover:text-white hover:border-zinc-600 hover:bg-zinc-900/50 transition-all">
                    + Tambah Target Baru
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}