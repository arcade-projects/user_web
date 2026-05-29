"use client";

import { useEffect, useRef, useState } from "react";

export function useTimer(initialTime: number, onExplode: () => void) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const soundTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // ذخیره آخرین مقدار timeLeft در ref برای دسترسی دقیق در حلقه صدا
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // تولید صدای بوق فرکانسی دیجیتال
  const playBeep = (frequency: number, duration: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  // ۱. اینتروال اصلی شمارش معکوس ثانیه‌ها (ثابت و بدون تغییر سرعت)
  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      setIsActive(false);
      playBeep(90, 1.5); // صدای انفجار نهایی
      onExplode();
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isActive, timeLeft]);

  // ۲. حلقه صوتی مستقل برای مدیریت استرس و سرعت تیک‌تاک
  useEffect(() => {
    if (!isActive) return;

    const playLoop = () => {
      const currentSeconds = timeLeftRef.current;
      
      if (currentSeconds <= 0) return;

      // فرمول دینامیک برای فاصله بین بوق‌ها (بر حسب میلی‌ثانیه)
      // هر چقدر زمان کمتر شود، سرعت پخش صدا (بوق زدن) بالاتر می‌رود
      let soundDelay = 1000; // شروع با فاصله ۱ ثانیه

      if (currentSeconds <= 10) {
        soundDelay = 150; // ۱۰ ثانیه آخر: بسیار سریع و کلافه‌کننده (تقریبا ۷ بوق در ثانیه)
      } else if (currentSeconds <= 20) {
        soundDelay = 350; // فاز خطر
      } else if (currentSeconds <= initialTime / 2) {
        soundDelay = 600; // فاز هشدار (کمتر از نصف زمان)
      }

      // فرکانس صدا هم تیزتر می‌شود
      const frequency = currentSeconds <= 10 ? 1100 : currentSeconds <= initialTime / 2 ? 850 : 550;

      playBeep(frequency, 0.05);

      // تکرار حلقه صوتی با تاخیر جدید محاسبه شده
      soundTimeoutRef.current = setTimeout(playLoop, soundDelay);
    };

    // شروع اولین بوق
    playLoop();

    return () => {
      if (soundTimeoutRef.current) clearTimeout(soundTimeoutRef.current);
    };
  }, [isActive]);

  const startTimer = () => {
    setTimeLeft(initialTime);
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (soundTimeoutRef.current) clearTimeout(soundTimeoutRef.current);
    setTimeLeft(initialTime);
  };

  return { timeLeft, isActive, startTimer, stopTimer };
}