'use client';

import React, { useState } from 'react';
import { Bell, Mail, MessageCircle, Star, Settings, Calendar, MapPin } from 'lucide-react';

const notifications = [
  { id: '1', type: 'contact', title: '새로운 컨택 요청', content: 'Samsung Electronics에서 기업 행사 DJ 섭외 요청', date: '2025.02.15', location: '서울 강남', time: '30분 전', isNew: true, isRead: false },
  { id: '2', type: 'message', title: '김클라이언트님의 메시지', content: '네, 그 날짜로 확정하겠습니다.', time: '2시간 전', isNew: false, isRead: false },
  { id: '3', type: 'review', title: '새로운 리뷰 등록', content: '박*영님이 ★★★★★ 5점 리뷰를 남겼습니다.', time: '5시간 전', isNew: false, isRead: false },
  { id: '4', type: 'contact', title: '컨택 요청 수락됨', content: 'Nike Korea 브랜드 파티 섭외 확정', date: '2025.02.20', time: '어제', isNew: false, isRead: true },
  { id: '5', type: 'message', title: '이매니저님의 메시지', content: '장비 리스트 보내드립니다!', time: '어제', isNew: false, isRead: true },
  { id: '6', type: 'system', title: '프로필 업데이트 알림', content: '프로필을 업데이트한 지 30일이 지났습니다.', time: '3일 전', isNew: false, isRead: true },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState(notifications);

  const filters = [
    { id: 'all', label: '전체' },
    { id: 'contact', label: '컨택' },
    { id: 'message', label: '메시지' },
    { id: 'review', label: '리뷰' },
    { id: 'system', label: '시스템' },
  ];

  const filtered = filter === 'all' ? items : items.filter(n => n.type === filter);

  const getIcon = (type: string) => {
    if (type === 'contact') return <Mail size={18} className="text-mint" />;
    if (type === 'message') return <MessageCircle size={18} className="text-cyan" />;
    if (type === 'review') return <Star size={18} className="text-yellow-400" />;
    return <Settings size={18} className="text-gray-400" />;
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">알림</h1>
          <button onClick={() => setItems(items.map(n => ({ ...n, isRead: true })))} className="text-sm text-gray-400 hover:text-white">모두 읽음</button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {filters.map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-2 rounded-full text-sm ${filter === f.id ? 'bg-mint text-black' : 'bg-dark-100 text-gray-400'}`}>
              {f.label}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((item) => (
            <div key={item.id} className={`card p-4 ${!item.isRead ? 'border-mint/30' : ''}`}>
              <div className="flex gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'contact' ? 'bg-mint/10' : item.type === 'message' ? 'bg-cyan/10' : item.type === 'review' ? 'bg-yellow-500/10' : 'bg-dark-200'}`}>
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium text-white">{item.title} {item.isNew && <span className="px-1.5 py-0.5 bg-mint text-black text-[10px] font-bold rounded ml-2">NEW</span>}</p>
                    <span className="text-xs text-gray-500">{item.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{item.content}</p>
                  {item.date && <p className="text-xs text-gray-500 mt-2 flex items-center gap-1"><Calendar size={12} /> {item.date}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
