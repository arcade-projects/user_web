"use client";

import Link from "next/link";

const HotPotatoPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-indigo-900 p-6 text-white font-sans selection:bg-pink-500">
        <div className="text-center mb-12 animate-bounce">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-wider bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
            ARCADE! 👾
            </h1>
            <p className="mt-4 text-sm md:text-base text-indigo-200 font-medium">
            یا یه بازی جدید بساز، یا بپر وسط بازی بقیه! 🏃💨
            </p>
        </div>

        <div className="flex w-full max-w-sm flex-col items-center gap-4 sm:max-w-md">
            
            <Link 
                href='/hotpotato/join'
                className="w-full transform rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 py-5 px-8 text-xl md:text-2xl font-black uppercase tracking-wide text-indigo-950 shadow-[0_8px_0_#1e40af] transition-all hover:-translate-y-1 hover:brightness-110 active:translate-y-1 active:shadow-[0_2px_0_#1e40af]"
                >
                💥 JOIN GAME 💥
            </Link>

            <Link 
                href='/hotpotato/create'
                className="w-3/4 transform rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 py-3 px-6 text-base md:text-lg font-bold uppercase tracking-wide text-white shadow-[0_6px_0_#9f1239] transition-all hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0.5 active:shadow-[0_2px_0_#9f1239] opacity-90 hover:opacity-100"
                >
                🛠️ Create Room
            </Link>

        </div>

        <span className="absolute bottom-4 text-xs text-indigo-400/60">
            هشدار: این بازی ممکن است باعث خنده‌های شدید شود. 🛑
        </span>
        </div>
    );
}

export default HotPotatoPage;