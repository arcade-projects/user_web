"use client";

import React, { useState, useEffect } from "react";
import { useTimer } from "../../hooks/HotPotato/useTimer";
import AddPlayerModal from "../../components/HotPotato/AddPlayerModal";
import GameSettingsModal from "../../components/HotPotato/GameSettingsModal";

interface Player {
  id: string;
  name: string;
}

// دیتابیس تستی کلمات برای دسته‌بندی‌ها
const WORDS_DATABASE: Record<string, string[]> = {
  "عمومی": ["پیتزا", "تراکتور", "آتشفشان", "برج ایفل", "اقیانوس", "هلوکپتر", "شکلات"],
  "تکنولوژی": ["هوش مصنوعی", "بلاکچین", "سورس کد", "سرور", "میکروچیپ", "الگوریتم", "پایتون"],
  "سینما": ["آواتار", "بتمن", "کریستوفر نولان", "اسکار", "تایتانیک", "پدرخوانده", "انیمیشن"],
  "نوستالژی": ["آتاری", "توپ پلاستیکی", "کارتون فوتبالیست‌ها", "تلفن کارتی", "نوار کاست"],
};

// لیست رنگ‌های نئونی برای جفت‌های روبرو
const PAIR_COLORS = [
  "border-cyan-500 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]",
  "border-purple-500 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.3)]",
  "border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]",
  "border-pink-500 text-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.3)]",
  "border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]",
];

