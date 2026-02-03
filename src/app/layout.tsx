import type { Metadata, Viewport } from 'next';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { AuthProvider } from '@/lib/auth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'BEATFOLIO - Find Your Perfect Artist',
  description: 'DJ, 댄서, 퍼포머를 한 곳에서. 프로필 확인부터 섭외까지.',
  keywords: 'DJ, 댄서, 퍼포머, MC, 섭외, 이벤트, 파티, 클럽, 웨딩',
  openGraph: {
    title: 'BEATFOLIO - Find Your Perfect Artist',
    description: 'DJ, 댄서, 퍼포머를 한 곳에서. 프로필 확인부터 섭외까지.',
    url: 'https://beatfolio.kr',
    siteName: 'BEATFOLIO',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-[#050505] text-white">
        <LanguageProvider>
          <AuthProvider>
            {/* 모바일 프레임 - 가운데 정렬, 좌우 공백 */}
            <div className="mobile-frame">
              <Header />
              <main className="pt-14 min-h-screen">
                {children}
              </main>
              <Footer />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
