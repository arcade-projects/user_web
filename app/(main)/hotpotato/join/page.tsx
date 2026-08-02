"use client";

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";

import { useRouter } from 'next/navigation';
import RequestService from "@/app/services/RequestService";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const HotPotatoJoinPage = () => {

    const t = useTranslations("JoinRoomCard");

    const router = useRouter();

    const [name, setName] = useState(String);
    const [pincode, setPincode] = useState(String);

    const onChangeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const onChangePincodeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPincode(e.target.value);
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            name: name,
            pincode: pincode
        }

        const player = new RequestService(`/api/v1/room/${pincode}/player`);
        const data = await player.post(payload);

        if (data) {
            localStorage.setItem('room_id', data.room_id);
            localStorage.setItem('player_id', data.id);
            localStorage.setItem('player_name', data.player_name);
            router.push('/hotpotato/' + data.room_id);
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

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 block px-1">
                            {t("pincodeLabel")}
                        </label>
                        <input 
                            type="text" 
                            name="pincode" 
                            placeholder={t("pincodePlaceholder")} 
                            onChange={onChangePincodeHandler}
                            className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium tracking-wider placeholder-slate-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all text-left"
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