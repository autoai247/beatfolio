# BEATFOLIO V2

DJ, 댄서, 퍼포머 매칭 플랫폼 - 모바일 최적화 완전판

## 기술 스택

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database, Storage)
- **Icons**: Lucide React

## 주요 기능

### 사용자 기능
- 🔍 아티스트 검색 & 고급 필터 (카테고리, 지역, 장르, 가격대, 평점, 경력 등)
- ❤️ 찜하기 & 폴더 관리
- 📝 리뷰 시스템 (별점, 사진, 아티스트 답변)
- 💬 실시간 메시징
- 🔔 알림 시스템
- 🌐 다국어 지원 (한/영/중/베/태)

### 아티스트 기능
- 📊 대시보드 & 통계
- 👤 프로필 관리 (사진, 영상, 음악, SNS)
- 📅 일정 관리
- 📧 컨택 요청 관리 (수락/거절)
- 📄 PDF 프로필 생성

### 클라이언트 기능
- 📤 컨택 요청 (3단계 상세 폼)
- 📋 보낸 요청 관리

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일에 Supabase 키 입력

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

## 환경변수

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://beatfolio.kr
```

## Supabase 설정

1. Supabase 프로젝트 생성
2. Auth 설정: Google, Kakao OAuth 활성화
3. Database: 아래 테이블 생성
   - users
   - artists
   - reviews
   - contact_requests
   - messages
   - conversations
   - notifications
   - favorites

## 페이지 구조

```
/                   - 메인 (랜딩 + 검색)
/artist/[id]        - 아티스트 상세
/auth               - 로그인/회원가입
/mypage             - 마이페이지 (대시보드)
/favorites          - 찜 목록
/messages           - 메시지
/notifications      - 알림
/settings           - 설정
```

## 디자인 시스템

- **Primary Color**: #00ff88 (Mint)
- **Secondary Color**: #00d4ff (Cyan)
- **Background**: #0a0a0a (Dark)
- **Font**: Pretendard

## 라이선스

© 2025 BEATFOLIO. All rights reserved.
