"use client";

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SocketService from '@/app/services/SocketService';

interface Payload {
  sender: string;
  text: string;
}

interface RoomInterface {
  id: string
  category_id: string
  pincode: string
  minutes: number
  status: string
  activate: boolean
  createdAt: string
  updatedAt: string
}

const HotPotatoPage = () => {

  const params = useParams();

  const [payload, setPayload] = useState<Payload>({ sender: '', text: '' });
  const [title, setTitle] = useState<string>('');
  const [message, setMessage] = useState<string>('33');
  const [categories, setCategories] = useState([]);
  const [room, setRoom] = useState<RoomInterface>({ id: '', category_id: '', pincode: '', minutes: 0, status: '', activate: true, createdAt: '', updatedAt: '' });
  const [players, setPlayers] = useState([]);
  const [player, setPlayer] = useState<string>('');
  const [subCategoryTitle, setSubCategoryTitle] = useState<string>('');
  const [action, setAction] = useState<boolean>(true);
  
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {

    const socket = new SocketService();
    const connect = socket.connect();

    connect.emit('start', params?.id as string);
    connect.emit('timer');

    connect.on('start', (response: { subCategoryTitle: string, nextPlayerName: string, players: [], minutes: number }) => {
      setSubCategoryTitle(response.subCategoryTitle);
      setPlayer(response.nextPlayerName);
      setPlayers(response.players);
      setTimer(response.minutes * 60);
    });

    socket.on('timerUpdate', (timeLeft: number) => {
      setTimer(timeLeft);
      console.log(timeLeft);
    });

    socket.on('timerFinished', (message: string) => {
      console.log(message);
    });

    socket.on('updateTurn', (data: { nextPlayerName: string, nextPlayerId: string, subCategoryTitle: string}) => {
      setPlayer(data.nextPlayerName);
      setSubCategoryTitle(data.subCategoryTitle);

      if (data.nextPlayerId !== localStorage.getItem('player_id')) {
        setAction(false);
      } else {
        setAction(true);
      }
    })

    return () => {
      socket.off('timerUpdate');
      socket.off('timerFinished');
      socket.disconnect();
    }
  }, []);

  const onClickHandler = () => {
    const socket = new SocketService();
    const connect = socket.connect();

    connect.emit('playerTurn', (response: any) => {


    });

  }

  return (
    <div className={theme.canvas}>
      {/* نورهای محیطی نئونی پس‌زمینه */}
      <div className={theme.ambientLights.topRed} />
      <div className={theme.ambientLights.bottomCyan} />
      
      {/* کانتینر اصلی آرکید (استفاده از ساختار کارد تم) */}
      <div className={`${theme.card.wrapper} w-full max-w-md bg-slate-900/80 border-slate-800/80 shadow-2xl relative`}>
        
        {/* هدر یا عنوان اصلی اتاق */}
        {title && (
          <div className="text-center mb-6">
            <span className={`${theme.card.badge} bg-cyan-950 text-cyan-400 block w-max mx-auto mb-2 animate-pulse`}>
              Live Arena
            </span>
            <h2 className={`${theme.card.enTitle} truncate`}>
              {title}
            </h2>
            <div className={theme.header.divider} />
          </div>
        )}

        {players && players.map((player, index) => (
          <h1 key={index} className="text-center text-sm text-slate-300 font-bold mb-1">{player}</h1>
        ))}

        {/* بخش تایمر (هماهنگ با رنگ‌های نارنجی/قرمز تم جدید) */}
        <div className="flex flex-col items-center justify-center mb-8 relative">
          <div className="w-32 h-32 rounded-full border-2 border-orange-500/40 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.15),inset_0_0_15px_rgba(249,115,22,0.05)] bg-slate-950">
            <span className="text-[10px] uppercase tracking-wider text-orange-400 font-bold mb-1">
              Timer
            </span>
            <span className="text-3xl font-black text-slate-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
              {timer ?? '--:--'}
            </span>
          </div>
        </div>

        {/* بخش اطلاعات بازی (نوبت، نام و کلمه) */}
        <div className="space-y-4 mb-8">
          
          {/* نوبت */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              نوبت:
            </span>
            <span className="text-sm font-extrabold text-slate-200 tracking-wide">
              {player}
            </span>
          </div>

          {/* نام شما */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              نام شما:
            </span>
            <span className="text-sm font-extrabold text-slate-200 tracking-wide">
              {localStorage.getItem('player_name')}
            </span>
          </div>

          {/* کلمه با استایل گرادیان هدر تم */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <span className="text-xs font-bold text-orange-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              کلمه:
            </span>
            <span className="text-sm font-black bg-gradient-to-r from-red-500/10 to-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20 text-orange-400">
              {subCategoryTitle}
            </span>
          </div>
        </div>

        {/* دکمه اکشن (تغییر یافته به استایل دارک/نئونی هماهنگ با تم جدید) */}
        <button
          onClick={onClickHandler}
          disabled={!action}
          className="
            w-full py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-extrabold uppercase tracking-wider rounded-xl border border-slate-600/50 active:scale-[0.99] transition-all duration-150 shadow-md text-center text-sm cursor-pointer
            disabled:from-slate-900 disabled:to-slate-900 disabled:border-slate-800/40 
            disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          Click me
        </button>

        {/* متن پی‌لود در پایین صفحه */}
        {payload?.text && (
          <div className="mt-6 p-3 bg-slate-950/40 rounded-lg border border-slate-800/40 text-center text-xs text-slate-500 font-sans">
            {payload.text}
          </div>
        )}

      </div>
    </div>
  );
}

export default HotPotatoPage;