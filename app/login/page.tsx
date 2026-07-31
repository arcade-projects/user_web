'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArcadeNeonTheme as theme } from '@/app/theme/arcade-theme';
import RequestService from '../services/RequestService';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [step, setStep] = useState<'send' | 'verify'>('send');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requestService = new RequestService('/api/v1/auth/send-otp');
    const response = await requestService.post({ email });
    setLoading(false);

    if (response) {
      setStep('verify');
    }
  };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const requestService = new RequestService('/api/v1/auth/verify-otp');
        const response = await requestService.post({ email, otp });

        setLoading(false);

        if (response && response.accessToken) {
            Cookies.set('token', response.accessToken, {
            expires: 7,
            path: '/',
            sameSite: 'lax',
            });

            setTimeout(() => {
            router.push('/admin');
            router.refresh();
            }, 100);
        }
    };

  return (
    <div className={theme.canvas}>
      <div className={theme.ambientLights.topRed} />
      <div className={theme.ambientLights.bottomCyan} />

      <main className="flex-1 flex flex-col justify-center items-center w-full relative z-10">
        {/* هدر صفحه */}
        <div className="text-center mb-8">
          <h1 className={theme.header.title}>ARCADE</h1>
          <div className={theme.header.divider} />
          <p className={theme.header.subtitle}>
            {step === 'send'
              ? 'برای ورود یا ثبت‌نام، ایمیل خود را وارد کنید'
              : `کد ۶ رقمی ارسال‌شده به ${email} را وارد کنید`}
          </p>
        </div>

        {step === 'send' ? (
          <form onSubmit={handleSendOtp} className={theme.form.wrapper}>
            <div>
              <label htmlFor="email" className={theme.form.label}>
                آدرس ایمیل
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={theme.form.input}
                dir="ltr"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={theme.form.submitBtn}
            >
              {loading ? 'در حال ارسال...' : 'ارسال کد تایید'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className={theme.form.wrapper}>
            <div>
              <label htmlFor="otp" className={theme.form.label}>
                کد تایید ۶ رقمی
              </label>
              <input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className={`${theme.form.input} text-center text-xl font-mono tracking-widest`}
                dir="ltr"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={theme.form.submitBtn}
            >
              {loading ? 'در حال بررسی...' : 'ورود به حساب'}
            </button>

            <button
              type="button"
              onClick={() => setStep('send')}
              className="text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors text-center mt-1 cursor-pointer"
            >
              ← تغییر آدرس ایمیل
            </button>
          </form>
        )}
      </main>
    </div>
  );
}