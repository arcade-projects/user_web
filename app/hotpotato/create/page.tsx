"use client";

import { ArcadeNeonTheme as theme } from "@/app/theme/arcade-theme";
import RequestService from "@/app/services/RequestService";
import Link from "next/link";
import { useEffect, useState } from "react";
import QRCodeComponent from "@/app/components/QRCodeComponent";

const HotPotatoCreatePage = () => {

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(String);
    const [minutes, setMinutes] = useState(Number);
    const [room, setRoom] = useState<{id: String, pincode: number}>({ id: '', pincode: 0 });

    useEffect(() => {

        const getCategories = async () => {
            const response = new RequestService('/category');
            const data = await response.get();

            setCategories(data);
        }

        getCategories();

    }, []);

    const onChangeCategoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryId(e.target.value);
    }
    
    const onChangeTimerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinutes(Number(e.target.value));
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const payload = {
            category_id: categoryId,
            minutes: minutes
        };

        const response = new RequestService('/room');
        const data = await response.post(payload);
        setRoom(data);
    }

    return (
        <div className={`${theme.canvas} justify-center py-10 px-4`}>
            {/* انوار محیطی نئونی */}
            <div className={theme.ambientLights.topRed} />
            {/* اضافه کردن نور محیطی دوم برای بالانس رنگی چپ و راست */}
            <div className={theme.ambientLights.bottomCyan} />

            {/* کانتینر اصلی ریسپانسیو: در دسکتاپ کنار هم، در موبایل زیر هم */}
            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 w-full max-w-5xl z-10">
                
                {/* کارت دسترسی به روم و QR Code (فقط در صورت وجود پین‌کد نمایش داده می‌شود) */}
                {room.pincode !== 0 && (
                    <div className={`${theme.card.wrapper} w-full max-w-md bg-slate-900/80 border-cyan-500/20 shadow-[0_0_35px_rgba(6,182,212,0.15)] p-5 md:p-6 text-center relative overflow-hidden flex flex-col justify-between mx-auto`}>
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                        
                        <div>
                            <span className={`${theme.card.badge} bg-cyan-950 text-cyan-400 block w-max mx-auto mb-4`}>
                                Room Access
                            </span>
                            
                            <div className="mb-5">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-1">Room PIN</p>
                                <span className="text-4xl md:text-5xl font-mono font-black tracking-[0.25em] pl-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]">
                                    {room.pincode}
                                </span>
                            </div>

                            {/* اصلاح کانتینر QR: حذف محدودیت عرض سخت‌افزاری و باز گذاشتن فضا برای کامپوننت داخلی */}
                            <div className="bg-slate-950/50 p-3 rounded-2xl border border-slate-800/60 w-full backdrop-blur-sm">
                                <QRCodeComponent text={`${process.env.NEXT_PUBLIC_APP_URL}/hotpotato/join/${room.pincode.toString()}`} />
                            </div>
                        </div>
                        
                        <p className="text-xs text-slate-400 font-medium mt-4 border-t border-slate-800/40 pt-4" dir="rtl">
                            دوستانتان را با اسکن این کد یا وارد کردن پین بالا به بازی دعوت کنید.
                        </p>
                    </div>
                )}

                {/* کارت تنظیمات و ساخت روم جدید */}
                <div className={`${theme.card.wrapper} w-full max-w-md bg-slate-900/80 border-slate-800/80 shadow-2xl relative p-6 md:p-8 mx-auto flex flex-col justify-between`}>
                    <div>
                        <div className="text-center mb-6">
                            <span className={`${theme.card.badge} bg-orange-950 text-orange-400 block w-max mx-auto mb-2`}>
                                Setup Room
                            </span>
                            <h2 className={`${theme.card.enTitle} text-center text-2xl`}>
                                Create New Game
                            </h2>
                            <div className={theme.header.divider} />
                        </div>

                        <form onSubmit={onSubmitHandler} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 block px-1">
                                    Select Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={categoryId}
                                        onChange={onChangeCategoryHandler}
                                        className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 transition-all appearance-none cursor-pointer pr-10"
                                        style={{ 
                                            backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'/%3e%3c/svg%3e")', 
                                            backgroundRepeat: 'no-repeat', 
                                            backgroundPosition: 'right 1rem center', 
                                            backgroundSize: '1em' 
                                        }}
                                    >
                                        {categories && categories.map((category: {id: string, title: string}) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                                className="bg-slate-950 text-slate-200"
                                            >
                                                {category.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 block px-1">
                                    Duration (Minutes)
                                </label>
                                <input 
                                    type="number" 
                                    min='1' 
                                    placeholder="e.g., 3" 
                                    name="timer"
                                    onChange={onChangeTimerHandler}
                                    className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium placeholder-slate-600 focus:outline-none focus:border-orange-500/60 focus:ring-1 focus:ring-orange-500/30 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={room.pincode !== 0}
                                className="disabled:from-slate-900 disabled:to-slate-900 disabled:border-slate-800/40 
                                    disabled:shadow-none disabled:cursor-not-allowed disabled:opacity-40
                                    w-full mt-4 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-extrabold uppercase tracking-wider rounded-xl border border-slate-600/50 active:scale-[0.99] transition-all duration-150 shadow-md text-center text-sm cursor-pointer"
                            >
                                Create Room
                            </button>
                        </form>
                    </div>

                    {room.pincode !== 0 && (
                        <div className={`${theme.card.footer} mt-6`}>
                            <span className={theme.card.actionText}>Already have a room?</span>
                            <Link 
                                href={`/hotpotato/join/` + room.pincode}
                                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 group/link"
                            >
                                Join Room 
                                <span className={`${theme.card.arrow} inline-block group-hover/link:translate-x-1`}>→</span>
                            </Link>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default HotPotatoCreatePage;