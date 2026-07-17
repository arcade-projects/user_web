"use client";

import RequestService from "@/app/services/RequestService";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useParams } from "next/navigation";
import CountdownTimer from "@/app/components/CountDownTimer";
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

    connect.emit('messageToServer', params?.id as string, (response: any) => {

      setPlayers(response.players);

      connect.emit('startTimer', (response: string) => {
        console.log(response);
      });

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
    <div className="min-h-screen bg-[#0d0e15] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1c29] via-[#0d0e15] to-[#050508] text-white font-mono flex flex-col items-center justify-center p-4 selection:bg-cyan-500 selection:text-black">
      
      {/* کانتینر اصلی آرکید */}
      <div className="w-full max-w-md bg-[#121420]/90 border-2 border-magenta-500 rounded-2xl p-6 md:p-8 shadow-[0_0_30px_rgba(236,72,153,0.3)] backdrop-blur-md relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-1 before:bg-gradient-to-r before:from-cyan-500 before:via-magenta-500 before:to-yellow-500">
        
        {/* هدر یا عنوان اصلی اتاق */}
        {title && (
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block mb-1 animate-pulse">
              Live Arena
            </span>
            <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_2px_8px_rgba(34,211,238,0.4)] truncate">
              {title}
            </h2>
          </div>
        )}

        {players && players.map((player) => (
          <h1>{player}</h1>
        ))}

        {/* بخش تایمر (Neon Glow Circle) */}
        <div className="flex flex-col items-center justify-center mb-8 relative">
          <div className="w-32 h-32 rounded-full border-4 border-yellow-400 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.4),inset_0_0_15px_rgba(234,179,8,0.2)] bg-[#1a1d30]">
            <span className="text-xs uppercase tracking-wider text-yellow-500 font-semibold mb-1">
              Timer
            </span>
            <span className="text-3xl font-extrabold text-yellow-300 drop-shadow-[0_0_6px_rgba(234,179,8,0.6)]">
              {timer ?? '--:--'}
            </span>
          </div>
        </div>

        {/* بخش اطلاعات بازی (نوبت و کلمه) */}
        <div className="space-y-4 mb-8">
          {/* نوبت */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#181b2e] border border-cyan-500/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
            <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              نوبت:
            </span>
            <span className="text-base font-black text-white tracking-wide">
              {/* مقدار نوبت را اینجا بگذار */}
              {player}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-[#181b2e] border border-cyan-500/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
            <span className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              نام شما:
            </span>
            <span className="text-base font-black text-white tracking-wide">
              {localStorage.getItem('player_name')}
            </span>
          </div>

          {/* کلمه */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#181b2e] border border-magenta-500/30 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
            <span className="text-sm font-bold text-magenta-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-magenta-500" />
              کلمه:
            </span>
            <span className="text-base font-black text-white bg-magenta-950/40 px-3 py-1 rounded border border-magenta-500/20 text-magenta-300 drop-shadow-[0_0_4px_rgba(236,72,153,0.4)]">
              {/* مقدار کلمه را اینجا بگذار */}
              {subCategoryTitle}
            </span>
          </div>
        </div>

        {/* دکمه اکشن آرکید */}
        <button
          onClick={onClickHandler}
          disabled={!action}
          className="
            w-full py-4 bg-gradient-to-r from-magenta-600 to-pink-500 hover:from-magenta-500 hover:to-pink-400 text-white font-black uppercase tracking-wider rounded-xl border-b-4 border-magenta-800 active:border-b-0 active:translate-y-1 transition-all duration-75 shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] text-center text-lg cursor-pointer
            disabled:from-gray-700 disabled:to-gray-600 disabled:border-gray-800 
            disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-50 disabled:translate-y-0
          "
        >
          Click me
        </button>

        {/* متن پی‌لود در پایین صفحه */}
        {payload?.text && (
          <div className="mt-6 p-3 bg-black/40 rounded-lg border border-gray-800 text-center text-xs text-gray-400 font-sans">
            {payload.text}
          </div>
        )}

      </div>
    </div>
  );

}

export default HotPotatoPage;