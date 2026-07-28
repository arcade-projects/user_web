'use client';

import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { Settings, Globe, Check, ChevronLeft, Heart } from 'lucide-react';
import { ArcadeNeonTheme } from '@/app/theme/arcade-theme';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const LANGUAGES = [
  { code: 'fa', label: 'فارسی', flag: '🇮🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fi', label: 'Suomi', flag: '🇫🇮' },
];

export default function BottomNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangList, setShowLangList] = useState(false);
  const [currentLang, setCurrentLang] = useState('fa');
  const menuRef = useRef<HTMLDivElement>(null);

  const cookies = new Cookies(null, { path: '/' });

  useEffect(() => {
    const savedLang = cookies.get('lang') || 'fa';
    setCurrentLang(savedLang);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowLangList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (langCode: string) => {
    cookies.set('lang', langCode, { path: '/' });
    setCurrentLang(langCode);
    setIsOpen(false);
    setShowLangList(false);
    window.location.reload();
  };

  return (
    <div
      ref={menuRef}
      className="fixed bottom-0 left-0 right-0 z-50 w-full bg-slate-950/80 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2.5 select-none shadow-[0_-5px_25px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* ─── سمت چپ: اطلاعات Mahan Kabir و لینک‌ها ─── */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
            <span className="font-extrabold text-slate-100 tracking-wide bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 bg-clip-text text-transparent">
              Mahan Kabir
            </span>
          </div>

          <div className="h-3.5 w-[1px] bg-slate-800 hidden sm:block" />

          {/* آیکون‌های گیت‌هاپ و لینکدین */}
          <div className="flex items-center gap-1.5">
            <a
              href="https://github.com/mahankabir" // آدرس گیت‌هاپ خودت رو بگذار
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
              title="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/mahankabir" // آدرس لینکدین خودت رو بگذار
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all duration-200"
              title="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* ─── سمت راست: دکمه تنظیمات و کرکره زبان ─── */}
        <div className="relative">
          
          {/* ─── کرکره بازشونده بالا ─── */}
          {isOpen && (
            <div className="absolute bottom-12 right-0 w-60 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.9)] p-3 space-y-2 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 z-50">
              
              {!showLangList ? (
                <div className="space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 border-b border-slate-800/80 mb-1">
                    Settings
                  </div>
                  
                  <button
                    onClick={() => setShowLangList(true)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/60 hover:border-cyan-500/40 transition-all duration-200 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-bold text-slate-200 group-hover:text-white">
                        زبان / Language
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={ArcadeNeonTheme.card.badge + " bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"}>
                        {currentLang}
                      </span>
                      <ChevronLeft className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-2 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-800/80 mb-1">
                    <span>Select Language</span>
                    <button
                      onClick={() => setShowLangList(false)}
                      className="text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
                    >
                      Back
                    </button>
                  </div>

                  {LANGUAGES.map((lang) => {
                    const isSelected = currentLang === lang.code;
                    return (
                      <button
                        key={lang.code}
                        onClick={() => handleSelectLanguage(lang.code)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all duration-200 border cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border-orange-500/50 text-white shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                            : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-sm">{lang.flag}</span>
                          <span>{lang.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-orange-400" />}
                      </button>
                    );
                  })}
                </div>
              )}

            </div>
          )}

          {/* دکمه اصلی چرخ‌دنده */}
          <button
            onClick={() => {
              setIsOpen(!isOpen);
              if (isOpen) setShowLangList(false);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300 border cursor-pointer ${
              isOpen
                ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50'
            }`}
            title="Settings"
          >
            <Settings className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} />
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Settings</span>
          </button>

        </div>

      </div>
    </div>
  );
}