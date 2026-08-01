'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArcadeNeonTheme as theme } from '@/app/theme/arcade-theme';
import RequestService from '../services/RequestService';

export default function LoginPage() {
  const [step, setStep] = useState<'send' | 'verify'>('send');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return;

    setLoading(true);

    const requestService = new RequestService('/api/v1/auth/send-otp');
    const response = await requestService.post({ email: cleanEmail });
    
    setLoading(false);

    if (response) {
      setStep('verify');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const cleanEmail = email.trim().toLowerCase();
    const cleanOtp = otp.trim();
    if (!cleanOtp) return;

    setLoading(true);

    const requestService = new RequestService('/api/v1/auth/verify-otp');
    const response = await requestService.post({ email: cleanEmail, otp: cleanOtp });

    setLoading(false);

    if (response) {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className={`${theme.canvas} min-h-screen relative flex items-center justify-center p-4 overflow-hidden`}>
      {/* افکت‌های نور محیطی (Ambient Lights) */}
      <div className={theme.ambientLights.topRed} />
      <div className={theme.ambientLights.bottomCyan} />

      <main className="w-full max-w-md relative z-10 my-auto">
        {/* هدر برندینگ */}
        <div className="text-center mb-8 space-y-2">
          <h1 className={`${theme.header.title} text-5xl font-extrabold tracking-wider`}>
            ARCADE
          </h1>
          <div className={`${theme.header.divider} mx-auto w-24 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-full`} />
          <p className={`${theme.header.subtitle} text-sm text-slate-300 font-medium`}>
            {step === 'send'
              ? 'برای ورود یا ثبت‌نام، ایمیل خود را وارد کنید'
              : `کد ۶ رقمی ارسال‌شده به ${email} را وارد کنید`}
          </p>
        </div>

        {/* کارت نئونی فرم */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          {step === 'send' ? (
            <form onSubmit={handleSendOtp} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className={`${theme.form.label} text-xs font-bold tracking-wider text-cyan-400 uppercase block`}>
                  آدرس ایمیل
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${theme.form.input} w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all font-mono`}
                  dir="ltr"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`${theme.form.submitBtn} w-full py-3.5 px-6 rounded-xl font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-slate-950" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    در حال ارسال...
                  </span>
                ) : (
                  'ارسال کد تایید'
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="otp" className={`${theme.form.label} text-xs font-bold tracking-wider text-pink-400 uppercase block`}>
                  کد تایید ۶ رقمی
                </label>
                <input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  className={`${theme.form.input} w-full px-4 py-3 rounded-xl bg-slate-950/60 border border-slate-700/80 text-cyan-300 placeholder-slate-600 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-center text-2xl font-mono tracking-[0.5em]`}
                  dir="ltr"
                  autoFocus
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`${theme.form.submitBtn} w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(236,72,153,0.4)] disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    در حال بررسی...
                  </span>
                ) : (
                  'ورود به حساب'
                )}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('send');
                    setOtp('');
                  }}
                  className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  ← تغییر آدرس ایمیل
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}