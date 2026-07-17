// hooks/useGameSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:4000'; // آدرس سرور NestJS شما

export const useGameSocket = (pinCode?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [roomData, setRoomData] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
        'transports': ['websocket'],
    });
    setSocket(newSocket);

    // گوش دادن به آپدیت‌های اتاق از سمت سرor
    newSocket.on('roomUpdated', (data) => setRoomData(data));
    newSocket.on('gameStateChanged', (data) => setRoomData(data));
    
    newSocket.on('error', (msg) => alert(msg));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const createRoom = (category: string) => {
    socket?.emit('createRoom', { category });
  };

  const joinRoom = (pin: string, name: string) => {
    socket?.emit('joinRoom', { pin, name });
  };

  const passBomb = (pin: string) => {
    socket?.emit('nextTurn', { pin });
  };

  return { socket, roomData, createRoom, joinRoom, passBomb };
};