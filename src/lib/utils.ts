// 가격 포맷팅 (달러)
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

// 날짜 포맷팅
export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (format === 'relative') {
    if (seconds < 60) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;
    if (days < 30) return `${Math.floor(days / 7)}주 전`;
    if (days < 365) return `${Math.floor(days / 30)}개월 전`;
    return `${Math.floor(days / 365)}년 전`;
  }

  if (format === 'long') {
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short'
    });
  }

  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

// 별점 렌더링
export function renderStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return '★'.repeat(fullStars) + (hasHalf ? '☆' : '') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
}

// 카테고리 컬러
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    dj: '#00ff88',
    dancer: '#ff6b6b',
    performer: '#4ecdc4',
    mc: '#ffd93d'
  };
  return colors[category.toLowerCase()] || '#00ff88';
}

// 클래스네임 유틸리티
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// 이미지 URL 처리
export function getImageUrl(url: string | null | undefined, fallback: string = '/placeholder.jpg'): string {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${url}`;
}

// 슬러그 생성
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// 전화번호 포맷팅
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  }
  return phone;
}

// 랜덤 ID 생성
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// 이벤트 타입 라벨
export function getEventTypeLabel(type: string, lang: string = 'ko'): string {
  const labels: Record<string, Record<string, string>> = {
    corporate: { ko: '기업 행사', en: 'Corporate Event' },
    wedding: { ko: '웨딩', en: 'Wedding' },
    club: { ko: '클럽', en: 'Club' },
    festival: { ko: '페스티벌', en: 'Festival' },
    privateparty: { ko: '프라이빗 파티', en: 'Private Party' },
    brandparty: { ko: '브랜드 파티', en: 'Brand Party' },
    concert: { ko: '콘서트', en: 'Concert' },
    other: { ko: '기타', en: 'Other' }
  };
  return labels[type]?.[lang] || type;
}

// 상태 색상
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    accepted: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
    completed: 'bg-blue-500/20 text-blue-400',
    cancelled: 'bg-gray-500/20 text-gray-400'
  };
  return colors[status] || 'bg-gray-500/20 text-gray-400';
}
