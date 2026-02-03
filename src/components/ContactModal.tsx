'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/i18n/LanguageContext';
import { X, Calendar, MapPin, DollarSign, Clock, Building, User, Mail, Phone, FileText, Send } from 'lucide-react';

interface ContactModalProps {
  artistName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ContactFormData) => void;
}

interface ContactFormData {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  locationDetail: string;
  budgetMin: string;
  budgetMax: string;
  requirements: string;
  isIndoor: boolean;
  // 추가 세부 정보
  guestCount: string;
  preferredGenre: string;
  setLength: string;
  equipmentNeeded: boolean;
  rehearsalNeeded: boolean;
  accommodationProvided: boolean;
  staffProvided: boolean;
}

export default function ContactModal({ artistName, isOpen, onClose, onSubmit }: ContactModalProps) {
  const { t, lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    eventName: '',
    eventType: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    locationDetail: '',
    budgetMin: '',
    budgetMax: '',
    requirements: '',
    isIndoor: true,
    guestCount: '',
    preferredGenre: '',
    setLength: '',
    equipmentNeeded: false,
    rehearsalNeeded: false,
    accommodationProvided: false,
    staffProvided: false,
  });

  const eventTypes = [
    { id: 'corporate', label: lang === 'ko' ? '기업 행사' : 'Corporate Event' },
    { id: 'wedding', label: lang === 'ko' ? '웨딩' : 'Wedding' },
    { id: 'club', label: lang === 'ko' ? '클럽' : 'Club' },
    { id: 'festival', label: lang === 'ko' ? '페스티벌' : 'Festival' },
    { id: 'privateparty', label: lang === 'ko' ? '프라이빗 파티' : 'Private Party' },
    { id: 'brandparty', label: lang === 'ko' ? '브랜드 파티' : 'Brand Party' },
    { id: 'concert', label: lang === 'ko' ? '콘서트' : 'Concert' },
    { id: 'other', label: lang === 'ko' ? '기타' : 'Other' },
  ];

  const setLengthOptions = ['30분', '1시간', '1시간 30분', '2시간', '2시간+'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg max-h-[90vh] bg-dark-100 rounded-t-2xl md:rounded-2xl overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-dark-200">
          <div>
            <h2 className="text-lg font-semibold text-white">{artistName}에게 컨택 요청</h2>
            <p className="text-sm text-gray-400">상세히 작성해주시면 아티스트가 빠르게 검토할 수 있습니다.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* 스텝 인디케이터 */}
        <div className="flex px-4 pt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex-1 flex items-center">
              <div className={`w-full h-1 rounded-full ${step >= s ? 'bg-mint' : 'bg-dark-300'}`} />
            </div>
          ))}
        </div>
        <div className="flex justify-between px-4 py-2 text-xs text-gray-500">
          <span>담당자 정보</span>
          <span>행사 정보</span>
          <span>추가 사항</span>
        </div>

        {/* 폼 내용 */}
        <div className="flex-1 overflow-y-auto p-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <User size={14} className="inline mr-1" />
                  담당자명 *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="예: 홍길동"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Building size={14} className="inline mr-1" />
                  회사/단체명 *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="예: Samsung Electronics"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Mail size={14} className="inline mr-1" />
                  이메일 *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@company.com"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Phone size={14} className="inline mr-1" />
                  연락처 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="010-0000-0000"
                  className="input"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">행사명 *</label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="예: 2025 Galaxy Launch Party"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">행사 유형 *</label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="input"
                  required
                >
                  <option value="">선택하세요</option>
                  {eventTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    <Calendar size={14} className="inline mr-1" />
                    행사 날짜 *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">공연 시간 *</label>
                  <input
                    type="time"
                    name="eventTime"
                    value={formData.eventTime}
                    onChange={handleChange}
                    className="input"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 mb-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isIndoor: true }))}
                  className={`flex-1 py-2 rounded-lg text-center text-sm transition-colors ${
                    formData.isIndoor ? 'bg-mint text-black' : 'bg-dark-200 text-gray-300'
                  }`}
                >
                  🏢 실내
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isIndoor: false }))}
                  className={`flex-1 py-2 rounded-lg text-center text-sm transition-colors ${
                    !formData.isIndoor ? 'bg-mint text-black' : 'bg-dark-200 text-gray-300'
                  }`}
                >
                  🌳 야외
                </button>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <MapPin size={14} className="inline mr-1" />
                  행사 장소 *
                </label>
                <input
                  type="text"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  placeholder="예: 서울 강남구 OO빌딩 루프탑"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <DollarSign size={14} className="inline mr-1" />
                  예산 범위 *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <select
                    name="budgetMin"
                    value={formData.budgetMin}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">최소</option>
                    <option value="500">$500</option>
                    <option value="1000">$1,000</option>
                    <option value="1500">$1,500</option>
                    <option value="2000">$2,000</option>
                    <option value="3000">$3,000</option>
                  </select>
                  <select
                    name="budgetMax"
                    value={formData.budgetMax}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">최대</option>
                    <option value="1000">$1,000</option>
                    <option value="1500">$1,500</option>
                    <option value="2000">$2,000</option>
                    <option value="3000">$3,000</option>
                    <option value="5000">$5,000+</option>
                    <option value="negotiable">협의</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">예상 인원</label>
                  <input
                    type="text"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    placeholder="예: 약 300명"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    <Clock size={14} className="inline mr-1" />
                    세트 길이
                  </label>
                  <select
                    name="setLength"
                    value={formData.setLength}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">선택하세요</option>
                    {setLengthOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">선호 음악/공연 장르</label>
                <input
                  type="text"
                  name="preferredGenre"
                  value={formData.preferredGenre}
                  onChange={handleChange}
                  placeholder="예: EDM, 하우스 공주 / 힙합은 확실히 분위기"
                  className="input"
                />
              </div>

              <div className="space-y-3 py-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-300">DJ 장비 필요</span>
                  <input
                    type="checkbox"
                    name="equipmentNeeded"
                    checked={formData.equipmentNeeded}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-dark-300 bg-dark-200 text-mint focus:ring-mint"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-300">리허설 필요</span>
                  <input
                    type="checkbox"
                    name="rehearsalNeeded"
                    checked={formData.rehearsalNeeded}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-dark-300 bg-dark-200 text-mint focus:ring-mint"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-gray-300">숙소 제공</span>
                  <input
                    type="checkbox"
                    name="accommodationProvided"
                    checked={formData.accommodationProvided}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-dark-300 bg-dark-200 text-mint focus:ring-mint"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <FileText size={14} className="inline mr-1" />
                  추가 요청사항
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="특별히 요청하실 내용이 있으면 작성해주세요."
                  rows={4}
                  className="input resize-none"
                />
              </div>

              <div className="p-4 bg-dark-200 rounded-lg">
                <p className="text-xs text-gray-400">
                  ℹ️ 컨택 요청이 전송되면 아티스트가 48시간 이내로 검토 후 응답합니다. 
                  아티스트와 기본 요금에 합의한 뒤 프로필 연락처를 공개받으실 수 있습니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="p-4 border-t border-dark-200 flex gap-3 safe-bottom">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 py-3 border border-dark-300 rounded-lg text-gray-300 hover:bg-dark-200 transition-colors"
            >
              이전
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-3 border border-dark-300 rounded-lg text-gray-300 hover:bg-dark-200 transition-colors"
            >
              취소
            </button>
          )}
          
          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 py-3 bg-mint text-black font-semibold rounded-lg hover:bg-mint/90 transition-colors"
            >
              다음
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-mint text-black font-semibold rounded-lg hover:bg-mint/90 transition-colors flex items-center justify-center gap-2"
            >
              <Send size={18} />
              컨택 요청 보내기
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
