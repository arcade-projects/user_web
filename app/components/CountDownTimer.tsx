"use client";

import { useEffect, useState } from "react";

interface PreciseTimerProps {
  // زمان باقی‌مانده که از سرور می‌آید (بهتر است به ثانیه یا میلی‌ثانیه باشد)
  // فرض می‌کنیم سرور به ما دقیقه (مثلاً 2) می‌دهد
  serverMinutes: number; 
}

const PreciseTimer = ({ serverMinutes }: PreciseTimerProps) => {
  // تبدیل دقیقه به میلی‌ثانیه (هر دقیقه = ۶۰۰۰۰ میلی‌ثانیه)
  const [msLeft, setMsLeft] = useState<number>(serverMinutes * 60 * 1000);
  const [isActive, setIsActive] = useState<boolean>(true);

  // ۱. افکت برای زمانی که دیتای جدیدی از بک‌اند می‌آید (همگام‌سازی با سرور)
  useEffect(() => {
    setMsLeft(serverMinutes * 60 * 1000);
  }, [serverMinutes]);

  // ۲. افکت اصلی شمارش معکوس با دقت میلی‌ثانیه
  useEffect(() => {
    if (!isActive || msLeft <= 0) return;

    // ذخیره زمان دقیق شروع این چرخه
    const startTime = performance.now();
    const initialMsLeft = msLeft;

    const intervalId = setInterval(() => {
      const elapsedTime = performance.now() - startTime;
      
      setMsLeft(() => {
        const nextMs = Math.max(0, initialMsLeft - elapsedTime);
        if (nextMs === 0) clearInterval(intervalId);
        return nextMs;
      });
    }, 10); // اجرای هر ۱۰ میلی‌ثانیه برای رندر روان میلی‌ثانیه‌ها

    return () => clearInterval(intervalId);
  }, [isActive, msLeft === serverMinutes * 60 * 1000]); // وابستگی به ریست شدن از سمت سرور

  // ۳. تابع فرمت‌دهی زمان به فرمت MM:SS:mm
  const formatPreciseTime = (totalMs: number) => {
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    // گرفتن دو رقم اول میلی‌ثانیه (مثلاً به جای 250 نشان دهد 25)
    const milliseconds = Math.floor((totalMs % 1000) / 10);

    const strMin = minutes.toString().padStart(2, "0");
    const strSec = seconds.toString().padStart(2, "0");
    const strMs = milliseconds.toString().padStart(2, "0");

    return `${strMin}:${strSec}:${strMs}`;
  };

  return (
    <div style={{ display: "inline-block", direction: "ltr" }}>
      <span 
        style={{ 
          fontFamily: "monospace", 
          fontSize: "3.5rem", 
          fontWeight: "bold",
          color: msLeft < 10000 ? "#ef4444" : "#1f2937" // قرمز شدن در ۱۰ ثانیه پایانی
        }}
      >
        {formatPreciseTime(msLeft)}
      </span>
    </div>
  );
};

export default PreciseTimer;