"use client";

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Trophy, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  LucideIcon
} from 'lucide-react';
import { ArcadeNeonTheme } from '@/app/theme/arcade-theme';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const theme = ArcadeNeonTheme.sidebar;

  const menuItems: MenuItem[] = [
    { id: 'games', label: 'Games', href: '/admin/games', icon: LayoutDashboard },
    { id: 'category', label: 'Categories', href: '/admin/category', icon: Gamepad2, badge: 'New' },
    { id: 'rooms', label: 'Rooms', href: '/admin/hotpotato/room', icon: Trophy },
    { id: 'users', label: 'Users', href: '/admin/users', icon: Users, badge: '12' },
    { id: 'settings', label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="h-full w-full bg-slate-950 text-slate-100 font-sans flex flex-col lg:flex-row dir-ltr relative overflow-hidden">
      
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={theme.mobileToggle}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {isOpen && (
        <div 
          className={theme.backdrop}
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`${theme.container} ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className={theme.brandWrapper}>
            <div className={`${theme.brandIcon} relative overflow-hidden`}>
              <Image 
                src="/android-chrome-192x192.png" 
                alt="Logo" 
                width={192} 
                height={192} 
                className="object-contain"
              />
            </div>
            <div>
              <h1 className={theme.brandTitle}>ARCADE</h1>
              <p className={theme.brandSubtitle}>Neon Core</p>
            </div>
          </div>

          <nav className="mt-5">
            <p className={theme.sectionLabel}>Navigation</p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`w-full ${theme.navItem} ${isActive ? theme.navItemActive : theme.navItemInactive}`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon 
                      size={16} 
                      className={isActive ? theme.iconActive : theme.iconInactive} 
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={isActive ? theme.badgeActive : theme.badgeInactive}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className={theme.profileCard}>
          <div className={theme.avatar}>AR</div>
          <div className="flex-1 min-w-0 text-left">
            <p className={theme.userName}>Arya Rad</p>
            <p className={theme.userRole}>Level 42 Player</p>
          </div>
          <button className={theme.logoutBtn} title="Logout">
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      <main className="flex-1 lg:ml-64 p-5 lg:p-8 min-h-screen">
        {children}
      </main>

    </div>
  );
}