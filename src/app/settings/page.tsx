'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { User, Bell, Shield, Link2, Eye, Trash2, Camera } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({ contact: true, message: true, review: true, marketing: false, email: true });

  const tabs = [
    { id: 'account', label: '계정 정보', icon: User },
    { id: 'notifications', label: '알림 설정', icon: Bell },
    { id: 'security', label: '보안', icon: Shield },
    { id: 'connected', label: '연결된 계정', icon: Link2 },
    { id: 'privacy', label: '개인정보', icon: Eye },
  ];

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button onClick={onChange} className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-mint' : 'bg-dark-300'}`}>
      <div className={`w-4 h-4 bg-white rounded-full transition-transform mt-1 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-6">설정</h1>
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="md:w-60 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${activeTab === tab.id ? 'bg-mint/10 text-mint' : 'text-gray-400 hover:bg-dark-100'}`}>
                  <tab.icon size={18} /><span>{tab.label}</span>
                </button>
              ))}
              <div className="pt-4 mt-4 border-t border-dark-200">
                <Link href="/mypage" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-dark-100 rounded-lg">마이페이지</Link>
              </div>
            </nav>
          </aside>

          <div className="flex-1 space-y-6">
            {activeTab === 'account' && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-6"><User size={20} className="text-mint" /><h2 className="text-lg font-semibold text-white">계정 정보</h2></div>
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-dark-200 rounded-full flex items-center justify-center"><User size={32} className="text-gray-500" /></div>
                    <button className="absolute bottom-0 right-0 p-1.5 bg-mint rounded-full text-black"><Camera size={14} /></button>
                  </div>
                  <div><button className="px-4 py-2 border border-dark-300 rounded-lg text-sm text-gray-300 mr-2">사진 변경</button><button className="px-4 py-2 text-sm text-gray-500">삭제</button></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="block text-sm text-gray-400 mb-2">이름</label><input type="text" defaultValue="DJ NOVA" className="input" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">활동명</label><input type="text" defaultValue="DJ NOVA" className="input" /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">이메일</label><input type="email" defaultValue="djnova@email.com" className="input" disabled /></div>
                  <div><label className="block text-sm text-gray-400 mb-2">전화번호</label><input type="tel" defaultValue="010-1234-5678" className="input" /></div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-6"><Bell size={20} className="text-mint" /><h2 className="text-lg font-semibold text-white">알림 설정</h2></div>
                {Object.entries(notifications).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between py-4 border-b border-dark-200 last:border-0">
                    <div><p className="text-white font-medium">{key === 'contact' ? '컨택 요청 알림' : key === 'message' ? '메시지 알림' : key === 'review' ? '리뷰 알림' : key === 'marketing' ? '마케팅 알림' : '이메일 알림'}</p></div>
                    <Toggle checked={val} onChange={() => setNotifications({ ...notifications, [key]: !val })} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'security' && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-6"><Shield size={20} className="text-mint" /><h2 className="text-lg font-semibold text-white">보안</h2></div>
                <div className="space-y-4">
                  <div><label className="block text-sm text-gray-400 mb-2">현재 비밀번호</label><input type="password" className="input" /></div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div><label className="block text-sm text-gray-400 mb-2">새 비밀번호</label><input type="password" className="input" /></div>
                    <div><label className="block text-sm text-gray-400 mb-2">확인</label><input type="password" className="input" /></div>
                  </div>
                  <button className="px-4 py-2 border border-dark-300 rounded-lg text-gray-300">비밀번호 변경</button>
                </div>
              </div>
            )}

            {activeTab === 'connected' && (
              <div className="card p-6">
                <div className="flex items-center gap-2 mb-6"><Link2 size={20} className="text-mint" /><h2 className="text-lg font-semibold text-white">연결된 계정</h2></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-dark-200 rounded-lg">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold">G</div><div><p className="text-white">Google</p><p className="text-sm text-mint">연결됨</p></div></div>
                    <button className="px-3 py-1 border border-dark-300 text-gray-400 text-sm rounded">연결 해제</button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-dark-200 rounded-lg">
                    <div className="flex items-center gap-3"><div className="w-10 h-10 bg-yellow-400 rounded-lg"></div><div><p className="text-white">카카오</p><p className="text-sm text-gray-500">연결되지 않음</p></div></div>
                    <button className="px-4 py-1.5 bg-mint text-black text-sm rounded font-medium">연결하기</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="card p-6 border-red-500/30">
                <div className="flex items-center gap-2 mb-6"><Trash2 size={20} className="text-red-400" /><h2 className="text-lg font-semibold text-white">위험 영역</h2></div>
                <div className="flex items-center justify-between py-4 border-b border-dark-200">
                  <div><p className="text-white">프로필 비공개</p><p className="text-sm text-gray-500">검색 결과에서 숨깁니다.</p></div>
                  <button className="px-4 py-2 border border-dark-300 rounded-lg text-gray-300">비공개 설정</button>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div><p className="text-white">계정 삭제</p><p className="text-sm text-gray-500">모든 데이터가 삭제됩니다.</p></div>
                  <button className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">계정 삭제</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
