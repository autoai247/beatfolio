'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { Heart, Grid3X3, List, FolderPlus, Star, ChevronDown, Trash2 } from 'lucide-react';
import ArtistCard from '@/components/ArtistCard';

const sampleFavorites = [
  {
    id: '1', user_id: '1', stage_name: 'DJ NOVA', category: 'DJ', location: '서울',
    genres: ['EDM', '하우스'], skills: [], bio: '', experience_years: 8,
    min_fee: 1500, max_fee: 2000, equipment: [],
    photos: ['https://images.unsplash.com/photo-1571266028243-d220c6cce70d?w=500'],
    videos: [], music_links: [], sns: {}, agency: 'BEAT Agency',
    is_verified: true, is_available: true, avg_rating: 4.9, review_count: 127,
    view_count: 1247, favorite_count: 89, created_at: '', updated_at: '',
  },
  {
    id: '4', user_id: '4', stage_name: 'DJ PULSE', category: 'DJ', location: '서울',
    genres: ['힙합', 'R&B'], skills: [], bio: '', experience_years: 6,
    min_fee: 1000, max_fee: 1500, equipment: [],
    photos: ['https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500'],
    videos: [], music_links: [], sns: {}, agency: '프리랜서',
    is_verified: true, is_available: true, avg_rating: 4.8, review_count: 98,
    view_count: 756, favorite_count: 45, created_at: '', updated_at: '',
  },
  {
    id: '6', user_id: '6', stage_name: 'LUNA', category: '댄서', location: '서울',
    genres: ['라틴', '팝핀'], skills: [], bio: '', experience_years: 6,
    min_fee: 1500, max_fee: 2000, equipment: [],
    photos: ['https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=500'],
    videos: [], music_links: [], sns: {}, agency: 'Global Artists',
    is_verified: true, is_available: true, avg_rating: 5.0, review_count: 56,
    view_count: 567, favorite_count: 78, created_at: '', updated_at: '',
  },
  {
    id: '5', user_id: '5', stage_name: 'DJ SONIC', category: 'DJ', location: '부산',
    genres: ['트랜스', '프로그레시브'], skills: [], bio: '', experience_years: 12,
    min_fee: 1200, max_fee: 1800, equipment: [],
    photos: ['https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=500'],
    videos: [], music_links: [], sns: {}, agency: '프리랜서',
    is_verified: false, is_available: true, avg_rating: 4.7, review_count: 84,
    view_count: 623, favorite_count: 38, created_at: '', updated_at: '',
  },
];

export default function FavoritesPage() {
  const { t } = useLanguage();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFolder, setActiveFolder] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const folders = [
    { id: 'all', label: '전체', count: sampleFavorites.length, icon: Heart },
    { id: 'dj', label: 'DJ', count: 3 },
    { id: 'dancer', label: '댄서', count: 1 },
    { id: 'vip', label: 'VIP 후보', count: 2, icon: Star },
  ];

  const filteredFavorites = activeFolder === 'all' 
    ? sampleFavorites
    : sampleFavorites.filter(a => 
        activeFolder === 'dj' ? a.category === 'DJ' :
        activeFolder === 'dancer' ? a.category === '댄서' : true
      );

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{t('favorites')}</h1>
            <p className="text-gray-400 mt-1">찜한 아티스트 {sampleFavorites.length}명</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-dark-300 rounded-lg text-gray-300 hover:bg-dark-200 transition-colors">
            <FolderPlus size={18} />
            <span className="hidden sm:inline">새 폴더</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 사이드바 - 폴더 */}
          <aside className="lg:w-60 flex-shrink-0">
            <div className="card p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">폴더</h3>
              <div className="space-y-1">
                {folders.map((folder) => {
                  const Icon = folder.icon || Heart;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => setActiveFolder(folder.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        activeFolder === folder.id
                          ? 'bg-mint/10 text-mint'
                          : 'text-gray-400 hover:bg-dark-200'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="flex-1 text-left">{folder.label}</span>
                      <span className="text-sm">{folder.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* 메인 콘텐츠 */}
          <div className="flex-1">
            {/* 필터 바 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {['all', 'dj', 'dancer', 'performer', 'mc'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFolder(cat)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                      activeFolder === cat
                        ? 'bg-mint text-black'
                        : 'bg-dark-100 text-gray-400 hover:bg-dark-200'
                    }`}
                  >
                    {cat === 'all' ? '전체' : cat.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-100 border border-dark-200 rounded-lg px-3 py-2 text-sm text-gray-300"
                >
                  <option value="recent">최근 추가순</option>
                  <option value="rating">평점순</option>
                  <option value="price">가격순</option>
                </select>

                <div className="flex bg-dark-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-dark-200 text-white' : 'text-gray-500'}`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-dark-200 text-white' : 'text-gray-500'}`}
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* 아티스트 목록 */}
            {filteredFavorites.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 md:grid-cols-3 gap-4'
                  : 'space-y-4'
              }>
                {filteredFavorites.map((artist) => (
                  <div key={artist.id} className="relative group">
                    <ArtistCard artist={artist} viewMode={viewMode} isFavorited={true} />
                    {viewMode === 'grid' && (
                      <button className="absolute top-3 right-12 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 bg-dark-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart size={32} className="text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{t('noFavorites')}</h3>
                <p className="text-gray-400 mb-6">마음에 드는 아티스트를 찜해보세요.</p>
                <a href="/" className="btn-primary">
                  {t('browseArtists')}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
