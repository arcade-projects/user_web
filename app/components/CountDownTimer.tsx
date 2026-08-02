"use client";

import { useEffect, useState } from "react";

interface PreciseTimerProps {
  serverMinutes: number; 
}

const PreciseTimer = ({ serverMinutes }: PreciseTimerProps) => {
  const [msLeft, setMsLeft] = useState<number>(serverMinutes * 60 * 1000);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    setMsLeft(serverMinutes * 60 * 1000);
  }, [serverMinutes]);

  useEffect(() => {
    if (!isActive || msLeft <= 0) return;

    const startTime = performance.now();
    const initialMsLeft = msLeft;

    const intervalId = setInterval(() => {
      const elapsedTime = performance.now() - startTime;
      
      setMsLeft(() => {
        const nextMs = Math.max(0, initialMsLeft - elapsedTime);
        if (nextMs === 0) clearInterval(intervalId);
        return nextMs;
      });
    }, 10);
    return () => clearInterval(intervalId);
  }, [isActive, msLeft === serverMinutes * 60 * 1000]);

  const formatPreciseTime = (totalMs: number) => {
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
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
          color: msLeft < 10000 ? "#ef4444" : "#1f2937"
        }}
      >
        {formatPreciseTime(msLeft)}
      </span>
    </div>
  );
};

export default PreciseTimer;