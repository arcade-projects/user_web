"use client";

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";

import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import RequestService from "@/app/services/RequestService";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface Room {
    id: string
}

const INITIAL_ROOM = {
    id: '',
}

const HotPotatoJoinPage = () => {

    const t = useTranslations("JoinRoomCard");

    const params = useParams();

    const router = useRouter();

    const [name, setName] = useState(String);
    const [room, setRoom] = useState<Room>(INITIAL_ROOM);

    useEffect(() => {

        const getRoomHandler = async () => {
            const response = new RequestService('/api/v1/room/pincode/' + params?.pincode as string);
            const data = await response.get();

            setRoom(data);
            localStorage.setItem('room_id', data.id);
        }

        getRoomHandler();

    }, []);

    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            name: name,
            pincode: params?.pincode as string
        }

        const player = new RequestService(`/api/v1/room/${room.id}/player`);
        const result = await player.post(payload);

        if (result) {
            localStorage.setItem('player_id', result.id);
            localStorage.setItem('player_name', result.player_name);
            router.push('/hotpotato/' + room.id);
        }
    }

    return (
        <div className={theme.canvas}>
            <div className={theme.ambientLights.topRed} />

            <div className={`${theme.card.wrapper} w-full max-w-md bg-slate-900/80 border-slate-800/80 shadow-2xl relative p-6 md:p-8`}>
                
                <div className="text-center mb-6">
                    <span className={`${theme.card.badge} bg-cyan-950 text-cyan-400 block w-max mx-auto mb-2`}>
                        {t("badge")}
                    </span>
                    <h2 className={`${theme.card.enTitle} text-center`}>
                        {t("title")}
                    </h2>
                    <div className={theme.header.divider} />
                </div>

                <form onSubmit={onSubmitHandler} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 block px-1">
                            {t("nameLabel")}
                        </label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder={t("namePlaceholder")} 
                            onChange={onChangeNameHandler} 
                            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-extrabold uppercase tracking-wider rounded-xl border border-slate-600/50 active:scale-[0.99] transition-all duration-150 shadow-md text-center text-sm cursor-pointer"
                    >
                        {t("joinBtn")}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default HotPotatoJoinPage;