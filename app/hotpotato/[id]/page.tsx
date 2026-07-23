"use client";

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import SocketService from "@/app/services/SocketService";
import { SoundService } from "@/app/services/AudioService";

interface Payload {
  sender: string;
  text: string;
}

const HotPotatoPage = () => {
  const params = useParams();

  const [payload, setPayload] = useState<Payload>({ sender: "", text: "" });
  const [title, setTitle] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [player, setPlayer] = useState<string>("");
  const [playerName, setPlayerName] = useState<string>("");
  const [subCategoryTitle, setSubCategoryTitle] = useState<string>("");
  const [action, setAction] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [trigger, setTrigger] = useState(0);
  const [timerDisplay, setTimerDisplay] = useState<string>("--:--");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const totalTimeRef = useRef<number>(0);
  const playerIdRef = useRef<string>("");
  const socketRef = useRef<SocketService | null>(null);

  useEffect(() => {
    setIsMounted(true);
    const storedName = localStorage.getItem("player_name") || "";
    const storedId = localStorage.getItem("player_id") || "";

    setPlayerName(storedName);
    playerIdRef.current = storedId;

    const socketService = new SocketService();
    socketRef.current = socketService;
    const socket = socketService.connect();

    const roomId = params?.id as string;

    socket.emit("start", roomId);
    socket.emit("timer", roomId);

    socket.on(
      "start",
      (response: {
        subCategoryTitle: string;
        nextPlayerName: string;
        nextPlayerId: string;
        players: string[];
        formattedTime: string;
        totalTimeSeconds: number;
      }) => {
        setSubCategoryTitle(response.subCategoryTitle);
        setPlayer(response.nextPlayerName);
        setPlayers(response.players || []);
        if (response.formattedTime) {
          setTimerDisplay(response.formattedTime);
        }

        if (response.totalTimeSeconds) {
          totalTimeRef.current = response.totalTimeSeconds;
        }

        setAction(response.nextPlayerId === playerIdRef.current);
      }
    );

    socket.on(
      "timerUpdate",
      (response: {
        formattedTime: string;
        timeLeftSeconds: number;
        totalTimeSeconds: number;
      }) => {
        setTimerDisplay(response.formattedTime);

        if (response.totalTimeSeconds) {
          totalTimeRef.current = response.totalTimeSeconds;
        }

        // 🎵 پخش ضربان صدا متناسب با زمان باقی‌مانده
        if (totalTimeRef.current > 0 && typeof response.timeLeftSeconds === "number") {
          SoundService.playTick(response.timeLeftSeconds, totalTimeRef.current);
        }
      }
    );

    socket.on("finish", (response: { end: boolean }) => {
      setIsFinished(response.end);
      SoundService.stop();
    });

    socket.on(
      "updateTurn",
      (response: {
        nextPlayerName: string;
        nextPlayerId: string;
        subCategoryTitle: string;
      }) => {
        setPlayer(response.nextPlayerName);
        setSubCategoryTitle(response.subCategoryTitle);
        setAction(response.nextPlayerId === playerIdRef.current);
      }
    );

    return () => {
      socket.off("start");
      socket.off("timerUpdate");
      socket.off("finish");
      socket.off("updateTurn");
      socketService.disconnect();
      SoundService.stop();
    };
  }, [trigger, params?.id]);

  const onClickHandler = () => {
    SoundService.init();
    if (!socketRef.current) return;
    const socket = socketRef.current.connect();
    socket.emit("playerTurn", params?.id as string);
  };

  const startHandler = () => {
    SoundService.init();
    setTrigger((prev) => prev + 1);
    setIsFinished(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={theme.canvas} onClick={() => SoundService.init()}>
      <div className={theme.ambientLights.topRed} />

      <div
        className={`${theme.card.wrapper} w-full max-w-md bg-slate-900/60 border-slate-800/80 shadow-2xl relative z-10`}
      >
        {title && (
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 block w-max mx-auto mb-2 animate-pulse border border-cyan-800/30">
              Live Arena
            </span>
            <h2 className={`${theme.card.enTitle} truncate text-2xl`}>
              {title}
            </h2>
            <div className={theme.header.divider} />
          </div>
        )}

        <div className="flex flex-col items-center justify-center mb-8 relative">
          <div className="w-32 h-32 rounded-full border-2 border-orange-500/50 flex flex-col items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.2),inset_0_0_15px_rgba(249,115,22,0.1)] bg-slate-950 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 to-transparent pointer-events-none" />
            <span className="text-[10px] uppercase tracking-wider text-orange-400 font-black mb-1 drop-shadow-[0_0_4px_rgba(249,115,22,0.4)]">
              Timer
            </span>
            <span className="text-3xl font-black text-slate-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              {timerDisplay}
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] hover:border-cyan-500/30 transition-colors duration-300">
            <span className="text-xs font-bold text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              نوبت:
            </span>
            <span className="text-sm font-extrabold text-slate-200 tracking-wide">
              {player || "در حال دریافت..."}
            </span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] hover:border-slate-700 transition-colors duration-300">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              نام شما:
            </span>
            <span className="text-sm font-extrabold text-slate-300 tracking-wide">
              {playerName || "در حال دریافت..."}
            </span>
          </div>

          {action && subCategoryTitle && (
            <div className="flex items-center justify-center p-3 rounded-xl bg-slate-950/80 border border-orange-500/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] animate-fade-in">
              <span className="text-xs font-black bg-gradient-to-r from-orange-500/20 to-red-500/20 px-4 py-2 rounded-lg border border-orange-500/30 text-orange-400 uppercase tracking-widest shadow-[0_0_10px_rgba(249,115,22,0.1)]">
                {subCategoryTitle}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={onClickHandler}
          disabled={!action}
          className="
            w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-black uppercase tracking-widest rounded-xl 
            border border-orange-500/30 active:scale-[0.98] transition-all duration-200 
            shadow-[0_4px_20px_rgba(239,68,68,0.2)] hover:shadow-[0_4px_25px_rgba(249,115,22,0.4)]
            hover:from-red-500 hover:to-orange-500 text-center text-sm cursor-pointer
            disabled:from-slate-900 disabled:to-slate-900 disabled:border-slate-800/40 
            disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-30
          "
        >
          Click me
        </button>

        {payload?.text && (
          <div className="mt-6 p-3 bg-slate-950/50 rounded-lg border border-slate-800/60 text-center text-xs text-slate-400 font-sans backdrop-blur-sm">
            {payload.text}
          </div>
        )}
      </div>

      {players && players.length > 0 && (
        <div className="w-full max-w-md mt-8 relative z-10">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              بازیکنان حاضر
            </span>
            <span className="text-[10px] font-bold bg-slate-900 text-slate-400 px-2 py-0.5 rounded-full border border-slate-800">
              {players.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 p-3 bg-slate-900/20 border border-slate-900/60 rounded-xl backdrop-blur-sm">
            {players.map((p, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                  p === player
                    ? "bg-cyan-950/40 border-cyan-500/40 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                    : "bg-slate-950/40 border-slate-800/80 text-slate-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    p === player ? "bg-cyan-400 animate-pulse" : "bg-slate-600"
                  }`}
                />
                {p}
              </div>
            ))}
          </div>
        </div>
      )}

      {isFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-sm bg-slate-950 border-2 border-red-500/40 rounded-2xl p-6 text-center shadow-[0_0_50px_rgba(239,68,68,0.25)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent pointer-events-none" />

            <div className="text-5xl mb-4 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-bounce">
              🎮
            </div>

            <h3 className="text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-amber-500 uppercase mb-2">
              Game Over
            </h3>

            <p className="text-sm text-slate-400 mb-6 font-medium">
              بازی به پایان رسید! خسته نباشید رفقا.
            </p>

            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6 rounded-full" />

            <button
              onClick={startHandler}
              className="w-full py-3 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-red-400 hover:text-red-300 font-extrabold text-sm uppercase tracking-widest rounded-xl border border-red-500/30 shadow-md active:scale-[0.98] transition-all duration-150 cursor-pointer"
            >
              شروع مجدد رقابت
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotPotatoPage;