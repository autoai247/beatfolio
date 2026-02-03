'use client';

import React, { useState } from 'react';
import { Search, Send, User, FileText, MoreVertical } from 'lucide-react';

const conversations = [
  { id: '1', name: '김클라이언트', lastMessage: '네, 그 날짜로 확정하겠습니다.', time: '오후 2:34', unread: 2, online: true },
  { id: '2', name: '박이벤트 (Nike Korea)', lastMessage: '안녕하세요, 2월 행사 관련해서...', time: '어제', unread: 0, online: false },
  { id: '3', name: '이매니저', lastMessage: '장비 리스트 보내드립니다!', time: '어제', unread: 1, online: false },
  { id: '4', name: '최프로모터', lastMessage: '감사합니다! 다음에 또 연락드릴게...', time: '1월 25일', unread: 0, online: false },
];

const messages = [
  { id: '1', type: 'system', content: '컨택 요청이 수락되었습니다', meta: { eventType: '기업 행사', date: '2025.02.15', location: '서울 강남', amount: '250만원' } },
  { id: '2', sender: 'other', content: '안녕하세요! 컨택 수락해주셔서 감사합니다.', time: '오전 10:23' },
  { id: '3', sender: 'other', content: '셋업 시간은 행사 시작 몇 시간 전에 오시면 될까요?', time: '오전 10:24' },
  { id: '4', sender: 'me', content: '안녕하세요! 보통 2시간 전에 도착해서 셋업하는 편이에요.', time: '오전 11:05' },
  { id: '5', sender: 'other', content: '네 알겠습니다! 그럼 오후 4시에 시작이니까 1시쯤 오시면 되겠네요.', time: '오전 11:10' },
  { id: '6', sender: 'me', content: '네 맞습니다! 장비 리스트는 따로 보내드릴까요?', time: '오전 11:12' },
  { id: '7', sender: 'other', content: '아, 그리고 행사 날짜 2월 15로 확정하겠습니다. 계약서는 이메일로 보내드릴게요!', time: '오후 2:34' },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0]);
  const [newMsg, setNewMsg] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen flex">
      {/* 목록 */}
      <div className="w-full md:w-80 lg:w-96 border-r border-dark-200 flex flex-col">
        <div className="p-4 border-b border-dark-200">
          <h1 className="text-xl font-bold text-white mb-4">메시지</h1>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="대화 검색..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-dark-100 border border-dark-200 rounded-lg text-sm text-white" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.filter(c => c.name.includes(search)).map((conv) => (
            <button key={conv.id} onClick={() => setSelected(conv)} className={`w-full flex items-center gap-3 p-4 text-left hover:bg-dark-100 ${selected.id === conv.id ? 'bg-dark-100' : ''}`}>
              <div className="relative">
                <div className="w-12 h-12 bg-dark-200 rounded-full flex items-center justify-center"><User size={20} className="text-gray-500" /></div>
                {conv.online && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between"><p className="font-medium text-white truncate">{conv.name}</p><span className="text-xs text-gray-500">{conv.time}</span></div>
                <div className="flex justify-between mt-1"><p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>{conv.unread > 0 && <span className="px-1.5 bg-mint text-black text-xs font-bold rounded-full">{conv.unread}</span>}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 대화 */}
      <div className="hidden md:flex flex-1 flex-col">
        <div className="flex items-center justify-between p-4 border-b border-dark-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-dark-200 rounded-full flex items-center justify-center"><User size={18} className="text-gray-500" /></div>
            <div><p className="font-medium text-white">{selected.name}</p><p className="text-xs text-green-400">● 온라인</p></div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white"><User size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-white"><FileText size={18} /></button>
            <button className="p-2 text-gray-400 hover:text-white"><MoreVertical size={18} /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            if (msg.type === 'system') return (
              <div key={msg.id} className="flex justify-center">
                <div className="bg-dark-100 border border-dark-200 rounded-lg p-4 max-w-sm text-center">
                  <p className="text-sm text-gray-400 mb-2">📋 {msg.content}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-left">
                    <div><span className="text-gray-500">행사 유형</span><p className="text-white">{msg.meta?.eventType}</p></div>
                    <div><span className="text-gray-500">날짜</span><p className="text-white">{msg.meta?.date}</p></div>
                    <div><span className="text-gray-500">장소</span><p className="text-white">{msg.meta?.location}</p></div>
                    <div><span className="text-gray-500">금액</span><p className="text-mint font-medium">{msg.meta?.amount}</p></div>
                  </div>
                </div>
              </div>
            );
            const isMe = msg.sender === 'me';
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[70%]">
                  <div className={`px-4 py-3 rounded-2xl ${isMe ? 'bg-mint text-black rounded-br-md' : 'bg-dark-100 text-white rounded-bl-md'}`}>
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p className={`text-[10px] text-gray-500 mt-1 ${isMe ? 'text-right' : ''}`}>{msg.time}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-dark-200">
          <div className="flex gap-3">
            <input type="text" placeholder="메시지를 입력하세요..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} className="flex-1 px-4 py-3 bg-dark-100 border border-dark-200 rounded-xl text-white" />
            <button className="p-3 bg-mint text-black rounded-xl"><Send size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
