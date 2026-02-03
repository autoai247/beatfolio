'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/lib/auth';
import { Search, Heart, Star, MapPin, CheckCircle, Clock, SlidersHorizontal, RotateCcw, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

/* ── 데이터 ── */
const artists = [
  { id:'1',name:'DJ NOVA',cat:'DJ',area:'domestic',loc:'서울',genres:['EDM','하우스'],exp:8,fee:1500,feePublic:true,logo:'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=80',photo:'https://images.unsplash.com/photo-1571266028243-d220c6cce70d?w=400',verified:true,available:true,rating:4.9,reviews:127 },
  { id:'2',name:'HYENA',cat:'댄서',area:'domestic',loc:'서울',genres:['힙합','K-POP'],exp:6,fee:800,feePublic:true,logo:null,photo:'https://images.unsplash.com/photo-1547153760-18fc86324498?w=400',verified:true,available:true,rating:4.8,reviews:56 },
  { id:'3',name:'MOVEMENT',cat:'댄서',area:'domestic',loc:'서울',genres:['팝핀','브레이킹'],exp:8,fee:2000,feePublic:false,logo:'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80',photo:'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',verified:true,available:true,rating:4.9,reviews:89 },
  { id:'4',name:'DJ PULSE',cat:'DJ',area:'domestic',loc:'서울',genres:['힙합','R&B'],exp:6,fee:1000,feePublic:true,logo:null,photo:'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400',verified:true,available:true,rating:4.8,reviews:98 },
  { id:'5',name:'DJ SONIC',cat:'DJ',area:'domestic',loc:'부산',genres:['트랜스'],exp:12,fee:1200,feePublic:true,logo:null,photo:'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400',verified:false,available:true,rating:4.7,reviews:84 },
  { id:'6',name:'LUNA',cat:'댄서',area:'domestic',loc:'서울',genres:['라틴','살사'],exp:6,fee:1500,feePublic:true,logo:'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=80',photo:'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400',verified:true,available:true,rating:5.0,reviews:56 },
  { id:'7',name:'MC FLOW',cat:'MC',area:'domestic',loc:'서울',genres:['파티MC','웨딩MC'],exp:10,fee:700,feePublic:true,logo:null,photo:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',verified:true,available:true,rating:4.8,reviews:145 },
  { id:'8',name:'DJ ALEX',cat:'DJ',area:'overseas',loc:'Tokyo',genres:['EDM','테크노'],exp:10,fee:2500,feePublic:true,logo:'https://images.unsplash.com/photo-1557683316-973673baf926?w=80',photo:'https://images.unsplash.com/photo-1574879948818-1cfbf715447b?w=400',verified:true,available:true,rating:4.9,reviews:203 },
  { id:'9',name:'SAKURA',cat:'댄서',area:'overseas',loc:'Osaka',genres:['K-POP','재즈'],exp:5,fee:1800,feePublic:false,logo:null,photo:'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?w=400',verified:true,available:false,rating:4.7,reviews:67 },
  { id:'10',name:'DJ MIKE',cat:'DJ',area:'overseas',loc:'Bangkok',genres:['EDM','프로그레시브'],exp:8,fee:2000,feePublic:true,logo:null,photo:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',verified:true,available:true,rating:4.8,reviews:156 },
  { id:'11',name:'FIRE SHOW',cat:'퍼포머',area:'domestic',loc:'서울',genres:['파이어쇼','LED쇼'],exp:7,fee:1800,feePublic:true,logo:null,photo:'https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=400',verified:true,available:true,rating:4.9,reviews:78 },
  { id:'12',name:'DJ KHAN',cat:'DJ',area:'overseas',loc:'Ho Chi Minh',genres:['힙합','R&B'],exp:6,fee:1500,feePublic:true,logo:'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=80',photo:'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',verified:false,available:true,rating:4.6,reviews:89 },
];

/* ── 이벤트 유형별 추천 카테고리 ── */
const eventTypes: Record<string, { ko:string; en:string; cats: string[] }> = {
  club: { ko:'클럽/페스티벌', en:'Club/Festival', cats:['DJ'] },
  wedding: { ko:'웨딩', en:'Wedding', cats:['DJ','MC','댄서'] },
  corporate: { ko:'기업행사', en:'Corporate', cats:['DJ','MC','퍼포머'] },
  party: { ko:'파티/생일', en:'Party', cats:['DJ','MC'] },
  show: { ko:'공연/쇼', en:'Show', cats:['댄서','퍼포머'] },
};

/* ── 카테고리별 장르 ── */
const genreMap: Record<string, string[]> = {
  DJ: ['EDM','하우스','힙합','R&B','테크노','트랜스','프로그레시브','딥하우스'],
  '댄서': ['힙합','K-POP','팝핀','브레이킹','라틴','살사','재즈','현대무용','왁킹'],
  '퍼포머': ['파이어쇼','LED쇼','마술','저글링','에어리얼'],
  MC: ['파티MC','웨딩MC','기업MC','페스티벌MC'],
};

export default function HomePage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [area, setArea] = useState('all');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [eventType, setEventType] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilter, setShowFilter] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const T: Record<string,Record<string,string>> = {
    search:{ko:'아티스트, 장르 검색',en:'Search artist, genre',zh:'搜索',vi:'Tìm kiếm',th:'ค้นหา'},
    all:{ko:'전체',en:'All',zh:'全部',vi:'Tất cả',th:'ทั้งหมด'},
    dj:{ko:'DJ',en:'DJ',zh:'DJ',vi:'DJ',th:'DJ'},
    dancer:{ko:'댄서',en:'Dancer',zh:'舞者',vi:'Vũ công',th:'นักเต้น'},
    performer:{ko:'퍼포머',en:'Performer',zh:'表演者',vi:'Biểu diễn',th:'นักแสดง'},
    mc:{ko:'MC',en:'MC',zh:'MC',vi:'MC',th:'MC'},
    domestic:{ko:'🇰🇷 국내',en:'🇰🇷 Korea',zh:'🇰🇷 韩国',vi:'🇰🇷 Hàn Quốc',th:'🇰🇷 เกาหลี'},
    overseas:{ko:'🌏 해외',en:'🌏 Overseas',zh:'🌏 海外',vi:'🌏 Nước ngoài',th:'🌏 ต่างประเทศ'},
    verified:{ko:'인증',en:'Verified',zh:'认证',vi:'Xác minh',th:'ยืนยัน'},
    available:{ko:'섭외가능',en:'Available',zh:'可预约',vi:'Có thể đặt',th:'ว่าง'},
    year:{ko:'년',en:'yr',zh:'年',vi:'năm',th:'ปี'},
    noResults:{ko:'결과 없음',en:'No results',zh:'无结果',vi:'Không có',th:'ไม่พบ'},
    loginRequired:{ko:'로그인이 필요합니다',en:'Login required',zh:'需要登录',vi:'Cần đăng nhập',th:'ต้องเข้าสู่ระบบ'},
    loginMsg:{ko:'이 기능을 사용하려면 로그인하세요',en:'Please login',zh:'请登录',vi:'Vui lòng đăng nhập',th:'กรุณาเข้าสู่ระบบ'},
    cancel:{ko:'취소',en:'Cancel',zh:'取消',vi:'Hủy',th:'ยกเลิก'},
    login:{ko:'로그인',en:'Login',zh:'登录',vi:'Đăng nhập',th:'เข้าสู่ระบบ'},
    filter:{ko:'필터',en:'Filter',zh:'筛选',vi:'Lọc',th:'กรอง'},
    genre:{ko:'장르',en:'Genre',zh:'风格',vi:'Thể loại',th:'แนวเพลง'},
    eventType:{ko:'이벤트 유형',en:'Event Type',zh:'活动类型',vi:'Loại sự kiện',th:'ประเภทงาน'},
    sort:{ko:'정렬',en:'Sort',zh:'排序',vi:'Sắp xếp',th:'เรียง'},
    recommended:{ko:'추천순',en:'Recommended',zh:'推荐',vi:'Đề xuất',th:'แนะนำ'},
    ratingSort:{ko:'평점순',en:'Top Rated',zh:'评分高',vi:'Đánh giá cao',th:'คะแนนสูง'},
    reviewSort:{ko:'리뷰순',en:'Most Reviews',zh:'评论多',vi:'Nhiều đánh giá',th:'รีวิวมาก'},
    priceLow:{ko:'가격↓',en:'Price ↓',zh:'价格低',vi:'Giá ↓',th:'ราคา↓'},
    priceHigh:{ko:'가격↑',en:'Price ↑',zh:'价格高',vi:'Giá ↑',th:'ราคา↑'},
    reset:{ko:'초기화',en:'Reset',zh:'重置',vi:'Đặt lại',th:'รีเซ็ต'},
    feeHidden:{ko:'비공개',en:'Contact',zh:'面议',vi:'Liên hệ',th:'ติดต่อ'},
    onlyAvailable:{ko:'섭외가능만',en:'Available only',zh:'仅可预约',vi:'Chỉ có thể đặt',th:'ว่างเท่านั้น'},
    onlyVerified:{ko:'인증만',en:'Verified only',zh:'仅认证',vi:'Chỉ xác minh',th:'ยืนยันเท่านั้น'},
    count:{ko:'명',en:'',zh:'人',vi:'',th:''},
    apply:{ko:'적용',en:'Apply',zh:'应用',vi:'Áp dụng',th:'ใช้'},
  };
  const t = (k: string) => T[k]?.[lang] || T[k]?.en || k;

  // 카테고리에 따른 장르 목록
  const availableGenres = useMemo(() => {
    if (category === 'all') {
      return [...new Set(Object.values(genreMap).flat())];
    }
    const catName = category === 'dj' ? 'DJ' : category === 'dancer' ? '댄서' : category === 'performer' ? '퍼포머' : 'MC';
    return genreMap[catName] || [];
  }, [category]);

  // 필터링
  const filtered = useMemo(() => {
    let result = [...artists];

    // 이벤트 유형 → 카테고리 자동 필터
    if (eventType && eventTypes[eventType]) {
      result = result.filter(a => eventTypes[eventType].cats.includes(a.cat));
    }

    // 카테고리
    if (category !== 'all' && !eventType) {
      const catName = category === 'dj' ? 'DJ' : category === 'dancer' ? '댄서' : category === 'performer' ? '퍼포머' : 'MC';
      result = result.filter(a => a.cat === catName);
    }

    // 국내/해외
    if (area !== 'all') result = result.filter(a => a.area === area);

    // 장르
    if (selectedGenres.length > 0) result = result.filter(a => a.genres.some(g => selectedGenres.includes(g)));

    // 옵션
    if (onlyAvailable) result = result.filter(a => a.available);
    if (onlyVerified) result = result.filter(a => a.verified);

    // 검색
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.genres.some(g => g.toLowerCase().includes(q)) ||
        a.loc.toLowerCase().includes(q)
      );
    }

    // 정렬
    result.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      if (sortBy === 'priceLow') return a.fee - b.fee;
      if (sortBy === 'priceHigh') return b.fee - a.fee;
      return (b.reviews * b.rating) - (a.reviews * a.rating);
    });

    return result;
  }, [search, category, area, selectedGenres, eventType, onlyAvailable, onlyVerified, sortBy]);

  const activeFilterCount = selectedGenres.length + (eventType ? 1 : 0) + (onlyAvailable ? 1 : 0) + (onlyVerified ? 1 : 0);

  const resetAll = () => {
    setSelectedGenres([]); setEventType(''); setOnlyAvailable(false);
    setOnlyVerified(false); setSortBy('recommended'); setSearch('');
  };

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!user) setShowLogin(true);
  };

  return (
    <div className="min-h-screen bg-dark">
      {/* ── 고정 헤더 ── */}
      <div className="sticky top-14 z-30 bg-dark border-b border-dark-200">
        {/* 검색 */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input type="text" placeholder={t('search')} value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark-100 border border-dark-200 rounded-lg text-white text-sm placeholder-gray-500 focus:border-mint outline-none" />
          </div>
        </div>

        {/* 카테고리 탭 */}
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
          {[
            { id:'all', label:t('all') },
            { id:'dj', label:t('dj') },
            { id:'dancer', label:t('dancer') },
            { id:'performer', label:t('performer') },
            { id:'mc', label:t('mc') },
          ].map(c => (
            <button key={c.id}
              onClick={() => { setCategory(c.id); setSelectedGenres([]); setEventType(''); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${category === c.id ? 'bg-mint text-black' : 'bg-dark-100 text-gray-400'}`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* 국내/해외 + 필터 버튼 */}
        <div className="px-4 pb-3 flex items-center gap-2">
          <div className="flex bg-dark-100 rounded-lg p-0.5 flex-1">
            {[
              { id:'all', label:t('all'), active:'bg-mint text-black' },
              { id:'domestic', label:t('domestic'), active:'bg-cyan text-black' },
              { id:'overseas', label:t('overseas'), active:'bg-yellow-400 text-black' },
            ].map(a => (
              <button key={a.id} onClick={() => setArea(a.id)}
                className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${area === a.id ? a.active : 'text-gray-400'}`}>
                {a.label}
              </button>
            ))}
          </div>
          <button onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${showFilter ? 'bg-mint text-black' : 'bg-dark-100 text-gray-400'}`}>
            <SlidersHorizontal size={14} />
            {t('filter')}
            {activeFilterCount > 0 && (
              <span className="ml-1 w-5 h-5 flex items-center justify-center bg-black/20 rounded-full text-xs">{activeFilterCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* ── 필터 패널 (하단 슬라이드) ── */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowFilter(false)} />
          <div className="relative bg-dark-100 rounded-t-2xl w-full max-h-[80vh] overflow-y-auto" style={{maxWidth:'430px', margin:'0 auto'}}>
            <div className="sticky top-0 bg-dark-100 px-4 pt-4 pb-2 flex items-center justify-between border-b border-dark-200">
              <h3 className="text-lg font-bold text-white">{t('filter')}</h3>
              <button onClick={() => setShowFilter(false)}><X size={24} className="text-gray-400" /></button>
            </div>

            <div className="px-4 py-4 space-y-5">
              {/* 이벤트 유형 - 클라이언트가 가장 먼저 생각하는 것 */}
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">{t('eventType')}</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(eventTypes).map(([key, val]) => (
                    <button key={key} onClick={() => setEventType(eventType === key ? '' : key)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${eventType === key ? 'bg-mint text-black' : 'bg-dark-200 text-gray-400'}`}>
                      {lang === 'ko' ? val.ko : val.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* 장르 - 카테고리별 */}
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">{t('genre')}</p>
                <div className="flex flex-wrap gap-2">
                  {availableGenres.map(g => (
                    <button key={g} onClick={() => setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${selectedGenres.includes(g) ? 'bg-mint text-black' : 'bg-dark-200 text-gray-400'}`}>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* 옵션 */}
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">옵션</p>
                <div className="flex gap-2">
                  <button onClick={() => setOnlyAvailable(!onlyAvailable)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors ${onlyAvailable ? 'bg-cyan text-black' : 'bg-dark-200 text-gray-400'}`}>
                    ✓ {t('onlyAvailable')}
                  </button>
                  <button onClick={() => setOnlyVerified(!onlyVerified)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-colors ${onlyVerified ? 'bg-cyan text-black' : 'bg-dark-200 text-gray-400'}`}>
                    ✓ {t('onlyVerified')}
                  </button>
                </div>
              </div>

              {/* 정렬 */}
              <div>
                <p className="text-xs text-gray-500 mb-2 font-medium">{t('sort')}</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id:'recommended', label:t('recommended') },
                    { id:'rating', label:t('ratingSort') },
                    { id:'reviews', label:t('reviewSort') },
                    { id:'priceLow', label:t('priceLow') },
                    { id:'priceHigh', label:t('priceHigh') },
                  ].map(s => (
                    <button key={s.id} onClick={() => setSortBy(s.id)}
                      className={`px-3 py-1.5 rounded-full text-xs transition-colors ${sortBy === s.id ? 'bg-mint text-black' : 'bg-dark-200 text-gray-400'}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 하단 버튼 */}
            <div className="sticky bottom-0 bg-dark-100 border-t border-dark-200 px-4 py-3 flex gap-3">
              <button onClick={resetAll} className="flex items-center justify-center gap-1 px-4 py-3 bg-dark-200 rounded-lg text-gray-300 text-sm">
                <RotateCcw size={14} /> {t('reset')}
              </button>
              <button onClick={() => setShowFilter(false)} className="flex-1 py-3 bg-mint text-black font-bold rounded-lg text-sm">
                {filtered.length}{t('count')} {t('apply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── 결과 ── */}
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-sm text-gray-500">{filtered.length}{t('count')}</span>
        {activeFilterCount > 0 && (
          <button onClick={resetAll} className="text-xs text-mint flex items-center gap-1">
            <RotateCcw size={12} /> {t('reset')}
          </button>
        )}
      </div>

      {/* ── 리스트 ── */}
      <div className="px-4 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(a => (
              <Link href={`/artist/${a.id}`} key={a.id}>
                <div className="bg-dark-100 rounded-xl overflow-hidden">
                  <div className="relative aspect-[4/5]">
                    <img src={a.photo} alt={a.name} className="w-full h-full object-cover" />
                    {a.logo && (
                      <div className="absolute bottom-2 left-2 w-8 h-8 bg-black/70 rounded-md p-1">
                        <img src={a.logo} alt="" className="w-full h-full object-contain" />
                      </div>
                    )}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {a.verified && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-mint text-black text-[10px] font-bold rounded">
                          <CheckCircle size={10} /> {t('verified')}
                        </span>
                      )}
                      {a.available && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-black/60 text-mint text-[10px] rounded">
                          <Clock size={10} /> {t('available')}
                        </span>
                      )}
                    </div>
                    <span className={`absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold ${
                      a.cat === 'DJ' ? 'bg-mint text-black' :
                      a.cat === '댄서' ? 'bg-cyan text-black' :
                      a.cat === '퍼포머' ? 'bg-purple-400 text-black' :
                      'bg-yellow-400 text-black'
                    }`}>
                      {a.cat === 'DJ' ? t('dj') : a.cat === '댄서' ? t('dancer') : a.cat === '퍼포머' ? t('performer') : t('mc')}
                    </span>
                    <button onClick={handleFav} className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-full">
                      <Heart size={16} className="text-white" />
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-sm truncate">{a.name}</h3>
                      <div className="flex items-center gap-0.5">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-white">{a.rating}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                      <MapPin size={10} /> {a.loc} · {a.exp}{t('year')}
                    </p>
                    <div className="flex gap-1 mt-2">
                      {a.genres.slice(0, 2).map(g => (
                        <span key={g} className="px-1.5 py-0.5 bg-dark-200 rounded text-[10px] text-gray-400">{g}</span>
                      ))}
                    </div>
                    <p className="text-mint font-bold text-sm mt-2">
                      {a.feePublic ? `${formatPrice(a.fee)}~` : t('feeHidden')}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search size={40} className="mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">{t('noResults')}</p>
            <button onClick={resetAll} className="mt-3 text-mint text-sm">{t('reset')}</button>
          </div>
        )}
      </div>

      {/* 로그인 모달 */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowLogin(false)} />
          <div className="relative bg-dark-100 rounded-t-2xl w-full p-6 text-center" style={{maxWidth:'430px', margin:'0 auto'}}>
            <div className="w-14 h-14 bg-mint/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={28} className="text-mint" />
            </div>
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
