export const ArcadeNeonTheme = {
  canvas: "flex flex-col items-center min-h-screen bg-slate-950 text-slate-100 p-6 font-sans select-none overflow-x-hidden relative",
  
  ambientLights: {
    topRed: "absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-red-900/10 rounded-full blur-[120px] pointer-events-none",
    bottomCyan: "absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none",
  },
  
  header: {
    title: "text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 drop-shadow-md",
    divider: "w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto my-4 rounded-full",
    subtitle: "text-sm text-slate-400 font-medium leading-relaxed px-4 text-center"
  },
  
  card: {
    wrapper: "group h-full flex flex-col justify-between p-6 bg-slate-900/40 backdrop-blur-md border rounded-2xl transition-all duration-300",
    icon: "text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-300",
    badge: "text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md",
    enTitle: "text-xl font-extrabold tracking-wide text-slate-200 group-hover:text-white transition-colors",
    faTitle: "text-xs text-orange-400/80 font-bold mt-0.5",
    description: "text-xs text-slate-400 leading-relaxed font-normal mb-6",
    footer: "w-full pt-4 border-t border-slate-800/60 flex items-center justify-between",
    actionText: "text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors",
    arrow: "text-sm transition-transform duration-300 group-hover:translate-x-1"
  },

  colors: [
    "bg-red-500/10 border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:border-red-500/60",
    "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:border-cyan-500/60",
    "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:border-emerald-500/60",
    "bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.1)] hover:border-fuchsia-500/60",
    "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.1)] hover:border-amber-500/60",
    "bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)] hover:border-indigo-500/60",
    "bg-violet-500/10 border-violet-500/30 text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:border-violet-500/60",
    "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.1)] hover:border-rose-500/60",
  ],
  
  form: {
    wrapper: "w-full max-w-md p-8 bg-slate-900/30 backdrop-blur-lg border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col gap-5 relative z-10",
    label: "text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 block",
    input: "w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/10 transition-all duration-300 text-sm tracking-wide",
    submitBtn: "w-full py-3 px-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black uppercase tracking-wider text-xs rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.4)] active:scale-[0.98] transition-all duration-200 cursor-pointer"
  }
};