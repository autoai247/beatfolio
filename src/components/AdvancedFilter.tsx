'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { X, ChevronDown, ChevronUp, Search, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterState {
  categories: string[];
  locations: string[];
  genres: string[];
  priceRange: [number, number];
  rating: number;
  experience: string;
  availability: string[];
  instantBooking: boolean;
  verified: boolean;
}

interface AdvancedFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdvancedFilter({ filters, onChange, onReset, isOpen, onToggle }: AdvancedFilterProps) {
  const { t } = useLanguage();
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'location']);

  const categories = [
    { id: 'dj', label: 'DJ', icon: '🎧' },
    { id: 'dancer', label: '댄서', icon: '💃' },
    { id: 'performer', label: '퍼포머', icon: '🎭' },
    { id: 'mc', label: 'MC', icon: '🎤' },
  ];

  const locations = [
    { id: 'seoul', label: '서울' },
    { id: 'busan', label: '부산' },
    { id: 'incheon', label: '인천' },
    { id: 'daegu', label: '대구' },
    { id: 'gwangju', label: '광주' },
    { id: 'daejeon', label: '대전' },
    { id: 'ulsan', label: '울산' },
    { id: 'gyeonggi', label: '경기' },
    { id: 'gangwon', label: '강원' },
    { id: 'jeju', label: '제주' },
    { id: 'overseas', label: '해외' },
  ];

  const genres = [
    'EDM', 'House', 'Techno', 'Hip-Hop', 'R&B', 'K-POP',
    'Pop', 'Latin', 'Jazz', 'Disco', 'Trance', 'Progressive',
    '힙합', '팝핀', '락킹', '브레이킹', '왁킹', '보깅',
    '코레오그래피', '얼반', '하우스', '크럼프',
  ];

  const priceRanges = [
    { label: '$500 이하', min: 0, max: 500 },
    { label: '$500 - $1,000', min: 500, max: 1000 },
    { label: '$1,000 - $2,000', min: 1000, max: 2000 },
    { label: '$2,000 이상', min: 2000, max: 99999 },
  ];

  const availabilityOptions = [
    { id: 'weekday', label: '평일' },
    { id: 'weekend', label: '주말' },
    { id: 'night', label: '밤' },
  ];

  const experienceOptions = [
    { id: 'any', label: '전체' },
    { id: '1-3', label: '1-3년' },
    { id: '3-5', label: '3-5년' },
    { id: '5-10', label: '5-10년' },
    { id: '10+', label: '10년 이상' },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleFilter = (key: keyof FilterState, value: string) => {
    const current = filters[key] as string[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const isExpanded = expandedSections.includes(id);
    return (
      <div className="border-b border-dark-200 last:border-b-0">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between py-4 px-4 text-left"
        >
          <span className="font-medium text-white">{title}</span>
          {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
        </button>
        {isExpanded && (
          <div className="px-4 pb-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  // 모바일 풀스크린 필터
  if (isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-dark">
        <div className="flex flex-col h-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-dark-200">
            <h2 className="text-lg font-semibold text-white">{t('filter')}</h2>
            <button onClick={onToggle} className="p-2 text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          {/* 필터 내용 */}
          <div className="flex-1 overflow-y-auto">
            {/* 카테고리 */}
            <Section id="category" title={t('category')}>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleFilter('categories', cat.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                      filters.categories.includes(cat.id)
                        ? 'border-mint bg-mint/10 text-mint'
                        : 'border-dark-300 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </Section>

            {/* 지역 */}
            <Section id="location" title={t('location')}>
              <div className="flex flex-wrap gap-2">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => toggleFilter('locations', loc.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      filters.locations.includes(loc.id)
                        ? 'bg-mint text-black'
                        : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                    }`}
                  >
                    {loc.label}
                  </button>
                ))}
              </div>
            </Section>

            {/* 장르 */}
            <Section id="genre" title={t('genre')}>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => toggleFilter('genres', genre)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      filters.genres.includes(genre)
                        ? 'bg-mint text-black'
                        : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </Section>

            {/* 가격대 */}
            <Section id="price" title={t('priceRange')}>
              <div className="space-y-2">
                {priceRanges.map((range, idx) => (
                  <button
                    key={idx}
                    onClick={() => onChange({ ...filters, priceRange: [range.min, range.max] })}
                    className={`w-full px-4 py-3 rounded-lg border text-left transition-colors ${
                      filters.priceRange[0] === range.min && filters.priceRange[1] === range.max
                        ? 'border-mint bg-mint/10 text-mint'
                        : 'border-dark-300 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </Section>

            {/* 평점 */}
            <Section id="rating" title={t('rating')}>
              <div className="flex gap-2">
                {[0, 3, 3.5, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => onChange({ ...filters, rating: r })}
                    className={`flex-1 py-2 rounded-lg text-center text-sm transition-colors ${
                      filters.rating === r
                        ? 'bg-mint text-black'
                        : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                    }`}
                  >
                    {r === 0 ? '전체' : `${r}+`}
                  </button>
                ))}
              </div>
            </Section>

            {/* 경력 */}
            <Section id="experience" title={t('experience')}>
              <div className="flex flex-wrap gap-2">
                {experienceOptions.map((exp) => (
                  <button
                    key={exp.id}
                    onClick={() => onChange({ ...filters, experience: exp.id })}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      filters.experience === exp.id
                        ? 'bg-mint text-black'
                        : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                    }`}
                  >
                    {exp.label}
                  </button>
                ))}
              </div>
            </Section>

            {/* 가능 시간 */}
            <Section id="availability" title={t('availability')}>
              <div className="flex gap-2">
                {availabilityOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => toggleFilter('availability', opt.id)}
                    className={`flex-1 py-2 rounded-lg text-center text-sm transition-colors ${
                      filters.availability.includes(opt.id)
                        ? 'bg-mint text-black'
                        : 'bg-dark-200 text-gray-300 hover:bg-dark-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </Section>

            {/* 추가 옵션 */}
            <Section id="options" title="추가 옵션">
              <div className="space-y-3">
                <label className="flex items-center justify-between py-2 cursor-pointer">
                  <span className="text-gray-300">즉시 섭외 가능</span>
                  <div
                    onClick={() => onChange({ ...filters, instantBooking: !filters.instantBooking })}
                    className={`w-11 h-6 rounded-full transition-colors ${
                      filters.instantBooking ? 'bg-mint' : 'bg-dark-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white mt-1 transition-transform ${
                        filters.instantBooking ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </label>
                <label className="flex items-center justify-between py-2 cursor-pointer">
                  <span className="text-gray-300">인증된 아티스트만</span>
                  <div
                    onClick={() => onChange({ ...filters, verified: !filters.verified })}
                    className={`w-11 h-6 rounded-full transition-colors ${
                      filters.verified ? 'bg-mint' : 'bg-dark-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-white mt-1 transition-transform ${
                        filters.verified ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </div>
                </label>
              </div>
            </Section>
          </div>

          {/* 하단 버튼 */}
          <div className="p-4 border-t border-dark-200 flex gap-3 safe-bottom">
            <button
              onClick={onReset}
              className="flex-1 py-3 border border-dark-300 rounded-lg text-gray-300 hover:bg-dark-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              {t('reset')}
            </button>
            <button
              onClick={onToggle}
              className="flex-1 py-3 bg-mint text-black font-semibold rounded-lg hover:bg-mint/90 transition-colors"
            >
              {t('apply')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 필터 버튼 (닫힌 상태)
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2.5 bg-dark-100 border border-dark-200 rounded-lg text-gray-300 hover:border-mint/50 transition-colors"
    >
      <SlidersHorizontal size={18} />
      <span>{t('filter')}</span>
      {(filters.categories.length > 0 || filters.locations.length > 0 || filters.genres.length > 0) && (
        <span className="ml-1 px-1.5 py-0.5 bg-mint text-black text-xs rounded-full font-medium">
          {filters.categories.length + filters.locations.length + filters.genres.length}
        </span>
      )}
    </button>
  );
}
