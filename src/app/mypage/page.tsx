'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/lib/auth';
import {
  Eye, Heart, Star, Mail, Calendar, Image, Video,
  User, Settings, Bell, ChevronRight, Share2, LogOut, BarChart3
} from 'lucide-react';

export default function MyPage() {
  const { lang } = useLanguage();
  const { user, signOut } = useAuth();
  const router = useRouter();

  const T: Record<string, Record<string, string>> = {
    hello: { ko:'안녕하세요', en:'Hello', zh:'你好', vi:'Xin chào', th:'สวัสดี' },
    profileViews: { ko:'프로필 조회', en:'Views', zh:'浏览', vi:'Lượt xem', th:'การเข้าชม' },
    contacts: { ko:'컨택', en:'Contacts', zh:'联系', vi:'Liên hệ', th:'ติดต่อ' },
    favorites: { ko:'찜', en:'Saves', zh:'收藏', vi:'Lưu', th:'บันทึก' },
    rating: { ko:'평점', en:'Rating', zh:'评分', vi:'Đánh giá', th:'คะแนน' },
    editProfile: { ko:'프로필 수정', en:'Edit Profile', zh:'编辑资料', vi:'Sửa hồ sơ', th:'แก้ไขโปรไฟล์' },
    photos: { ko:'사진 관리', en:'Photos', zh:'照片', vi:'Ảnh', th:'รูปภาพ' },
    media: { ko:'미디어', en:'Media', zh:'媒体', vi:'Media', th:'สื่อ' },
    schedule: { ko:'일정 관리', en:'Schedule', zh:'日程', vi:'Lịch', th:'ตาราง' },
    stats: { ko:'통계', en:'Stats', zh:'统计', vi:'Thống kê', th:'สถิติ' },
    settings: { ko:'설정', en:'Settings', zh:'设置', vi:'Cài đặt', th:'ตั้งค่า' },
    notifications: { ko:'알림 설정', en:'Notifications', zh:'通知', vi:'Thông báo', th:'แจ้งเตือน' },
    shareProfile: { ko:'프로필 공유', en:'Share Profile', zh:'分享', vi:'Chia sẻ', th:'แชร์' },
    logout: { ko:'로그아웃', en:'Logout', zh:'退出', vi:'Đăng xuất', th:'ออกจากระบบ' },
    recentActivity: { ko:'최근 활동', en:'Recent Activity', zh:'最近活动', vi:'Gần đây', th:'ล่าสุด' },
    loginNeeded: { ko:'로그인이 필요합니다', en:'Please login', zh:'请登录', vi:'Đăng nhập', th:'เข้าสู่ระบบ' },
  };
  const t = (k: string) => T[k]?.[lang] || T[k]?.en || k;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <User size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-lg font-bold text-white mb-4">{t('loginNeeded')}</p>
          <button onClick={() => router.push('/auth')} className="btn-primary">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pb-20">
      {/* 프로필 헤더 */}
      <div className="px-4 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 rounded-full bg-mint/20 flex items-center justify-center">
            <User size={24} className="text-mint" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">{t('hello')}, {user.name} 👋</h1>
            <p className="text-xs text-gray-500">{user.email}</p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-mint/10 text-mint text-[10px] font-bold rounded">
              {user.user_type}
            </span>
          </div>
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-dark-100 rounded-lg p-3 text-center">
            <Eye size={16} className="text-mint mx-auto mb-1" />
            <p className="text-lg font-bold text-white">1.2k</p>
            <p className="text-[10px] text-gray-500">{t('profileViews')}</p>
          </div>
          <div className="bg-dark-100 rounded-lg p-3 text-center">
            <Mail size={16} className="text-cyan mx-auto mb-1" />
            <p className="text-lg font-bold text-white">23</p>
            <p className="text-[10px] text-gray-500">{t('contacts')}</p>
          </div>
          <div className="bg-dark-100 rounded-lg p-3 text-center">
            <Heart size={16} className="text-red-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">89</p>
            <p className="text-[10px] text-gray-500">{t('favorites')}</p>
          </div>
          <div className="bg-dark-100 rounded-lg p-3 text-center">
            <Star size={16} className="text-yellow-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-white">4.9</p>
            <p className="text-[10px] text-gray-500">{t('rating')}</p>
          </div>
        </div>
      </div>

      {/* 메뉴 - 프로필 관리 */}
      <div className="px-4 space-y-2">
        <div className="bg-dark-100 rounded-xl overflow-hidden">
          <Link href="/mypage" className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-200">
            <User size={18} className="text-mint" />
            <span className="flex-1 text-sm text-white">{t('editProfile')}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </Link>
          <Link href="/mypage" className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-200">
            <Image size={18} className="text-cyan" />
            <span className="flex-1 text-sm text-white">{t('photos')}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </Link>
          <Link href="/mypage" className="flex items-center gap-3 px-4 py-3.5">
            <Video size={18} className="text-purple-400" />
            <span className="flex-1 text-sm text-white">{t('media')}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </Link>
        </div>

        {/* 섭외 관리 */}
        <div className="bg-dark-100 rounded-xl overflow-hidden">
          <Link href="/messages" className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-200">
            <Mail size={18} className="text-mint" />
            <span className="flex-1 text-sm text-white">{t('contacts')}</span>
            <span className="px-2 py-0.5 bg-mint text-black text-xs font-bold rounded-full">3</span>
            <ChevronRight size={16} className="text-gray-600" />
          </Link>
          <Link href="/mypage" className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-200">
            <Calendar size={18} className="text-yellow-400" />
            <span className="flex-1 text-sm text-white">{t('schedule')}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </Link>
          <Link href="/mypage" className="flex items-center gap-3 px-4 py-3.5">
            <BarChart3 size={18} className="text-cyan" />
            <span className="flex-1 text-sm text-white">{t('stats')}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </Link>
        </div>

        {/* 설정 */}
        <div className="bg-dark-100 rounded-xl overflow-hidden">
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-200">
            <Settings size={18} className="text-gray-400" />
            <span className="flex-1 text-sm text-gray-300">{t('settings')}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3.5 border-b border-dark-200">
            <Bell size={18} className="text-gray-400" />
            <span className="flex-1 text-sm text-gray-300">{t('notifications')}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </Link>
          <button onClick={() => { if (typeof navigator !== 'undefined' && navigator.share) navigator.share({ url: window.location.href, title: 'BEATFOLIO' }); }} className="w-full flex items-center gap-3 px-4 py-3.5">
            <Share2 size={18} className="text-gray-400" />
            <span className="flex-1 text-sm text-gray-300 text-left">{t('shareProfile')}</span>
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>

        {/* 로그아웃 */}
        <button onClick={() => { signOut(); router.push('/'); }} className="w-full flex items-center gap-3 px-4 py-3.5 bg-dark-100 rounded-xl">
          <LogOut size={18} className="text-red-400" />
          <span className="text-sm text-red-400">{t('logout')}</span>
        </button>
      </div>

      {/* 최근 활동 */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-bold text-white mb-3">{t('recentActivity')}</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 bg-dark-100 rounded-lg">
            <Mail size={16} className="text-mint" />
            <span className="flex-1 text-sm text-gray-300">Samsung 컨택 요청</span>
            <span className="text-xs text-gray-500">10분 전</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-dark-100 rounded-lg">
            <Eye size={16} className="text-cyan" />
            <span className="flex-1 text-sm text-gray-300">프로필 조회 +15</span>
            <span className="text-xs text-gray-500">1시간 전</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-dark-100 rounded-lg">
            <Heart size={16} className="text-red-400" />
            <span className="flex-1 text-sm text-gray-300">Club Arena 찜</span>
            <span className="text-xs text-gray-500">3시간 전</span>
          </div>
        </div>
      </div>
    </div>
  );
}
