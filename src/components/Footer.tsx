'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark-100 border-t border-dark-200">
      <div className="px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* 회사 */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-mint text-sm transition-colors">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-mint text-sm transition-colors">
                  {t('careers')}
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-mint text-sm transition-colors">
                  {t('press')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 지원 */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-mint text-sm transition-colors">
                  {t('helpCenter')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-mint text-sm transition-colors">
                  {t('contactUs')}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-mint text-sm transition-colors">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* 법적 고지 */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-mint text-sm transition-colors">
                  {t('terms')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-mint text-sm transition-colors">
                  {t('privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* SNS */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('sns')}</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-mint hover:bg-dark-300 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-mint hover:bg-dark-300 transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://pf.kakao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-dark-200 rounded-lg flex items-center justify-center text-gray-400 hover:text-mint hover:bg-dark-300 transition-colors"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              <span className="text-white">BEAT</span>
              <span className="text-mint">FOLIO</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
