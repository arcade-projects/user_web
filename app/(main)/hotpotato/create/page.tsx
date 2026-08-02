"use client";

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";
import RequestService from "@/app/services/RequestService";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCodeComponent from "@/app/components/QRCodeComponent";
import { CategoryInterface } from "@/app/interfaces/ICategory"
import { useTranslations } from "next-intl";

const HotPotatoCreatePage = () => {

    const t = useTranslations("CreateRoomCard");

    const [categories, setCategories] = useState<CategoryInterface[]>([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [minutes, setMinutes] = useState(Number);
    const [room, setRoom] = useState<{id: String, pincode: number}>({ id: '', pincode: 0 });

    useEffect(() => {

        const getCategories = async () => {
            const response = new RequestService('/api/v1/categories');
            const result = await response.get();

            setCategories(result);
        }

        getCategories();

    }, []);

    const onChangeTimerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinutes(Number(e.target.value));
    }

    const handleCategoryToggle = (id: string) => {
        setSelectedCategoryIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const payload = {
            category_id: selectedCategoryIds[0],
            minutes: minutes
        };

        const response = new RequestService('/api/v1/room');
        const result = await response.post(payload);
        setRoom(result);
    }

    return (
        <div className={`${theme.canvas} justify-center py-10 px-4`}>
            <div className={theme.ambientLights.topRed} />
            <div className={theme.ambientLights.bottomCyan} />
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 w-full max-w-5xl z-10">
                {room.pincode !== 0 ? (
                    <div className={`${theme.card.wrapper} w-full max-w-md bg-slate-900/80 border-cyan-500/20 shadow-[0_0_35px_rgba(6,182,212,0.15)] p-5 md:p-6 text-center relative overflow-hidden flex flex-col justify-between mx-auto`}>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                        
                        <div>
                            <span className={`${theme.card.badge} bg-cyan-950 text-cyan-400 block w-max mx-auto mb-4`}>
                                {t("roomAccess.badge")}
                            </span>
                            
                            <div className="mb-5">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-1">Room PIN</p>
                                <span className="text-4xl md:text-5xl font-mono font-black tracking-[0.25em] pl-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]">
                                    {room.pincode}
                                </span>
                            </div>

                            <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60 w-full backdrop-blur-sm">
                                <QRCodeComponent text={`${process.env.NEXT_PUBLIC_APP_URL}/hotpotato/join/${room.pincode}`} />
                            </div>
                        </div>
                        
                        <p className="text-xs text-slate-400 font-medium mt-4 border-t border-slate-800/40 pt-4" dir="rtl">
                            {t("roomAccess.inviteText")}
                        </p>

                        <div className={`${theme.card.footer} mt-6`}>
                            <span className={theme.card.actionText}>{t("setupRoom.alreadyHaveRoom")}</span>
                            <Link 
                                href={`/hotpotato/join/` + room.pincode}
                                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group/link"
                            >
                                {t("setupRoom.joinRoomBtn")} 
                                <span className={`${theme.card.arrow} inline-block group-hover/link:translate-x-1`}>→</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className={`${theme.card.wrapper} w-full max-w-md bg-slate-900/80 border-slate-800/80 shadow-2xl relative p-6 md:p-8 mx-auto flex flex-col justify-between`}>
                        <div>
                            <div className="text-center mb-6">
                                <span className={`${theme.card.badge} bg-orange-950 text-orange-400 block w-max mx-auto mb-2`}>
                                    {t("setupRoom.badge")}
                                </span>
                                <h2 className={`${theme.card.enTitle} text-center text-2xl`}>
                                    {t("setupRoom.title")}
                                </h2>
                                <div className={theme.header.divider} />
                            </div>

                            <form onSubmit={onSubmitHandler} className="space-y-5">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-xs font-bold text-slate-400 block">
                                            {t("setupRoom.selectCategories")}
                                        </label>
                                        <span className="text-[11px] text-slate-500 font-medium">
                                            {selectedCategoryIds.length} {t("setupRoom.selectedCount")}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full p-1">
                                        {Array.isArray(categories) && categories.map((category, index) => {
                                            const isSelected = selectedCategoryIds.includes(category.id);

                                            return (
                                                <button
                                                    key={category.id || index}
                                                    type="button"
                                                    onClick={() => handleCategoryToggle(category.id)}
                                                    className={`relative p-4 rounded-xl font-bold text-center transition-all duration-200 cursor-pointer border select-none ${
                                                        isSelected
                                                            ? 'bg-orange-500/10 border-orange-500 text-orange-400 shadow-lg shadow-orange-500/10 scale-[1.02]'
                                                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                                                    }`}
                                                >
                                                    {category.name}

                                                    {isSelected && (
                                                        <span className="absolute top-2 right-2 flex h-2 w-2">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-400 block px-1">
                                        {t("setupRoom.durationLabel")}
                                    </label>
                                    <input 
                                        type="number" 
                                        min='1' 
                                        placeholder={t("setupRoom.durationPlaceholder")}
                                        name="timer"
                                        onChange={onChangeTimerHandler}
                                        className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium placeholder-slate-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={room.pincode !== 0 || selectedCategoryIds.length === 0}
                                    className="disabled:from-slate-900 disabled:to-slate-900 disabled:border-slate-800/40 
                                        disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-40
                                        w-full mt-4 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-extrabold uppercase tracking-wider rounded-xl border border-slate-600/50 active:scale-[0.99] transition-all duration-150 shadow-md text-center text-sm cursor-pointer"
                                >
                                    {t("setupRoom.createBtn")}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HotPotatoCreatePage;