'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { Search, Star, Zap, Users, TrendingUp, Sparkles, Shield, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const { lang } = useLanguage();

  const features = [
    { 
      icon: <Search size={24} />, 
      title: lang === 'ko' ? '스마트 검색' : 'Smart Search', 
      desc: lang === 'ko' ? '장르, 가격, 지역별로 딱 맞는 아티스트를 빠르게 찾으세요.' : 'Find the perfect artist by genre, price, and location.' 
    },
    { 
      icon: <Star size={24} />, 
      title: lang === 'ko' ? '검증된 아티스트' : 'Verified Artists', 
      desc: lang === 'ko' ? '실제 리뷰와 포트폴리오로 검증된 프로 아티스트들입니다.' : 'Professional artists verified with real reviews and portfolios.' 
    },
    { 
      icon: <Zap size={24} />, 
      title: lang === 'ko' ? '간편한 섭외' : 'Easy Booking', 
      desc: lang === 'ko' ? '몇 번의 클릭으로 컨택 요청부터 계약까지.' : 'From contact request to contract in just a few clicks.' 
    },
    { 
      icon: <Shield size={24} />, 
      title: lang === 'ko' ? '안전 시스템' : 'Safe System', 
      desc: lang === 'ko' ? '양측 모두를 보호하는 안전한 거래 시스템.' : 'Secure transaction system that protects both parties.' 
    },
    { 
      icon: <TrendingUp size={24} />, 
      title: lang === 'ko' ? '실시간 견적' : 'Real-time Quotes', 
      desc: lang === 'ko' ? '아티스트별 시세를 한눈에 확인하세요.' : 'Check artist rates at a glance.' 
    },
    { 
      icon: <Sparkles size={24} />, 
      title: lang === 'ko' ? '실제 리뷰' : 'Real Reviews', 
      desc: lang === 'ko' ? '실제 행사 후기와 사진으로 만족도를 확인하세요.' : 'Check satisfaction with real event reviews and photos.' 
    },
  ];

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative py-20 md:py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-mint/5 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-mint/10 rounded-full text-mint text-sm mb-6">
            <Sparkles size={16} />
            {lang === 'ko' ? '대한민국 No.1 아티스트 섭외 플랫폼' : 'Korea\'s #1 Artist Booking Platform'}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Find Your</span>
            <br />
            <span className="gradient-text">Perfect Artist</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            {lang === 'ko' 
              ? 'DJ, 댄서, 퍼포머를 한 곳에서. 프로필 확인부터 섭외까지.' 
              : 'DJs, dancers, and performers in one place. From browsing profiles to booking.'}
          </p>

          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            {lang === 'ko' ? '아티스트 찾기' : 'Find Artists'}
            <ArrowRight size={18} />
          </Link>

          {/* 통계 */}
          <div className="flex justify-center gap-8 md:gap-16 mt-16">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-mint">500+</p>
              <p className="text-sm text-gray-500">{lang === 'ko' ? '등록 아티스트' : 'Artists'}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-mint">2,000+</p>
              <p className="text-sm text-gray-500">{lang === 'ko' ? '성사된 섭외' : 'Bookings'}</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-mint">4.9</p>
              <p className="text-sm text-gray-500">{lang === 'ko' ? '평균 평점' : 'Avg Rating'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 왜 BEATFOLIO인가? */}
      <section className="py-20 px-4 bg-dark-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {lang === 'ko' ? '왜 BEATFOLIO인가요?' : 'Why BEATFOLIO?'}
            </h2>
            <p className="text-gray-400">
              {lang === 'ko' ? '검증된 아티스트들, 쉬운 검색 & 섭외' : 'Verified artists, easy search & booking'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((item, idx) => (
              <div key={idx} className="p-6 bg-dark rounded-xl border border-dark-200 hover:border-mint/30 transition-colors">
                <div className="w-12 h-12 bg-mint/10 rounded-lg flex items-center justify-center text-mint mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 이용 방법 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {lang === 'ko' ? '이용 방법' : 'How It Works'}
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { 
                step: '01', 
                title: lang === 'ko' ? '아티스트 검색' : 'Search Artists', 
                desc: lang === 'ko' ? '원하는 조건으로 아티스트를 검색하세요. 장르, 지역, 가격대로 필터링할 수 있습니다.' : 'Search for artists with your desired criteria. Filter by genre, location, and price range.' 
              },
              { 
                step: '02', 
                title: lang === 'ko' ? '프로필 확인' : 'Check Profile', 
                desc: lang === 'ko' ? '포트폴리오, 리뷰, 활동 이력을 확인하고 마음에 드는 아티스트를 찜하세요.' : 'Check portfolios, reviews, and activity history, then save your favorite artists.' 
              },
              { 
                step: '03', 
                title: lang === 'ko' ? '컨택 요청' : 'Contact Request', 
                desc: lang === 'ko' ? '행사 정보를 입력하고 컨택 요청을 보내세요. 아티스트가 48시간 내로 응답합니다.' : 'Enter event details and send a contact request. Artists respond within 48 hours.' 
              },
              { 
                step: '04', 
                title: lang === 'ko' ? '섭외 확정' : 'Confirm Booking', 
                desc: lang === 'ko' ? '조건 협의 후 섭외를 확정하고 성공적인 행사를 진행하세요!' : 'Finalize terms and confirm your booking for a successful event!' 
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-mint text-black font-bold rounded-full flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-mint/10 to-cyan/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang === 'ko' ? '지금 바로 시작하세요' : 'Get Started Now'}
          </h2>
          <p className="text-gray-400 mb-8">
            {lang === 'ko' 
              ? '수백 명의 아티스트와 성공적인 행사를 이뤄낸 고객님들과 함께하세요!' 
              : 'Join hundreds of artists and clients who have had successful events!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              {lang === 'ko' ? '아티스트 찾기' : 'Find Artists'}
            </Link>
            <Link href="/auth" className="btn-secondary">
              {lang === 'ko' ? '무료 가입하기' : 'Sign Up Free'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
