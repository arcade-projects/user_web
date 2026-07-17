"use client";

import React, { useState } from "react";

interface Card {
  id: number;
  suit: "♠" | "♥" | "♦" | "♣";
  value: string;
  color: "text-rose-600" | "text-slate-900";
}

export default function SevenEvilGame() {
  const [playerCards, setPlayerCards] = useState<Card[]>([
    { id: 1, suit: "♠", value: "A", color: "text-slate-900" },
    { id: 2, suit: "♥", value: "7", color: "text-rose-600" },
    { id: 3, suit: "♣", value: "10", color: "text-slate-900" },
    { id: 4, suit: "♦", value: "K", color: "text-rose-600" },
    { id: 5, suit: "♥", value: "J", color: "text-rose-600" },
    { id: 6, suit: "♠", value: "8", color: "text-slate-900" },
  ]);

  const [discardPile, setDiscardPile] = useState<Card>({
    id: 0,
    suit: "♣",
    value: "7",
    color: "text-slate-900",
  });

  const [isLastCardDeclared, setIsLastCardDeclared] = useState(false);

  const handleCardClick = (id: number) => {
    const clickedCard = playerCards.find((c) => c.id === id);
    if (clickedCard) {
      setDiscardPile(clickedCard);
      setPlayerCards(playerCards.filter((c) => c.id !== id));
    }
  };

  const handleDrawCard = () => {
    const suits: Card["suit"][] = ["♠", "♥", "♦", "♣"];
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    const isRed = randomSuit === "♥" || randomSuit === "♦";

    const newCard: Card = {
      id: Date.now(),
      suit: randomSuit,
      value: randomValue,
      color: isRed ? "text-rose-600" : "text-slate-900",
    };
    setPlayerCards([...playerCards, newCard]);
  };

  return (
    <div className="relative flex h-screen w-full max-w-md flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-800 via-green-900 to-slate-950 p-5 font-sans text-white shadow-2xl mx-auto border-x border-emerald-800/30 select-none">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

      <div className="flex items-center justify-between px-1 z-10">
        <div className="flex items-center gap-2.5 rounded-full bg-emerald-950/40 px-3 py-1.5 backdrop-blur-md border border-emerald-500/20 shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
          </span>
          <span className="text-xs font-medium tracking-wide text-emerald-200">نوبت شما</span>
        </div>
        <div className="rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium tracking-wider backdrop-blur-md text-emerald-300">
          کارت‌های حریف: <span className="text-white font-bold">۴</span>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center gap-8 z-10">
        <button
          onClick={handleDrawCard}
          className="group relative h-40 w-26 rounded-2xl border border-white/20 bg-gradient-to-br from-red-600 via-red-700 to-red-950 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 active:scale-95 active:translate-y-0"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          <div className="h-full w-full rounded-[10px] border border-white/10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-500 via-red-800 to-red-950 flex flex-col items-center justify-center shadow-inner pattern-grid">
            <span className="text-3xl font-bold opacity-10 tracking-widest">♣ ♦</span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-20 mt-1">بـازار</span>
          </div>
        </button>

        <div className="relative h-40 w-26 rounded-2xl bg-gradient-to-b from-white to-slate-100 p-3.5 text-slate-900 shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/80 transition-all duration-500 transform rotate-3 hover:rotate-0">
          <div className={`flex flex-col h-full justify-between ${discardPile.color}`}>
            <div className="flex flex-col items-start leading-none">
              <span className="text-2xl font-black tracking-tighter">{discardPile.value}</span>
              <span className="text-xl mt-0.5">{discardPile.suit}</span>
            </div>
            <div className="text-center text-5xl filter drop-shadow-sm transform scale-110">{discardPile.suit}</div>
            <div className="flex flex-col items-end leading-none rotate-180">
              <span className="text-2xl font-black tracking-tighter">{discardPile.value}</span>
              <span className="text-xl mt-0.5">{discardPile.suit}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-[-20px] top-1/4 bottom-1/4 flex w-32 flex-col justify-center pl-4 z-20">
        <div className="relative h-full w-full">
          {playerCards.map((card, index) => {
            const rotation = -8 + index * 3;
            const translateX = Math.abs(index - playerCards.length / 2) * 1.5;
            
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                style={{
                  top: `${index * 38}px`,
                  zIndex: 20 + index,
                  transform: `rotate(${rotation}deg) translateX(${translateX}px)`,
                }}
                className="absolute left-0 h-36 w-26 cursor-pointer rounded-2xl bg-gradient-to-r from-white via-slate-50 to-slate-100 p-3 text-slate-900 shadow-[-5px_10px_30px_rgba(0,0,0,0.3)] border-y border-r border-slate-200/80 transition-all duration-300 ease-out origin-left hover:left-4 hover:translate-x-1 active:scale-95"
              >
                <div className={`flex flex-col h-full justify-between items-start ${card.color} leading-none`}>
                  <div className="flex flex-col items-center bg-slate-50/60 rounded-lg p-1 min-w-[28px] shadow-sm border border-slate-100">
                    <span className="text-xl font-black tracking-tighter">{card.value}</span>
                    <span className="text-lg mt-0.5">{card.suit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 pb-2 z-10">
        <button
          onClick={() => setIsLastCardDeclared(!isLastCardDeclared)}
          className={`relative w-full overflow-hidden rounded-2xl py-4 text-center font-extrabold tracking-wider transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] active:scale-98 ${
            isLastCardDeclared
              ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-amber-500/30 font-black border border-amber-300"
              : "bg-white/10 text-white backdrop-blur-xl border border-white/10 hover:bg-white/15 hover:border-white/20"
          }`}
        >
          {isLastCardDeclared && (
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isLastCardDeclared ? "تک کارت اعلام شد !" : "اعلام تک کارت"}
          </span>
        </button>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>

    </div>
  );
}