'use client';

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
  text: string;
}

export default function QRCodeComponent({ text }: QRCodeProps) {
  const [qrSrc, setQrSrc] = useState<string>('');

  useEffect(() => {
    QRCode.toDataURL(text, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrSrc(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [text]);

  return (
    <div className={`${theme.card.wrapper} max-w-sm w-full mx-auto border-slate-800/80 shadow-2xl backdrop-blur-xl items-center text-center justify-center p-6 md:p-8 transition-all duration-300`}>
      {qrSrc ? (
        <div className="flex flex-col items-center w-full gap-5">
          {/* هدر کوچک داخل کارت */}
          <div className="w-full">
            <span className={theme.card.icon}>⚡</span>
            <h3 className={`${theme.card.enTitle} mt-2`}>Your QR Code</h3>
            <p className={theme.card.faTitle}>کد کیوآر شما</p>
          </div>

          {/* باکس تصویر QR Code با افکت درخشش نئونی ریسپانسیو */}
          <div className="relative p-3 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-[0_0_25px_rgba(255,255,255,0.03)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 max-w-[220px] sm:max-w-[260px] w-full aspect-square flex items-center justify-center">
            <img 
              src={qrSrc} 
              alt="Generated QR Code" 
              className="w-full h-full object-contain rounded-xl select-none"
            />
          </div>

          <p className={theme.card.description}>
            Scan the code above to access the link instantly.
          </p>
        </div>
      ) : (
        /* وضعیت در حال بارگذاری (Loading) هماهنگ با تم */
        <div className="flex flex-col items-center justify-center py-8 animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-t-cyan-500 border-r-transparent border-b-slate-800 border-l-transparent animate-spin mb-4"></div>
          <p className="text-sm font-bold tracking-wide text-cyan-400/90 drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
            در حال ساخت QR Code...
          </p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-mono">
            Generating Matrix
          </p>
        </div>
      )}
    </div>
  );
}