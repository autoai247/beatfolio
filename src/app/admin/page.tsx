'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/i18n/LanguageContext';
import { useAuth } from '@/lib/auth';
import { Users, Music, MessageCircle, Star, Shield, Eye, Ban, CheckCircle, Search, BarChart3, DollarSign, AlertTriangle, X, ChevronDown } from 'lucide-react';

// 초기 데이터
const initUsers = [
  { id:1, name:'김민수', email:'kim@test.com', type:'client', date:'2025.01.28', status:'active' },
  { id:2, name:'DJ NOVA', email:'nova@test.com', type:'artist', date:'2025.01.27', status:'active' },
  { id:3, name:'박지영', email:'park@test.com', type:'client', date:'2025.01.26', status:'pending' },
  { id:4, name:'HYENA', email:'hyena@test.com', type:'artist', date:'2025.01.25', status:'active' },
  { id:5, name:'이수호', email:'lee@test.com', type:'client', date:'2025.01.24', status:'suspended' },
  { id:6, name:'MC FLOW', email:'flow@test.com', type:'artist', date:'2025.01.23', status:'active' },
  { id:7, name:'최영희', email:'choi@test.com', type:'client', date:'2025.01.22', status:'active' },
];

const initArtists = [
  { id:1, name:'DJ NOVA', cat:'DJ', verified:true, rating:4.9, reviews:127, status:'active' },
  { id:2, name:'HYENA', cat:'댄서', verified:true, rating:4.8, reviews:56, status:'active' },
  { id:3, name:'MOVEMENT', cat:'댄서', verified:false, rating:0, reviews:0, status:'pending' },
  { id:4, name:'DJ PULSE', cat:'DJ', verified:true, rating:4.8, reviews:98, status:'active' },
  { id:5, name:'FIRE SHOW', cat:'퍼포머', verified:false, rating:0, reviews:0, status:'pending' },
  { id:6, name:'MC FLOW', cat:'MC', verified:true, rating:4.8, reviews:145, status:'active' },
];

const initContacts = [
  { id:1, client:'김민수', artist:'DJ NOVA', event:'기업 파티', date:'2025.02.15', status:'pending', budget:'$2,000' },
  { id:2, client:'박지영', artist:'HYENA', event:'웨딩', date:'2025.03.01', status:'confirmed', budget:'$1,500' },
  { id:3, client:'이수호', artist:'MC FLOW', event:'브랜드 파티', date:'2025.02.20', status:'pending', budget:'$800' },
  { id:4, client:'최영희', artist:'DJ PULSE', event:'클럽 이벤트', date:'2025.02.10', status:'cancelled', budget:'$1,200' },
];

const initReports = [
  { id:1, type:'리뷰 신고', target:'DJ SONIC', reporter:'김*수', reason:'허위 리뷰', date:'2025.01.28', status:'pending' },
  { id:2, type:'프로필 신고', target:'MC FLOW', reporter:'박*영', reason:'부적절한 사진', date:'2025.01.27', status:'resolved' },
  { id:3, type:'메시지 신고', target:'이*호', reporter:'DJ NOVA', reason:'스팸 메시지', date:'2025.01.26', status:'pending' },
  { id:4, type:'프로필 신고', target:'MOVEMENT', reporter:'최*희', reason:'허위 정보', date:'2025.01.25', status:'pending' },
];

