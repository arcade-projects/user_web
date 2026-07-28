// app/page.tsx
import Link from "next/link";
import { ArcadeNeonTheme } from "@/app/theme/arcade-theme";
import { useTranslations } from "next-intl";

export interface GameCard {
  id: string;
  title: string;
  localTitle: string;
  description: string;
  route: string;
  icon: string;
  status: "active" | "coming_soon";
  badgeColor: string;
  shadowColor: string;
}

export default function MainPage() {

  const t = useTranslations("MainPage");

  const GAMES_LIST: GameCard[] = [
{
      id: "hot-potato",
      title: t("games.hotPotato.title"),
      localTitle: t("games.hotPotato.localTitle"),
      description: t("games.hotPotato.description"),
      route: "/hotpotato",
      icon: "💣",
      status: "active",
      badgeColor: "bg-red-500 text-white",
      shadowColor: "hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] border-red-500/20 hover:border-red-500/60"
    },
    {
      id: "mafia",
      title: t("games.mafia.title"),
      localTitle: t("games.mafia.localTitle"),
      description: t("games.mafia.description"),
      route: "/games/mafia",
      icon: "🕵️‍♂️",
      status: "coming_soon",
      badgeColor: "bg-purple-600 text-purple-200",
      shadowColor: "hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] border-slate-800 opacity-60"
    },
    {
      id: "spy",
      title: t("games.spy.title"),
      localTitle: t("games.spy.localTitle"),
      description: t("games.spy.description"),
      route: "/games/spy",
      icon: "🔍",
      status: "coming_soon",
      badgeColor: "bg-cyan-600 text-cyan-200",
      shadowColor: "hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] border-slate-800 opacity-60"
    }
  ];

  return (
    <div className={ArcadeNeonTheme.canvas}>
      
      <div className={ArcadeNeonTheme.ambientLights.topRed} />
      <div className={ArcadeNeonTheme.ambientLights.bottomCyan} />

      <header className="text-center my-12 z-10 max-w-xl">
        <h1 className={ArcadeNeonTheme.header.title}>
          ARCADE ZONE
        </h1>
        <div className={ArcadeNeonTheme.header.divider} />
        <p className={ArcadeNeonTheme.header.subtitle}>
          {t('header.subtitle')}
        </p>
      </header>

      <main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4 z-10">
        {GAMES_LIST.map((game: GameCard) => {
          const isActive = game.status === "active";

          const CardContent = (
            <div className={`
              ${ArcadeNeonTheme.card.wrapper} 
              ${game.shadowColor} 
              ${isActive ? "cursor-pointer" : "cursor-not-allowed"}
            `}>
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className={ArcadeNeonTheme.card.icon}>
                    {game.icon}
                  </span>
                  <span className={`${ArcadeNeonTheme.card.badge} ${game.badgeColor}`}>
                    {isActive ? "LIVE NOW" : "SOON"}
                  </span>
                </div>

                <div className="mb-3">
                  <h2 className={ArcadeNeonTheme.card.enTitle}>
                    {game.title}
                  </h2>
                  <h3 className={ArcadeNeonTheme.card.faTitle} dir="rtl">
                    {game.localTitle}
                  </h3>
                </div>

                <p className={ArcadeNeonTheme.card.description} dir="rtl">
                  {game.description}
                </p>
              </div>

              <div className={ArcadeNeonTheme.card.footer}>
                <span className={ArcadeNeonTheme.card.actionText}>
                  {isActive ? "Enter Room" : "Under Development"}
                </span>
                <span className={`
                  ${ArcadeNeonTheme.card.arrow} 
                  ${isActive ? "text-orange-400" : "text-slate-600"}
                `}>
                  ➔
                </span>
              </div>
            </div>
          );

          return isActive ? (
            <Link href={game.route} key={game.id}>
              {CardContent}
            </Link>
          ) : (
            <div key={game.id} className="relative select-none">
              {CardContent}
            </div>
          );
        })}
      </main>

      <footer className="mt-auto pt-12 pb-4 text-center z-10">
        <p className="text-[10px] text-slate-600 uppercase tracking-widest font-mono">
          &copy; 2026 Arcade Web Platform. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}