"use client"

import RequestService from "@/app/services/RequestService";
import { useEffect, useState } from "react";

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";
import Link from "next/link";

interface Room {
    id: string,
    pincode: string,
    category_id: string,
    minutes: number,
    status: string,
    activate: boolean
}

const RoomPage = () => {

    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {

        const getRooms = async () => {
            const response = new RequestService('/api/v1/room');
            const result = await response.get();

            setRooms(result);
        }

        getRooms();

    }, []);

    return (
        <div className={theme.canvas}>
            <div className={theme.ambientLights.topRed} />
            <div className={theme.ambientLights.bottomCyan} />

            <div className="w-full max-w-4xl relative z-10">
                <div className="text-center mb-8">
                <h2 className={theme.header.title}>اتاق‌ها</h2>
                <div className={theme.header.divider} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms && rooms.length > 0 ? (
                    rooms.map((room, index) => {
                    const colorClass = theme.colors[index % theme.colors.length];

                    return (
                        <Link
                            key={room.id || index}
                            href={`room/${room.pincode}/room_player`}
                            className={`cursor-pointer ${theme.card.wrapper} ${colorClass}`}
                            >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-mono text-slate-400">
                                #{index + 1}
                                </span>
                                <span className={theme.card.badge}>
                                {room.status}
                                </span>
                            </div>

                            <div className="flex items-baseline justify-between mt-2">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                                زمان مانده:
                                </span>
                                <span className="text-lg font-black tracking-wide text-slate-100">
                                {room.minutes} دقیقه
                                </span>
                            </div>
                        </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-8 text-slate-500 text-sm">
                    هیچ اتاقی یافت نشد.
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default RoomPage;