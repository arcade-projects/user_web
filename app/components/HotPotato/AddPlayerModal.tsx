"use client";

import React from "react";

interface AddPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AddPlayerModal({
  isOpen,
  onClose,
  playerName,
  setPlayerName,
  onSubmit,
}: AddPlayerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full max-w-sm shadow-2xl">
        <h3 className="text-lg font-bold text-slate-200 mb-4 flex justify-between items-center">
          <span>افزودن بازیکن جدید</span>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-300 text-xl">✕</button>
        </h3>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="نام بازیکن را وارد کنید..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength={12}
            autoFocus
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 text-slate-200"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-emerald-600/20"
          >
            تایید و ثبت
          </button>
        </form>
      </div>
    </div>
  );
}