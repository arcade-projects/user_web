"use client";

import { useTimer } from "@/app/hooks/HotPotato/useTimer";
import React, { useState } from "react";

interface StressTimerProps {
  duration: number;
}

export default function StressTimer({ duration }: StressTimerProps) {
  const [exploded, setExploded] = useState(false);

  const { timeLeft, isActive, startTimer, stopTimer } = useTimer(duration, () => {
    setExploded(true);
  });

  // محاسبات مربوط به وضعیت استرس برای تغییر استایل UI
  const isWarning = timeLeft <= duration / 2 && timeLeft > 10;
  const isCritical = timeLeft <= 10;

  // تعیین رنگ نئونی بمب بر اساس فاز استرس
  const getThemeColor = () => {
    if (exploded) return "border-red-700 text-red-700 shadow-[0_0_50px_rgba(239,68,68,0.8)]";
    if (isCritical) return "border-red-500 text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse";
    if (isWarning) return "border-amber-500 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]";
    return "border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
  };

  // ایجاد انیمیشن لرزش (Shake) برای افزایش استرس چشمی
  const getShakeClass = () => {
    if (!isActive) return "";
    if (isCritical) return "animate-[ping_0.4s_ease-in-out_infinite] scale-105";
    if (isWarning) return "animate-[bounce_0.8s_infinite]";
    return "";
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      
      {/* دایره اصلی بمب و تایمر */}
      <div className={`relative w-40 h-40 rounded-full bg-slate-900 border-4 flex flex-col items-center justify-center transition-all duration-300 ${getThemeColor()} ${getShakeClass()}`}>
        
        {/* افکت پس‌زمینه قرمز چشمک‌زن در حالت بحرانی */}
        {isCritical && !exploded && (
          <div className="absolute inset-0 bg-red-600/10 rounded-full animate-ping -z-10" />
        )}

        <span className="text-5xl mb-1">
          {exploded ? "💥" : "💣"}
        </span>

        <span className="text-xl font-mono font-bold tracking-widest">
          {exploded ? "BOOM!" : `${timeLeft}s`}
        </span>

        <span className="text-[10px] uppercase tracking-wider opacity-60 font-medium mt-1">
          {exploded ? "GAME OVER" : isCritical ? "RUN!!!" : isWarning ? "HURRY UP" : "SAFE"}
        </span>
      </div>

      {/* کنترلهای تست تایمر */}
      <div className="flex gap-3 w-full max-w-xs">
        {!isActive ? (
          <button
            onClick={() => {
              setExploded(false);
              startTimer();
            }}
            className="flex-1 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-red-600/30 active:scale-95"
          >
            🔥 فعال کردن بمب
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="flex-1 bg-slate-800 border border-slate-700 text-slate-300 font-bold py-3.5 px-6 rounded-xl text-sm transition-all hover:bg-slate-700 active:scale-95"
          >
            🛑 خنثی کردن (پاس)
          </button>
        )}
      </div>

    </div>
  );
}