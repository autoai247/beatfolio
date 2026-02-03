'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/lib/auth';
import { Star, Heart, Share2, Download, MapPin, CheckCircle, Clock, Instagram, Youtube, Play, Send, ThumbsUp, ChevronLeft, ChevronRight, User, X } from 'lucide-react';
import ContactModal from '@/components/ContactModal';
import { formatPrice } from '@/lib/utils';

// 샘플 데이터
const artistData = {
  id: '1',
  name: 'DJ NOVA',
  category: 'DJ',
  location: '서울',
  exp: 8,
  agency: 'BEAT Agency',
  logo: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100',
  bio: '대한민국을 대표하는 EDM DJ. Ultra Korea, World DJ Festival 등 메이저 페스티벌 출연.',
  genres: ['EDM', '하우스', '테크노'],
  skills: ['퍼포먼스 DJ', '믹싱', '작곡'],
  fee: { min: 1500, max: 2000, public: true },
  equipment: ['CDJ-3000', 'DJM-900NXS2'],
  photos: [
    'https://images.unsplash.com/photo-1571266028243-d220c6cce70d?w=800',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800',
    'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
  ],
  videos: [
    { title: 'Ultra Korea 2023', thumb: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300' },
  ],
  sns: { instagram: '@djnova', youtube: 'DJ NOVA' },
  history: [
    { date: '2023.06', title: 'Ultra Korea' },
    { date: '2022.08', title: 'World DJ Festival' },
  ],
  verified: true,
  available: true,
  rating: 4.9,
  reviews: 127,
};

const reviewsData = [
  { id: '1', user: '김*진', company: 'Samsung', date: '2025.01', rating: 5, text: '완벽한 DJ! 파티가 최고였어요.', helpful: 24 },
  { id: '2', user: '박*영', company: '웨딩', date: '2024.12', rating: 5, text: '결혼식 2부 최고의 분위기!', helpful: 18 },
  { id: '3', user: '이*수', company: '클럽', date: '2024.11', rating: 4, text: '전체적으로 좋은 세트였어요.', helpful: 7 },
];

export default function ArtistDetailPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  
  const [tab, setTab] = useState('info');
  const [photo, setPhoto] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const a = artistData;

  // 다국어
  const T: Record<string, Record<string, string>> = {
    contact: { ko: '컨택하기', en: 'Contact', zh: '联系', vi: 'Liên hệ', th: 'ติดต่อ' },
    save: { ko: '찜', en: 'Save', zh: '收藏', vi: 'Lưu', th: 'บันทึก' },
    share: { ko: '공유', en: 'Share', zh: '分享', vi: 'Chia sẻ', th: 'แชร์' },
    pdf: { ko: 'PDF 저장', en: 'Save PDF', zh: '保存PDF', vi: 'Lưu PDF', th: 'บันทึก PDF' },
    fee: { ko: '출연료', en: 'Fee', zh: '出场费', vi: 'Phí', th: 'ค่าตัว' },
    verified: { ko: '인증', en: 'Verified', zh: '认证', vi: 'Xác minh', th: 'ยืนยัน' },
    available: { ko: '섭외가능', en: 'Available', zh: '可预约', vi: 'Có thể đặt', th: 'ว่าง' },
    info: { ko: '정보', en: 'Info', zh: '信息', vi: 'Thông tin', th: 'ข้อมูล' },
    portfolio: { ko: '포트폴리오', en: 'Portfolio', zh: '作品集', vi: 'Portfolio', th: 'ผลงาน' },
    reviews: { ko: '리뷰', en: 'Reviews', zh: '评价', vi: 'Đánh giá', th: 'รีวิว' },
    about: { ko: '소개', en: 'About', zh: '简介', vi: 'Giới thiệu', th: 'เกี่ยวกับ' },
    genre: { ko: '장르', en: 'Genre', zh: '风格', vi: 'Thể loại', th: 'แนวเพลง' },
    skills: { ko: '스킬', en: 'Skills', zh: '技能', vi: 'Kỹ năng', th: 'ทักษะ' },
    equipment: { ko: '장비', en: 'Equipment', zh: '设备', vi: 'Thiết bị', th: 'อุปกรณ์' },
    history: { ko: '활동이력', en: 'History', zh: '历史', vi: 'Lịch sử', th: 'ประวัติ' },
    writeReview: { ko: '리뷰 작성', en: 'Write Review', zh: '写评价', vi: 'Viết đánh giá', th: 'เขียนรีวิว' },
    helpful: { ko: '도움됨', en: 'Helpful', zh: '有帮助', vi: 'Hữu ích', th: 'มีประโยชน์' },
    year: { ko: '년', en: 'yr', zh: '年', vi: 'năm', th: 'ปี' },
    loginRequired: { ko: '로그인이 필요합니다', en: 'Login required', zh: '需要登录', vi: 'Cần đăng nhập', th: 'ต้องเข้าสู่ระบบ' },
    loginMsg: { ko: '이 기능을 사용하려면 로그인하세요', en: 'Please login', zh: '请登录', vi: 'Vui lòng đăng nhập', th: 'กรุณาเข้าสู่ระบบ' },
    cancel: { ko: '취소', en: 'Cancel', zh: '取消', vi: 'Hủy', th: 'ยกเลิก' },
    login: { ko: '로그인', en: 'Login', zh: '登录', vi: 'Đăng nhập', th: 'เข้าสู่ระบบ' },
    close: { ko: '닫기', en: 'Close', zh: '关闭', vi: 'Đóng', th: 'ปิด' },
    copyLink: { ko: '링크복사', en: 'Copy', zh: '复制', vi: 'Sao chép', th: 'คัดลอก' },
    copied: { ko: '복사됨!', en: 'Copied!', zh: '已复制!', vi: 'Đã sao chép!', th: 'คัดลอกแล้ว!' },
    feeHidden: { ko: '컨택 시 협의', en: 'Contact for price', zh: '面议', vi: 'Liên hệ để biết giá', th: 'ติดต่อสอบถามราคา' },
  };

  const t = (k: string) => T[k]?.[lang] || T[k]?.en || k;

  const requireLogin = (fn: () => void) => { if (!user) { setShowLogin(true); } else { fn(); } };

  // PDF 다운로드 (브라우저 인쇄 기능 활용)
  const downloadPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${a.name} - BEATFOLIO</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: #0a0a0a; color: white; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .logo span { color: #00ff88; }
          .photo { width: 200px; height: 200px; border-radius: 16px; object-fit: cover; margin: 20px auto; display: block; }
          .name { font-size: 28px; font-weight: bold; text-align: center; }
          .badge { display: inline-block; background: #00ff88; color: black; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; margin: 10px 5px; }
          .section { background: #1a1a1a; border-radius: 12px; padding: 20px; margin: 15px 0; }
          .section-title { font-size: 14px; color: #888; margin-bottom: 10px; }
          .section-content { font-size: 16px; }
          .fee { font-size: 24px; color: #00ff88; font-weight: bold; }
          .rating { display: flex; align-items: center; justify-content: center; gap: 5px; margin: 15px 0; }
          .star { color: #facc15; }
          .tags { display: flex; flex-wrap: wrap; gap: 8px; }
          .tag { background: #333; padding: 6px 12px; border-radius: 20px; font-size: 14px; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px; }
          @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">BEAT<span>FOLIO</span></div>
          <p style="color: #888; font-size: 12px;">Artist Profile</p>
        </div>
        
        <img src="${a.photos[0]}" class="photo" />
        
        <div class="name">${a.name}</div>
        <div style="text-align: center;">
          <span class="badge">${a.category}</span>
          ${a.verified ? '<span class="badge">✓ Verified</span>' : ''}
        </div>
        
        <div class="rating">
          <span class="star">★</span>
          <span style="font-size: 20px; font-weight: bold;">${a.rating}</span>
          <span style="color: #888;">(${a.reviews} reviews)</span>
        </div>
        
        <div class="section">
          <div class="section-title">${t('fee')}</div>
          <div class="fee">${a.fee.public ? `${formatPrice(a.fee.min)} ~ ${formatPrice(a.fee.max)}` : t('feeHidden')}</div>
        </div>
        
        <div class="section">
          <div class="section-title">${t('about')}</div>
          <div class="section-content">${a.bio}</div>
        </div>
        
        <div class="section">
          <div class="section-title">${t('genre')}</div>
          <div class="tags">${a.genres.map(g => `<span class="tag">${g}</span>`).join('')}</div>
        </div>
        
        <div class="section">
          <div class="section-title">${t('skills')}</div>
          <div class="tags">${a.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
        </div>
        
        <div class="section">
          <div class="section-title">${t('equipment')}</div>
          <div class="tags">${a.equipment.map(e => `<span class="tag">${e}</span>`).join('')}</div>
        </div>
        
        <div class="section">
          <div class="section-title">SNS</div>
          <div class="section-content">
            ${a.sns.instagram ? `Instagram: ${a.sns.instagram}<br/>` : ''}
            ${a.sns.youtube ? `YouTube: ${a.sns.youtube}` : ''}
          </div>
        </div>
        
        <div class="footer">
          Generated by BEATFOLIO | beatfolio.kr<br/>
          ${new Date().toLocaleDateString()}
        </div>
        
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  // 공유
  const shareTo = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${a.name} - BEATFOLIO`);
    const urls: Record<string, string> = {
      kakao: `https://story.kakao.com/share?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${url}`,
      line: `https://line.me/R/msg/text/?${text}%20${decodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${text}%20${decodeURIComponent(url)}`,
    };
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href);
      alert(t('copied'));
      setShowShare(false);
    } else if (urls[platform]) {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-dark pb-24">
      {/* 메인 사진 */}
      <div className="relative aspect-square">
        <img src={a.photos[photo]} alt={a.name} className="w-full h-full object-cover" />
        
        {/* 로고 */}
        {a.logo && (
          <div className="absolute bottom-3 left-3 w-10 h-10 bg-black/70 rounded-lg p-1">
            <img src={a.logo} alt="" className="w-full h-full object-contain" />
          </div>
        )}

        {/* 인증 */}
        {a.verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-mint text-black rounded text-xs font-bold">
            <CheckCircle size={12} /> {t('verified')}
          </div>
        )}

        {/* 네비게이션 */}
        {a.photos.length > 1 && (
          <>
            <button onClick={() => setPhoto(p => p > 0 ? p - 1 : a.photos.length - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full">
              <ChevronLeft size={24} className="text-white" />
            </button>
            <button onClick={() => setPhoto(p => p < a.photos.length - 1 ? p + 1 : 0)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full">
              <ChevronRight size={24} className="text-white" />
            </button>
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded text-xs text-white">
              {photo + 1}/{a.photos.length}
            </div>
          </>
        )}
      </div>

      {/* 썸네일 */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {a.photos.map((p, i) => (
          <button key={i} onClick={() => setPhoto(i)} className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 ${i === photo ? 'border-mint' : 'border-transparent'}`}>
            <img src={p} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* 기본 정보 */}
      <div className="px-4 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-mint text-black text-xs font-bold rounded">{a.category}</span>
              {a.available && <span className="px-2 py-0.5 bg-cyan text-black text-xs font-bold rounded flex items-center gap-1"><Clock size={10} />{t('available')}</span>}
            </div>
            <h1 className="text-2xl font-bold text-white">{a.name}</h1>
            <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
              <MapPin size={14} /> {a.location} · {a.exp}{t('year')}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-lg font-bold text-white">{a.rating}</span>
            </div>
            <p className="text-xs text-gray-500">{a.reviews} {t('reviews')}</p>
          </div>
        </div>

        {/* 가격 */}
        <div className="mt-4 p-3 bg-dark-100 rounded-lg">
          <p className="text-xs text-gray-400">{t('fee')}</p>
          {a.fee.public ? (
            <p className="text-xl font-bold text-mint">{formatPrice(a.fee.min)} ~ {formatPrice(a.fee.max)}</p>
          ) : (
            <p className="text-lg font-bold text-gray-400">{t('feeHidden')}</p>
          )}
        </div>

        {/* 액션 버튼 */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button onClick={() => requireLogin(() => setShowContact(true))} className="btn-primary flex items-center justify-center gap-2 py-3">
            <Send size={18} /> {t('contact')}
          </button>
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => requireLogin(() => setFavorite(!favorite))} className={`flex flex-col items-center justify-center py-2 rounded-lg border ${favorite ? 'border-red-500 text-red-500' : 'border-dark-300 text-gray-400'}`}>
              <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
            </button>
            <button onClick={() => setShowShare(true)} className="flex flex-col items-center justify-center py-2 rounded-lg border border-dark-300 text-gray-400">
              <Share2 size={18} />
            </button>
            <button onClick={downloadPdf} className="flex flex-col items-center justify-center py-2 rounded-lg border border-dark-300 text-gray-400">
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-dark-200 px-4">
        {['info', 'portfolio', 'reviews'].map(tb => (
          <button key={tb} onClick={() => setTab(tb)} className={`flex-1 py-3 text-sm font-medium border-b-2 ${tab === tb ? 'border-mint text-mint' : 'border-transparent text-gray-500'}`}>
            {tb === 'info' ? t('info') : tb === 'portfolio' ? t('portfolio') : t('reviews')}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      <div className="px-4 py-4">
        {tab === 'info' && (
          <div className="space-y-5">
            <div><p className="text-xs text-gray-500 mb-2">{t('about')}</p><p className="text-sm text-gray-300">{a.bio}</p></div>
            <div><p className="text-xs text-gray-500 mb-2">{t('genre')}</p><div className="flex flex-wrap gap-2">{a.genres.map(g => <span key={g} className="px-3 py-1 bg-mint/10 text-mint rounded-full text-sm">{g}</span>)}</div></div>
            <div><p className="text-xs text-gray-500 mb-2">{t('skills')}</p><div className="flex flex-wrap gap-2">{a.skills.map(s => <span key={s} className="px-3 py-1 bg-dark-200 text-gray-300 rounded-full text-sm">{s}</span>)}</div></div>
            <div><p className="text-xs text-gray-500 mb-2">{t('equipment')}</p><div className="flex flex-wrap gap-2">{a.equipment.map(e => <span key={e} className="px-3 py-1 bg-dark-200 text-gray-300 rounded-full text-sm">{e}</span>)}</div></div>
            <div><p className="text-xs text-gray-500 mb-2">{t('history')}</p><div className="space-y-2">{a.history.map((h, i) => <p key={i} className="text-sm"><span className="text-mint mr-3">{h.date}</span><span className="text-gray-300">{h.title}</span></p>)}</div></div>
            <div><p className="text-xs text-gray-500 mb-2">SNS</p>
              {a.sns.instagram && <a href="#" className="flex items-center gap-3 p-3 bg-dark-100 rounded-lg mb-2"><Instagram size={20} className="text-pink-500" /><span className="text-sm text-gray-300">{a.sns.instagram}</span></a>}
              {a.sns.youtube && <a href="#" className="flex items-center gap-3 p-3 bg-dark-100 rounded-lg"><Youtube size={20} className="text-red-500" /><span className="text-sm text-gray-300">{a.sns.youtube}</span></a>}
            </div>
          </div>
        )}

        {tab === 'portfolio' && (
          <div className="space-y-4">
            {a.videos.map((v, i) => (
              <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-dark-200">
                <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Play size={48} className="text-white" />
                </div>
                <p className="absolute bottom-2 left-2 text-sm text-white">{v.title}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'reviews' && (
          <div className="space-y-4">
            <button onClick={() => requireLogin(() => setShowReview(true))} className="w-full py-3 bg-mint text-black font-bold rounded-lg">✏️ {t('writeReview')}</button>
            <div className="flex items-center gap-4 p-4 bg-dark-100 rounded-lg">
              <div className="text-center">
                <p className="text-3xl font-bold text-mint">{a.rating}</p>
                <div className="flex mt-1">{[1,2,3,4,5].map(i => <Star key={i} size={12} className={i <= Math.floor(a.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />)}</div>
              </div>
              <p className="text-sm text-gray-400">{a.reviews} {t('reviews')}</p>
            </div>
            {reviewsData.map(r => (
              <div key={r.id} className="p-4 bg-dark-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-dark-200 rounded-full flex items-center justify-center"><User size={16} className="text-gray-500" /></div>
                    <div><p className="text-sm text-white">{r.user}</p><p className="text-xs text-gray-500">{r.company} · {r.date}</p></div>
                  </div>
                  <div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="text-sm text-white">{r.rating}</span></div>
                </div>
                <p className="text-sm text-gray-300">{r.text}</p>
                <button className="flex items-center gap-1 mt-3 text-xs text-gray-500"><ThumbsUp size={12} /> {t('helpful')} ({r.helpful})</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 모달들 */}
      <ContactModal artistName={a.name} isOpen={showContact} onClose={() => setShowContact(false)} onSubmit={() => { alert('요청 완료!'); setShowContact(false); }} />

      {showShare && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowShare(false)} />
          <div className="relative bg-dark-100 rounded-t-2xl w-full p-6">
            <h3 className="text-lg font-bold text-white text-center mb-4">{t('share')}</h3>
            <div className="grid grid-cols-5 gap-4">
              {[
                { id: 'kakao', label: 'KakaoTalk', bg: '#FEE500', color: 'black' },
                { id: 'facebook', label: 'Facebook', bg: '#1877F2', color: 'white' },
                { id: 'twitter', label: 'X', bg: '#000', color: 'white' },
                { id: 'line', label: 'LINE', bg: '#00B900', color: 'white' },
                { id: 'whatsapp', label: 'WhatsApp', bg: '#25D366', color: 'white' },
                { id: 'copy', label: t('copyLink'), bg: '#333', color: 'white' },
              ].map(s => (
                <button key={s.id} onClick={() => shareTo(s.id)} className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: s.bg, color: s.color }}>
                    {s.id === 'copy' ? '🔗' : s.label[0]}
                  </div>
                  <span className="text-[10px] text-gray-400">{s.label}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowShare(false)} className="w-full mt-4 py-3 bg-dark-200 rounded-lg text-gray-300">{t('close')}</button>
          </div>
        </div>
      )}

      {showReview && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowReview(false)} />
          <div className="relative bg-dark-100 rounded-t-2xl w-full p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t('writeReview')}</h3>
            <div className="flex gap-2 mb-4">{[1,2,3,4,5].map(i => <button key={i} className="text-2xl">⭐</button>)}</div>
            <textarea className="w-full h-24 p-3 bg-dark-200 border border-dark-300 rounded-lg text-white text-sm resize-none" />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowReview(false)} className="flex-1 py-3 bg-dark-200 rounded-lg text-gray-300">{t('cancel')}</button>
              <button onClick={() => { alert('등록!'); setShowReview(false); }} className="flex-1 py-3 bg-mint text-black font-bold rounded-lg">{t('writeReview')}</button>
            </div>
          </div>
        </div>
      )}

      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowLogin(false)} />
          <div className="relative bg-dark-100 rounded-t-2xl w-full p-6 text-center">
            <div className="w-14 h-14 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4"><Heart size={28} className="text-mint" /></div>
            <h3 className="text-lg font-bold text-white mb-2">{t('loginRequired')}</h3>
            <p className="text-sm text-gray-400 mb-6">{t('loginMsg')}</p>
            <div className="flex gap-3">
              <button onClick={() => setShowLogin(false)} className="flex-1 py-3 bg-dark-200 rounded-lg text-gray-300">{t('cancel')}</button>
              <button onClick={() => router.push('/auth')} className="flex-1 py-3 bg-mint text-black font-bold rounded-lg">{t('login')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
