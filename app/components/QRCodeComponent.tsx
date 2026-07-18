'use client';

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
    <div className="flex flex-col items-center gap-4 p-4 border rounded-xl">
      {qrSrc ? (
        <img src={qrSrc} alt="Generated QR Code" className="rounded-lg shadow-sm" />
      ) : (
        <p>در حال ساخت QR Code...</p>
      )}
    </div>
  );
}