export default function GameRoom() {
  const [players, setPlayers] = useState<Player[]>([]);

  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [loser, setLoser] = useState<Player | null>(null);

  // استیت‌های مربوط به کلمه جاری
  const [currentWord, setCurrentWord] = useState<string>("");

  // مدیریت مودال‌ها و تنظیمات
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [gameTimer, setGameTimer] = useState(30); 
  const [selectedCategory, setSelectedCategory] = useState("عمومی");

  const { timeLeft, isActive, startTimer, stopTimer } = useTimer(gameTimer, () => {
    setLoser(players[activePlayerIndex]);
    setIsGameStarted(false);
  });

  // متد انتخاب کلمه تصادفی بر اساس دسته‌بندی
  const generateRandomWord = (category: string) => {
    const words = WORDS_DATABASE[category] || WORDS_DATABASE["عمومی"];
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  const handleStartGame = () => {
    setLoser(null);
    setActivePlayerIndex(0);
    setIsGameStarted(true);
    generateRandomWord(selectedCategory); // انتخاب اولین کلمه
    startTimer();
  };

  const handleNextTurn = () => {
    if (!isActive) return;
    // تغییر نوبت به نفر بعدی
    setActivePlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    // تغییر کلمه برای نفر بعدی
    generateRandomWord(selectedCategory);
  };

  const addPlayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayerName.trim()) return;
    setPlayers([...players, { id: Date.now().toString(), name: newPlayerName.trim() }]);
    setNewPlayerName("");
    setIsPlayerModalOpen(false);
  };

  // تابع تعیین رنگ بازیکن بر اساس جفت روبرو بودن
  const getPlayerPairColor = (index: number) => {
    const N = players.length;
    // پیدا کردن شناسه جفت (ایندکس کوچک‌تر بین دو نفر روبرو)
    const pairId = index < N / 2 ? index : index - N / 2;
    // بازگرداندن رنگ اختصاصی این جفت از آرایه رنگ‌ها
    return PAIR_COLORS[pairId % PAIR_COLORS.length];
  };

  const isEven = players.length % 2 === 0;
  const canStart = isEven && players.length >= 4;

  const isWarning = timeLeft <= gameTimer / 2 && timeLeft > 10;
  const isCritical = timeLeft <= 10;

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-slate-950 text-slate-100 p-6 font-sans select-none overflow-hidden relative">
      
      {/* هدر */}
      <header className="text-center my-2 z-10">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          HOT POTATO
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">
          Category: <span className="text-orange-400 font-bold">{selectedCategory}</span>
        </p>
      </header>

      {/* بخش مرکزی: دایره بازیکنان + باکس کلمه + بمب */}
      <main className="relative flex items-center justify-center w-full max-w-[480px] aspect-square my-2 z-10">
        
        {/* المان‌های مرکزی (باکس کلمه و بمب زیر هم) */}
        <div className="absolute flex flex-col items-center gap-4 z-20">
          
          {/* نمایش کلمه جاری بازی */}
          {isGameStarted && currentWord && (
            <div className="bg-slate-900/90 border border-orange-500/40 px-6 py-2.5 rounded-xl text-center shadow-[0_0_20px_rgba(249,115,22,0.15)] animate-fadeIn">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest block mb-0.5">کلمه شما</span>
              <span className="text-xl font-black text-orange-400 tracking-wide">{currentWord}</span>
            </div>
          )}

          {/* بمب و تایمر */}
          <div className={`w-32 h-32 rounded-full bg-slate-900 border-4 flex flex-col items-center justify-center transition-all duration-300 ${
            loser ? "border-red-800 shadow-[0_0_50px_rgba(239,68,68,0.8)]" :
            isCritical ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse" :
            isWarning ? "border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]" :
            isActive ? "border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-dashed border-slate-800"
          }`}>
            <span className={`text-4xl ${isCritical && isActive ? "animate-bounce" : ""}`}>
              {loser ? "💥" : "💣"}
            </span>
            <span className="text-lg font-mono font-bold mt-1">
              {loser ? "BOOM!" : isActive ? `${timeLeft}s` : "READY"}
            </span>
          </div>
        </div>

        {/* رندر دایره‌ای بازیکنان با رنگ‌بندی زوج‌های روبرو */}
        {players.map((player, index) => {
          const isCurrentTurn = isGameStarted && index === activePlayerIndex;
          
          const total = players.length;
          const angle = (index * 2 * Math.PI) / total;
          const radius = isCurrentTurn ? 38 : 43; 
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);

          // گرفتن رنگ جفت روبرو
          const pairColorClass = getPlayerPairColor(index);

          return (
            <div
              key={player.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-10"
              style={{ top: `${y}%`, left: `${x}%` }}
            >
              <div className="flex flex-col items-center gap-1">
                {/* آواتار بازیکن */}
                <div className={`rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  isCurrentTurn
                    ? "w-18 h-18 text-xl bg-red-950 border-4 border-red-500 text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.8)] scale-110 animate-pulse"
                    : `w-13 h-13 text-base bg-slate-900 border-2 ${pairColorClass}`
                }`}>
                  {player.name.charAt(0)}
                </div>
                
                {/* نام بازیکن */}
                <div className="flex flex-col items-center">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border transition-all ${
                    isCurrentTurn 
                      ? "bg-red-500 text-black border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]" 
                      : "bg-slate-900/80 text-slate-300 border-slate-800"
                  }`}>
                    {player.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* بخش فوتر و دکمه‌ها */}
      <footer className="w-full max-w-md flex flex-col gap-4 z-10">
        {isActive ? (
          <button
            onClick={handleNextTurn}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-extrabold py-5 rounded-2xl text-lg tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.4)] border border-emerald-400 active:scale-95 transition-all uppercase animate-pulse"
          >
            پاس دادن بمب (NEXT PLAYER) ➔
          </button>
        ) : (
          <button
            disabled={!canStart}
            onClick={handleStartGame}
            className={`w-full py-5 rounded-2xl font-extrabold text-base tracking-wide transition-all uppercase ${
              canStart
                ? "bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 text-white shadow-[0_4px_25px_rgba(239,68,68,0.5)] cursor-pointer active:scale-95"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800"
            }`}
          >
            {loser ? "🔄 بازی مجدد" : "شروع مسابقه (START GAME)"}
          </button>
        )}

        {!isActive && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setIsPlayerModalOpen(true)} className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 py-3 rounded-xl text-sm font-medium transition-colors">
              ➕ افزودن بازیکن
            </button>
            <button onClick={() => setIsSettingsModalOpen(true)} className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 py-3 rounded-xl text-sm font-medium transition-colors">
              ⚙ تنظیمات بازی
            </button>
          </div>
        )}
      </footer>

      {/* پاپ‌آپ باخت */}
      {loser && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="text-center max-w-sm flex flex-col items-center gap-4">
            <span className="text-8xl animate-bounce">💥</span>
            <h2 className="text-3xl font-black text-red-500 tracking-wider drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">بمب منفجر شد!</h2>
            <div className="bg-red-950/50 border-2 border-red-500 px-8 py-4 rounded-2xl text-2xl font-black text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.4)] my-2">
              💀 {loser.name} 💀
            </div>
            <button onClick={() => setLoser(null)} className="mt-6 bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-xl text-sm font-medium border border-slate-700 transition-colors">بستن و بازگشت</button>
          </div>
        </div>
      )}

      {/* مودال‌ها */}
      <AddPlayerModal isOpen={isPlayerModalOpen} onClose={() => setIsPlayerModalOpen(false)} playerName={newPlayerName} setPlayerName={setNewPlayerName} onSubmit={addPlayerSubmit} />
      <GameSettingsModal isOpen={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} timer={gameTimer} setTimer={setGameTimer} category={selectedCategory} setCategory={setSelectedCategory} />
    </div>
  );
}