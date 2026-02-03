'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/lib/auth';
import { 
  Search, Heart, MessageCircle, Bell, User, Menu, X, 
  ChevronDown, LogOut, Settings, LayoutDashboard, Globe
} from 'lucide-react';

export default function Header() {
  const { t, lang, setLang } = useLanguage();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: '中文' },
    { code: 'vi', label: 'Tiếng Việt' },
    { code: 'th', label: 'ไทย' }
  ];

  return (
    <header className="fixed top-0 z-50 bg-dark/95 backdrop-blur-md border-b border-dark-200 w-full max-w-[430px] left-1/2 -translate-x-1/2">
      <div className="px-4">
        <div className="flex items-center justify-between h-14">
          {/* 로고 */}
          <Link href="/" className="flex items-center">
            <span className="text-lg font-bold">
              <span className="text-white">BEAT</span>
              <span className="text-mint">FOLIO</span>
            </span>
          </Link>

          {/* 우측 메뉴 */}
          <div className="flex items-center gap-2">
            {/* 언어 선택 */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 text-gray-400 hover:text-white p-2"
              >
                <Globe size={16} />
                <span className="text-xs">{lang.toUpperCase()}</span>
              </button>
              {langMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-32 bg-dark-100 rounded-lg border border-dark-200 shadow-xl z-50 overflow-hidden">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code as any); setLangMenuOpen(false); }}
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-dark-200 ${lang === l.code ? 'text-mint bg-dark-200' : 'text-gray-300'}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {user ? (
              <>
                {/* 알림 */}
                <Link href="/notifications" className="relative p-2 text-gray-400 hover:text-white">
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-mint rounded-full" />
                </Link>

                {/* 유저 메뉴 */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-dark-200"
                  >
                    <div className="w-7 h-7 rounded-full bg-mint/20 flex items-center justify-center">
                      <User size={14} className="text-mint" />
                    </div>
                  </button>

                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 top-full mt-1 w-44 bg-dark-100 rounded-lg border border-dark-200 shadow-xl z-50 overflow-hidden">
                        <div className="px-3 py-2.5 border-b border-dark-200">
                          <p className="text-sm font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                          {user.user_type === 'admin' && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded">ADMIN</span>
                          )}
                        </div>
                        <Link href="/mypage" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-dark-200">
                          <LayoutDashboard size={14} /> {t('mypage')}
                        </Link>
                        {user.user_type === 'admin' && (
                          <Link href="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-dark-200">
                            <Settings size={14} /> Admin
                          </Link>
                        )}
                        <Link href="/favorites" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-dark-200">
                          <Heart size={14} /> {t('favorites')}
                        </Link>
                        <Link href="/messages" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-dark-200">
                          <MessageCircle size={14} /> {t('messages')}
                        </Link>
                        <Link href="/settings" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-dark-200">
                          <Settings size={14} /> {t('settings')}
                        </Link>
                        <button onClick={() => { signOut(); setUserMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-dark-200 border-t border-dark-200">
                          <LogOut size={14} /> {t('logout')}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <Link href="/auth" className="bg-mint text-black font-semibold px-3 py-1.5 rounded-lg text-sm">
                {t('login')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
