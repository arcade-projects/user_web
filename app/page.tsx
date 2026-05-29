import { nanoid } from "nanoid";

import Link from "next/link";

export interface GameCard {
  id: string;
  title: string;
  persianTitle: string;
  description: string;
  route: string;
  icon: string;
  status: "active" | "coming_soon";
  badgeColor: string;
  shadowColor: string;
}

export default function MainDashboard() {

    const GAMES_LIST: GameCard[] = [
        {
            id: "hot-potato",
            title: "HOT POTATO",
            persianTitle: "بمب ساعتی کلمات",
            description: "یک بازی گروهی و هیجان‌انگیز! کلمه را حدس بزن و بمب را قبل از انفجار به نفر بعدی پاس بده.",
            route: "/hotpotato/" + nanoid(10), // مسیر کامپوننتی که فرستادید
            icon: "💣",
            status: "active",
            badgeColor: "bg-red-500 text-white",
            shadowColor: "hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] border-red-500/20 hover:border-red-500/60"
        },
        {
            id: "mafia",
            title: "MAFIA HELPER",
            persianTitle: "گرداننده مافیا",
            description: "مدیریت حرفه‌ای نقش‌ها، شب‌ها و روزهای بازی مافیا بدون نیاز به قلم و کاغذ.",
            route: "/games/mafia",
            icon: "🕵️‍♂️",
            status: "coming_soon",
            badgeColor: "bg-purple-600 text-purple-200",
            shadowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] border-slate-800 opacity-60"
        },
        {
            id: "spy",
            title: "SPYFALL",
            persianTitle: "جاسوس بازی",
            description: "مکان مشترک را پیدا کنید و با سوال و جواب‌های هوشمندانه، جاسوس گروه را لو بدهید!",
            route: "/games/spy",
            icon: "🔍",
            status: "coming_soon",
            badgeColor: "bg-cyan-600 text-cyan-200",
            shadowColor: "hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] border-slate-800 opacity-60"
        }
    ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-950 text-slate-100 p-6 font-sans select-none overflow-x-hidden relative">
      
      {/* افکت‌های نوری بک‌گراند (Ambient Light) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] aspect-square bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* هدر اصلی وب‌سایت */}
      <header className="text-center my-12 z-10 max-w-xl">
        <h1 className="text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 drop-shadow-md">
          ARCADE ZONE
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto my-4 rounded-full" />
        <p className="text-sm text-slate-400 font-medium leading-relaxed px-4">
          مجموعه بازی‌های دورهمی، مدرن و تحت وب. بازی مورد نظر خود را انتخاب کنید و در کنار دوستانتان لذت ببرید.
        </p>
      </header>

      {/* گرید کارت‌های بازی */}
      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 z-10">
        {GAMES_LIST.map((game: GameCard) => {
          const isActive = game.status === "active";

          // ساختار کارت بازی
          const CardContent = (
            <div className={`group h-full flex flex-col justify-between p-6 bg-slate-900/40 backdrop-blur-md border rounded-2xl transition-all duration-300 cursor-pointer ${game.shadowColor}`}>
              <div>
                {/* بخش بالایی کارت: آیکون و وضعیت */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-4xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md ${game.badgeColor}`}>
                    {isActive ? "LIVE NOW" : "SOON"}
                  </span>
                </div>

                {/* عناوین بازی */}
                <div className="mb-3">
                  <h2 className="text-xl font-extrabold tracking-wide text-slate-200 group-hover:text-white transition-colors">
                    {game.title}
                  </h2>
                  <h3 className="text-xs text-orange-400/80 font-bold mt-0.5" dir="rtl">
                    {game.persianTitle}
                  </h3>
                </div>

                {/* توضیحات */}
                <p className="text-xs text-slate-400 leading-relaxed font-normal mb-6" dir="rtl">
                  {game.description}
                </p>
              </div>

              {/* دکمه اکشن پایین کارت */}
              <div className="w-full pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-400 transition-colors">
                  {isActive ? "Enter Room" : "Under Development"}
                </span>
                <span className={`text-sm transition-transform duration-300 ${isActive ? "group-hover:translate-x-1 text-orange-400" : "text-slate-600"}`}>
                  ➔
                </span>
              </div>
            </div>
          );

          // اگر بازی فعال بود لینک دار باشد، در غیر این صورت صرفاً نمایش داده شود
          return isActive ? (
            <Link href={game.route} key={game.id}>
              {CardContent}
            </Link>
          ) : (
            <div key={game.id} className="relative select-none cursor-not-allowed">
              {CardContent}
            </div>
          );
        })}
      </main>

      {/* فوتر عمومی سیستم */}
      <footer className="mt-auto pt-12 pb-4 text-center z-10">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">
          &copy; 2026 Arcade Web Platform. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}