export default function AdminPage() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('dashboard');
  const [searchQ, setSearchQ] = useState('');
  const [detailModal, setDetailModal] = useState<any>(null);
  const [confirmModal, setConfirmModal] = useState<{type:string,target:any,action:string}|null>(null);

  // 상태 관리
  const [userList, setUserList] = useState(initUsers);
  const [artistList, setArtistList] = useState(initArtists);
  const [contactList, setContactList] = useState(initContacts);
  const [reportList, setReportList] = useState(initReports);

  const T: Record<string,Record<string,string>> = {
    dashboard:{ko:'대시보드',en:'Dashboard',zh:'仪表盘',vi:'Tổng quan',th:'แดชบอร์ด'},
    users:{ko:'회원관리',en:'Users',zh:'用户',vi:'Người dùng',th:'ผู้ใช้'},
    artists:{ko:'아티스트',en:'Artists',zh:'艺术家',vi:'Nghệ sĩ',th:'ศิลปิน'},
    contacts:{ko:'컨택',en:'Contacts',zh:'联系',vi:'Liên hệ',th:'ติดต่อ'},
    reports:{ko:'신고',en:'Reports',zh:'举报',vi:'Báo cáo',th:'รายงาน'},
    totalUsers:{ko:'전체 회원',en:'Total Users',zh:'总用户',vi:'Tổng',th:'ทั้งหมด'},
    totalArtists:{ko:'아티스트',en:'Artists',zh:'艺术家',vi:'Nghệ sĩ',th:'ศิลปิน'},
    revenue:{ko:'매출',en:'Revenue',zh:'收入',vi:'Doanh thu',th:'รายได้'},
    pendingReports:{ko:'미처리',en:'Pending',zh:'待处理',vi:'Chờ',th:'รอ'},
    active:{ko:'활성',en:'Active',zh:'活跃',vi:'Hoạt động',th:'ใช้งาน'},
    pending:{ko:'대기',en:'Pending',zh:'待审',vi:'Chờ',th:'รอ'},
    suspended:{ko:'정지',en:'Suspended',zh:'暂停',vi:'Tạm dừng',th:'ระงับ'},
    confirmed:{ko:'확정',en:'Confirmed',zh:'确认',vi:'Xác nhận',th:'ยืนยัน'},
    cancelled:{ko:'취소됨',en:'Cancelled',zh:'取消',vi:'Đã hủy',th:'ยกเลิก'},
    resolved:{ko:'처리됨',en:'Resolved',zh:'已处理',vi:'Đã xử lý',th:'แก้ไขแล้ว'},
    verify:{ko:'인증하기',en:'Verify',zh:'认证',vi:'Xác minh',th:'ยืนยัน'},
    ban:{ko:'정지하기',en:'Ban',zh:'封禁',vi:'Cấm',th:'แบน'},
    activate:{ko:'활성화',en:'Activate',zh:'激活',vi:'Kích hoạt',th:'เปิดใช้'},
    resolve:{ko:'처리하기',en:'Resolve',zh:'处理',vi:'Xử lý',th:'แก้ไข'},
    confirm:{ko:'확인',en:'Confirm',zh:'确认',vi:'Xác nhận',th:'ยืนยัน'},
    cancel:{ko:'취소',en:'Cancel',zh:'取消',vi:'Hủy',th:'ยกเลิก'},
    confirmMsg:{ko:'정말 실행하시겠습니까?',en:'Are you sure?',zh:'确定吗？',vi:'Bạn chắc chứ?',th:'แน่ใจหรือไม่?'},
    done:{ko:'완료',en:'Done',zh:'完成',vi:'Hoàn tất',th:'เสร็จ'},
    notAdmin:{ko:'관리자 권한이 필요합니다',en:'Admin required',zh:'需要管理员',vi:'Cần quản trị',th:'ต้องเป็นผู้ดูแล'},
    detail:{ko:'상세',en:'Detail',zh:'详情',vi:'Chi tiết',th:'รายละเอียด'},
    close:{ko:'닫기',en:'Close',zh:'关闭',vi:'Đóng',th:'ปิด'},
  };
  const t = (k:string) => T[k]?.[lang] || T[k]?.en || k;

  if (!user || user.user_type !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <Shield size={48} className="mx-auto text-red-400 mb-4"/>
          <p className="text-lg font-bold text-white mb-4">{t('notAdmin')}</p>
          <button onClick={()=>router.push('/auth')} className="btn-primary">Login</button>
        </div>
      </div>
    );
  }

  const sc = (s:string) => s==='active'||s==='confirmed'||s==='resolved' ? 'text-mint bg-mint/10' : s==='pending' ? 'text-yellow-400 bg-yellow-400/10' : 'text-red-400 bg-red-400/10';

  // 액션 핸들러들
  const handleUserAction = (id:number, action:string) => {
    setUserList(prev => prev.map(u => u.id===id ? {...u, status: action==='ban'?'suspended':action==='activate'?'active':u.status} : u));
    setConfirmModal(null);
  };

  const handleArtistAction = (id:number, action:string) => {
    setArtistList(prev => prev.map(a => a.id===id ? {
      ...a,
      verified: action==='verify'?true:a.verified,
      status: action==='ban'?'suspended':action==='activate'?'active':action==='verify'?'active':a.status
    } : a));
    setConfirmModal(null);
  };

  const handleContactAction = (id:number, action:string) => {
    setContactList(prev => prev.map(c => c.id===id ? {...c, status: action==='confirm'?'confirmed':action==='cancel'?'cancelled':c.status} : c));
    setConfirmModal(null);
  };

  const handleReportAction = (id:number, action:string) => {
    setReportList(prev => prev.map(r => r.id===id ? {...r, status: action==='resolve'?'resolved':r.status} : r));
    setConfirmModal(null);
  };

  const pendingReports = reportList.filter(r=>r.status==='pending').length;
  const totalStats = { users:userList.length, artists:artistList.length, contacts:contactList.length, revenue:45600, reports:pendingReports };

  return (
    <div className="min-h-screen bg-dark pb-20">
      <div className="px-4 pt-4 pb-2 flex items-center gap-2">
        <Shield size={20} className="text-red-400"/>
        <h1 className="text-xl font-bold text-white">Admin</h1>
        <span className="text-xs text-gray-500 ml-auto">{user.email}</span>
      </div>

      {/* 탭 */}
      <div className="flex border-b border-dark-200 px-2 overflow-x-auto">
        {['dashboard','users','artists','contacts','reports'].map(tb=>(
          <button key={tb} onClick={()=>setTab(tb)}
            className={`px-3 py-3 text-xs font-medium border-b-2 whitespace-nowrap ${tab===tb?'border-red-400 text-red-400':'border-transparent text-gray-500'}`}>
            {t(tb)} {tb==='reports'&&pendingReports>0?`(${pendingReports})`:''}
          </button>
        ))}
      </div>

      <div className="px-4 py-4">
        {/* 대시보드 */}
        {tab==='dashboard' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                {l:t('totalUsers'),v:totalStats.users,icon:Users,c:'text-mint'},
                {l:t('totalArtists'),v:totalStats.artists,icon:Music,c:'text-cyan'},
                {l:t('contacts'),v:totalStats.contacts,icon:MessageCircle,c:'text-purple-400'},
                {l:t('revenue'),v:`$${totalStats.revenue.toLocaleString()}`,icon:DollarSign,c:'text-mint'},
                {l:t('pendingReports'),v:totalStats.reports,icon:AlertTriangle,c:'text-red-400'},
                {l:'Rating',v:'4.8',icon:Star,c:'text-yellow-400'},
              ].map((s,i)=>(
                <div key={i} className="bg-dark-100 rounded-lg p-3">
                  <s.icon size={16} className={`${s.c} mb-1`}/>
                  <p className="text-lg font-bold text-white">{s.v}</p>
                  <p className="text-[10px] text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 회원관리 */}
        {tab==='users' && (
          <div className="space-y-3">
            <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16}/>
              <input type="text" value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-dark-100 border border-dark-200 rounded-lg text-white text-sm"/></div>
            {userList.filter(u=>!searchQ||u.name.includes(searchQ)||u.email.includes(searchQ)).map(u=>(
              <div key={u.id} className="p-3 bg-dark-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">{u.name}</p>
                    <p className="text-[11px] text-gray-500">{u.email} · {u.date}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${sc(u.status)}`}>{t(u.status)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 bg-dark-200 rounded text-gray-400">{u.type}</span>
                  <div className="flex gap-2">
                    <button onClick={()=>setDetailModal({type:'user',...u})} className="text-[10px] text-white px-2 py-1 bg-dark-200 rounded">{t('detail')}</button>
                    {u.status!=='suspended' ?
                      <button onClick={()=>setConfirmModal({type:'user',target:u,action:'ban'})} className="text-[10px] text-red-400 px-2 py-1 bg-red-400/10 rounded">{t('ban')}</button> :
                      <button onClick={()=>setConfirmModal({type:'user',target:u,action:'activate'})} className="text-[10px] text-mint px-2 py-1 bg-mint/10 rounded">{t('activate')}</button>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 아티스트 관리 */}
        {tab==='artists' && (
          <div className="space-y-3">
            {artistList.map(a=>(
              <div key={a.id} className="p-3 bg-dark-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">{a.name}</p>
                    <span className="text-[10px] px-2 py-0.5 bg-mint text-black rounded font-bold">{a.cat}</span>
                    {a.verified && <CheckCircle size={12} className="text-mint"/>}
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${sc(a.status)}`}>{t(a.status)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">★ {a.rating} · {a.reviews} reviews</span>
                  <div className="flex gap-2">
                    {!a.verified && <button onClick={()=>setConfirmModal({type:'artist',target:a,action:'verify'})} className="text-[10px] text-mint px-2 py-1 bg-mint/10 rounded">{t('verify')}</button>}
                    {a.status!=='suspended' ?
                      <button onClick={()=>setConfirmModal({type:'artist',target:a,action:'ban'})} className="text-[10px] text-red-400 px-2 py-1 bg-red-400/10 rounded">{t('ban')}</button> :
                      <button onClick={()=>setConfirmModal({type:'artist',target:a,action:'activate'})} className="text-[10px] text-mint px-2 py-1 bg-mint/10 rounded">{t('activate')}</button>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 컨택 관리 */}
        {tab==='contacts' && (
          <div className="space-y-3">
            {contactList.map(c=>(
              <div key={c.id} className="p-3 bg-dark-100 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-white">{c.client} → {c.artist}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${sc(c.status)}`}>{t(c.status)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{c.event} · {c.date} · <span className="text-mint">{c.budget}</span></span>
                  {c.status==='pending' && (
                    <div className="flex gap-2">
                      <button onClick={()=>setConfirmModal({type:'contact',target:c,action:'confirm'})} className="text-[10px] text-mint px-2 py-1 bg-mint/10 rounded">{t('confirm')}</button>
                      <button onClick={()=>setConfirmModal({type:'contact',target:c,action:'cancel'})} className="text-[10px] text-red-400 px-2 py-1 bg-red-400/10 rounded">{t('cancel')}</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 신고 관리 */}
        {tab==='reports' && (
          <div className="space-y-3">
            {reportList.map(r=>(
              <div key={r.id} className="p-3 bg-dark-100 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-white">{r.type}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${sc(r.status)}`}>{t(r.status)}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{r.target} · {r.reporter} · {r.date}</p>
                <p className="text-xs text-gray-400 mb-2">💬 {r.reason}</p>
                {r.status==='pending' && (
                  <div className="flex gap-2">
                    <button onClick={()=>setConfirmModal({type:'report',target:r,action:'resolve'})} className="text-[10px] text-mint px-3 py-1.5 bg-mint/10 rounded flex-1 text-center">{t('resolve')}</button>
                    <button onClick={()=>setConfirmModal({type:'report',target:{...r,relatedUser:r.target},action:'ban'})} className="text-[10px] text-red-400 px-3 py-1.5 bg-red-400/10 rounded flex-1 text-center">{t('ban')}</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 확인 모달 */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/70" onClick={()=>setConfirmModal(null)}/>
          <div className="relative bg-dark-100 rounded-t-2xl w-full p-6 text-center">
            <p className="text-white font-bold mb-2">{t('confirmMsg')}</p>
            <p className="text-sm text-gray-400 mb-1">{confirmModal.target.name || confirmModal.target.client || confirmModal.target.target}</p>
            <p className="text-xs text-gray-500 mb-6">Action: {t(confirmModal.action)}</p>
            <div className="flex gap-3">
              <button onClick={()=>setConfirmModal(null)} className="flex-1 py-3 bg-dark-200 rounded-lg text-gray-300">{t('cancel')}</button>
              <button onClick={()=>{
                const id = confirmModal.target.id;
                if (confirmModal.type==='user') handleUserAction(id, confirmModal.action);
                else if (confirmModal.type==='artist') handleArtistAction(id, confirmModal.action);
                else if (confirmModal.type==='contact') handleContactAction(id, confirmModal.action);
                else if (confirmModal.type==='report') { handleReportAction(id, confirmModal.action); }
              }} className={`flex-1 py-3 rounded-lg font-bold ${confirmModal.action==='ban'||confirmModal.action==='cancel'?'bg-red-500 text-white':'bg-mint text-black'}`}>
                {t(confirmModal.action)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 상세 모달 */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/70" onClick={()=>setDetailModal(null)}/>
          <div className="relative bg-dark-100 rounded-t-2xl w-full p-6">
            <h3 className="text-lg font-bold text-white mb-4">{t('detail')}</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(detailModal).filter(([k])=>k!=='type').map(([k,v])=>(
                <div key={k} className="flex justify-between py-2 border-b border-dark-200">
                  <span className="text-gray-500">{k}</span>
                  <span className="text-white">{String(v)}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>setDetailModal(null)} className="w-full mt-4 py-3 bg-dark-200 rounded-lg text-gray-300">{t('close')}</button>
          </div>
        </div>
      )}
    </div>
  );
}
