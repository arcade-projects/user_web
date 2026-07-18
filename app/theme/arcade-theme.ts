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
  }
};