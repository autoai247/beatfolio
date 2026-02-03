'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/lib/auth';
import { Eye, EyeOff, User, Building } from 'lucide-react';

export default function AuthPage() {
  const { t, lang } = useLanguage();
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const router = useRouter();
  
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<'client' | 'artist'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const T: Record<string, Record<string, string>> = {
    login: { ko: '로그인', en: 'Login', zh: '登录', vi: 'Đăng nhập', th: 'เข้าสู่ระบบ' },
    signup: { ko: '회원가입', en: 'Sign Up', zh: '注册', vi: 'Đăng ký', th: 'สมัครสมาชิก' },
    email: { ko: '이메일', en: 'Email', zh: '邮箱', vi: 'Email', th: 'อีเมล' },
    password: { ko: '비밀번호', en: 'Password', zh: '密码', vi: 'Mật khẩu', th: 'รหัสผ่าน' },
    name: { ko: '이름', en: 'Name', zh: '姓名', vi: 'Tên', th: 'ชื่อ' },
    emailPh: { ko: '이메일을 입력하세요', en: 'Enter email', zh: '输入邮箱', vi: 'Nhập email', th: 'กรอกอีเมล' },
    passwordPh: { ko: '비밀번호를 입력하세요', en: 'Enter password', zh: '输入密码', vi: 'Nhập mật khẩu', th: 'กรอกรหัสผ่าน' },
    namePh: { ko: '이름을 입력하세요', en: 'Enter name', zh: '输入姓名', vi: 'Nhập tên', th: 'กรอกชื่อ' },
    client: { ko: '클라이언트', en: 'Client', zh: '客户', vi: 'Khách hàng', th: 'ลูกค้า' },
    clientDesc: { ko: '아티스트를 섭외하고 싶어요', en: 'I want to book artists', zh: '我想预约艺术家', vi: 'Tôi muốn đặt nghệ sĩ', th: 'ฉันต้องการจองศิลปิน' },
    artist: { ko: '아티스트', en: 'Artist', zh: '艺术家', vi: 'Nghệ sĩ', th: 'ศิลปิน' },
    artistDesc: { ko: '프로필을 등록하고 싶어요', en: 'I want to register', zh: '我想注册', vi: 'Tôi muốn đăng ký', th: 'ฉันต้องการลงทะเบียน' },
    google: { ko: 'Google로 계속하기', en: 'Continue with Google', zh: '使用Google继续', vi: 'Tiếp tục với Google', th: 'ดำเนินการด้วย Google' },
    or: { ko: '또는', en: 'or', zh: '或', vi: 'hoặc', th: 'หรือ' },
    agree: { ko: '이용약관에 동의합니다', en: 'I agree to the terms', zh: '我同意条款', vi: 'Tôi đồng ý', th: 'ฉันยอมรับข้อกำหนด' },
    agreeError: { ko: '이용약관에 동의해주세요', en: 'Please agree to terms', zh: '请同意条款', vi: 'Vui lòng đồng ý', th: 'กรุณายอมรับ' },
    signupDone: { ko: '회원가입 완료!', en: 'Signed up!', zh: '注册成功!', vi: 'Đăng ký thành công!', th: 'สมัครสำเร็จ!' },
    loadingText: { ko: '처리 중...', en: 'Loading...', zh: '加载中...', vi: 'Đang tải...', th: 'กำลังโหลด...' },
  };

  const tx = (k: string) => T[k]?.[lang] || T[k]?.en || k;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        const result = await signIn(email, password);
        if (result.error) { setError(result.error); setLoading(false); }
        else router.push('/');
      } else {
        if (!agreeTerms) { setError(tx('agreeError')); setLoading(false); return; }
        const result = await signUp(email, password, name, userType);
        if (result.error) { setError(result.error); setLoading(false); }
        else { alert(tx('signupDone')); setMode('login'); setLoading(false); }
      }
    } catch { setError('Error'); setLoading(false); }
  };

  const handleAdminLogin = async () => {
    setLoading(true);
    const result = await signIn('admin@beatfolio.kr', 'admin1234');
    if (!result.error) router.push('/');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full">
        {/* 로고 */}
        <div className="text-center mb-6">
          <Link href="/">
            <span className="text-2xl font-bold">
              <span className="text-white">BEAT</span><span className="text-mint">FOLIO</span>
            </span>
          </Link>
        </div>

        {/* 관리자 빠른 로그인 */}
        <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-[11px] text-red-400 mb-2">🔧 Test Admin Account</p>
          <button onClick={handleAdminLogin} disabled={loading} className="w-full py-2 bg-red-500/20 text-red-400 font-medium rounded-lg text-sm">
            Admin {tx('login')}
          </button>
          <p className="text-[10px] text-gray-600 mt-1">admin@beatfolio.kr / admin1234</p>
        </div>

        {/* 탭 */}
        <div className="flex mb-5">
          <button onClick={() => { setMode('login'); setError(''); }} className={`flex-1 py-2.5 text-center font-medium border-b-2 text-sm ${mode === 'login' ? 'border-mint text-mint' : 'border-dark-200 text-gray-400'}`}>
            {tx('login')}
          </button>
          <button onClick={() => { setMode('signup'); setError(''); }} className={`flex-1 py-2.5 text-center font-medium border-b-2 text-sm ${mode === 'signup' ? 'border-mint text-mint' : 'border-dark-200 text-gray-400'}`}>
            {tx('signup')}
          </button>
        </div>

        {/* Google */}
        <button onClick={signInWithGoogle} disabled={loading} className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-black font-medium rounded-lg text-sm mb-4">
          <svg width="18" height="18" viewBox="0 0 20 20"><path d="M19.6 10.23c0-.68-.06-1.36-.17-2.02H10v3.83h5.38a4.6 4.6 0 01-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.33z" fill="#4285F4"/><path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.58-4.12H1.08v2.58A9.99 9.99 0 0010 20z" fill="#34A853"/><path d="M4.42 11.9a6 6 0 010-3.8V5.52H1.08a10 10 0 000 8.96l3.34-2.58z" fill="#FBBC05"/><path d="M10 3.98c1.47 0 2.78.5 3.82 1.5l2.86-2.86A9.97 9.97 0 0010 0 9.99 9.99 0 001.08 5.52l3.34 2.58C5.2 5.74 7.4 3.98 10 3.98z" fill="#EA4335"/></svg>
          {tx('google')}
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-dark-200" /></div>
          <div className="relative flex justify-center text-xs"><span className="px-3 bg-dark text-gray-500">{tx('or')}</span></div>
        </div>

        {/* 폼 */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-xs">{error}</div>}

          {mode === 'signup' && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setUserType('client')} className={`p-3 rounded-lg border text-left ${userType === 'client' ? 'border-mint bg-mint/10' : 'border-dark-200'}`}>
                  <Building size={16} className={userType === 'client' ? 'text-mint' : 'text-gray-400'} />
                  <p className={`text-sm font-medium mt-1 ${userType === 'client' ? 'text-mint' : 'text-white'}`}>{tx('client')}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{tx('clientDesc')}</p>
                </button>
                <button type="button" onClick={() => setUserType('artist')} className={`p-3 rounded-lg border text-left ${userType === 'artist' ? 'border-mint bg-mint/10' : 'border-dark-200'}`}>
                  <User size={16} className={userType === 'artist' ? 'text-mint' : 'text-gray-400'} />
                  <p className={`text-sm font-medium mt-1 ${userType === 'artist' ? 'text-mint' : 'text-white'}`}>{tx('artist')}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{tx('artistDesc')}</p>
                </button>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{tx('name')}</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={tx('namePh')} className="input text-sm" required />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-gray-400 mb-1">{tx('email')}</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={tx('emailPh')} className="input text-sm" required />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">{tx('password')}</label>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder={tx('passwordPh')} className="input text-sm pr-10" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={agreeTerms} onChange={e => setAgreeTerms(e.target.checked)} className="w-4 h-4 rounded" />
              <span className="text-xs text-gray-400">{tx('agree')}</span>
            </label>
          )}

          <button type="submit" disabled={loading} className="w-full btn-primary text-sm disabled:opacity-50">
            {loading ? tx('loadingText') : mode === 'login' ? tx('login') : tx('signup')}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-600">© 2025 BEATFOLIO</p>
      </div>
    </div>
  );
}
