'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/i18n/LanguageContext';
import { Heart, Star, MapPin, Clock, CheckCircle } from 'lucide-react';
import { formatPrice, getCategoryColor } from '@/lib/utils';
import type { Artist } from '@/lib/supabase';

interface ArtistCardProps {
  artist: Artist;
  viewMode?: 'grid' | 'list';
  onFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export default function ArtistCard({ artist, viewMode = 'grid', onFavorite, isFavorited = false }: ArtistCardProps) {
  const { t } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [favorite, setFavorite] = useState(isFavorited);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    onFavorite?.(artist.id);
  };

  const categoryColor = getCategoryColor(artist.category);
  const mainPhoto = artist.photos?.[0] || 'https://images.unsplash.com/photo-1571266028243-d220c6cce70d?w=400';

  if (viewMode === 'list') {
    return (
      <Link href={`/artist/${artist.id}`}>
        <div className="card flex gap-4 p-4 hover:border-mint/50">
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-dark-200">
            <img
              src={mainPhoto}
              alt={artist.stage_name}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
            <div 
              className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium text-black"
              style={{ backgroundColor: categoryColor }}
            >
              {artist.category}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-white truncate">{artist.stage_name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                  <MapPin size={14} />
                  <span>{artist.location}</span>
                  {artist.is_verified && (
                    <CheckCircle size={14} className="text-mint" />
                  )}
                </div>
              </div>
              <button
                onClick={handleFavorite}
                className={`p-2 rounded-full transition-colors ${
                  favorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
              >
                <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {artist.genres?.slice(0, 3).map((genre) => (
                <span key={genre} className="badge badge-mint text-xs">
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-white">{artist.avg_rating?.toFixed(1) || '0.0'}</span>
                <span className="text-xs text-gray-500">({artist.review_count || 0})</span>
              </div>
              <span className="text-mint font-semibold text-sm">
                {formatPrice(artist.min_fee || 0)}~
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/artist/${artist.id}`}>
      <div className="card group">
        <div className="relative aspect-[4/5] overflow-hidden bg-dark-200">
          <img
            src={mainPhoto}
            alt={artist.stage_name}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-dark-200 animate-pulse" />
          )}

          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span 
              className="px-2.5 py-1 rounded text-xs font-medium text-black"
              style={{ backgroundColor: categoryColor }}
            >
              {artist.category}
            </span>
            {artist.is_available && (
              <span className="px-2.5 py-1 rounded text-xs font-medium bg-cyan text-black flex items-center gap-1">
                <Clock size={12} />
                섭외
              </span>
            )}
          </div>

          <button
            onClick={handleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm transition-colors ${
              favorite ? 'text-red-500' : 'text-white hover:text-red-500'
            }`}
          >
            <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
          </button>

          {artist.is_verified && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-mint/90 text-black rounded text-xs font-medium">
              <CheckCircle size={12} />
              인증
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-white truncate">{artist.stage_name}</h3>
              {artist.agency && (
                <p className="text-xs text-gray-500 mt-0.5">{artist.agency}</p>
              )}
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-white">{artist.avg_rating?.toFixed(1) || '0.0'}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-400 mt-2">
            <span>{artist.location}</span>
            <span>·</span>
            <span>경력 {artist.experience_years || 0}년</span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {artist.genres?.slice(0, 2).map((genre) => (
              <span key={genre} className="px-2 py-0.5 bg-dark-200 rounded text-xs text-gray-300">
                {genre}
              </span>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-dark-200">
            <span className="text-mint font-bold">
              {formatPrice(artist.min_fee || 0)}~
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
