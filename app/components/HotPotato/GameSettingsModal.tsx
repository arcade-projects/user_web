"use client";

import React from "react";

interface GameSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  timer: number;
  setTimer: (time: number) => void;
  category: string;
  setCategory: (category: string) => void;
}

export default function GameSettingsModal({
  isOpen,
  onClose,
  timer,
  setTimer,
  category,
  setCategory,
}: GameSettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl flex flex-col gap-5">
        <h3 className="text-lg font-bold text-slate-200 flex justify-between items-center">
          <span>تنظیمات مسابقه</span>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-xl">✕</button>
        </h3>

        {/* تنظیم زمان تایمر */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">زمان کل بازی (ثانیه): {timer}s</label>
          <input
            type="range"
            min="20"
            max="120"
            step="5"
            value={timer}
            onChange={(e) => setTimer(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <div className="flex justify-between text-[10px] text-slate-600 font-mono">
            <span>20s</span>
            <span>60s</span>
            <span>120s</span>
          </div>
        </div>

        {/* انتخاب دسته‌بندی کلمات */}
        <div className="flex flex-col gap-2">
          <label className="text-xs text-slate-400 uppercase tracking-wider">دسته‌بندی موضوعات</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-slate-300 cursor-pointer"
          >
            <option value="عمومی">🧠 اطلاعات عمومی</option>
            <option value="تکنولوژی">💻 دنیای تکنولوژی</option>
            <option value="سینما">🎬 فیلم و سینما</option>
            <option value="نوستالژی">📜 دهه شصت و نوستالژی</option>
          </select>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-red-600/20 mt-2"
        >
          ذخیره تنظیمات
        </button>
      </div>
    </div>
  );
}