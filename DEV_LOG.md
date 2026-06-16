# 개발일지 — piece of cake

> **프로젝트**: piece of cake — 어른들의 취미 한 조각  
> **배포 URL**: https://jiwonoh-omp.github.io/rest06/  
> **기술 스택**: React 19 + Vite 8 · Supabase (Auth / DB / Edge Functions) · GitHub Actions

---

## 2026-06-15 ~ 16

### 1단계 · 프로젝트 초기화 `7840c9f`

- 기존 Vanilla JS + Babel CDN 버전을 **React + Vite ES 모듈** 구조로 전환
- `window.PD` 전역 객체 → `src/data.js` named export로 교체
- 5가지 컬러 테마 (coral / honey / terracotta / berry / apricot) + 다크모드 구현
- 커스텀 케이크 커서, 실타래 Thread SVG 스크롤 애니메이션, 히어로 Blob 시차 효과
- 카테고리 필터 칩, 클래스 카드 그리드, 수강 신청 모달 구현
- GitHub Actions 자동 배포 (`gh-pages` 브랜치)

**주요 컴포넌트 구조**

```
src/
├── App.jsx          # 전체 페이지 컴포넌트 (Nav ~ Footer, Modal)
├── data.js          # 클래스·강사·리뷰·플랜 정적 데이터
├── styles.css       # 글로벌 스타일 + 케이크 커서
├── components.css   # 섹션별 컴포넌트 스타일
└── themes/          # honey / terracotta / berry / apricot / dark
```

---

### 2단계 · Supabase 인증 통합 `c13494b`

**목표**: Google / Kakao OAuth 로그인 + 수강 신청 데이터 저장

#### 추가 파일

| 파일 | 역할 |
|------|------|
| `src/lib/supabase.js` | Supabase 클라이언트 초기화 (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) |
| `src/contexts/AuthContext.jsx` | 로그인 상태 전역 관리, `signInWithGoogle` / `signInWithKakao` / `signOut` |
| `src/components/AuthModal.jsx` | 로그인 팝업 — 구글·카카오 OAuth 버튼 |
| `src/components/UserMenu.jsx` | Nav 우측 — 비로그인 시 "로그인" 버튼, 로그인 시 아바타 + 드롭다운 |
| `src/auth.css` | 인증 UI 스타일 |
| `supabase/schema.sql` | `profiles` · `enrollments` 테이블 + RLS 정책 |

#### DB 스키마

```sql
-- 사용자 프로필 (auth.users 와 1:1)
public.profiles (id, display_name, avatar_url, created_at)

-- 수강 신청 내역
public.enrollments (id, user_id, class_id, enrolled_at)
-- UNIQUE(user_id, class_id) → 중복 신청 방지
```

#### 인증 흐름

```
사용자 클릭 → AuthModal → supabase.auth.signInWithOAuth({ provider })
→ OAuth 리다이렉트 → Supabase 세션 복원 → AuthContext 상태 업데이트
```

- **리다이렉트 URL**: `${window.location.origin}${import.meta.env.BASE_URL}` (로컬·GitHub Pages 모두 대응)
- **수강 신청**: 비로그인 시 AuthModal 유도 → 로그인 후 `enrollments` upsert
- **GitHub Secrets**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 등록 → Actions 빌드 시 주입

---

### 3단계 · Solar AI 채팅 위젯 `5bc0ea2`

**목표**: 우하단 플로팅 채팅 버튼 — Supabase Edge Function + Solar API 연동

#### 아키텍처

```
클라이언트                     서버(Supabase Edge Function)
────────────────              ──────────────────────────────
ChatWidget.jsx
  └─ supabase.functions       supabase/functions/chat/index.ts
       .invoke('chat')   →      Deno.env.get('SOLAR_API_KEY')
                          →      https://api.upstage.ai/v1/chat/completions
                          ←      { reply: "..." }
```

- **API 키 보안**: `SOLAR_API_KEY`는 Supabase Edge Function 시크릿에만 저장 → 클라이언트에 미노출
- **모델**: `solar-pro` (Upstage)
- **시스템 프롬프트**: piece of cake 클래스 상담 특화 (베이킹·드로잉·뜨개·쿠킹·플라워, 요금제 안내)
- **UI**: 케이크 봇 아이콘, 타이핑 애니메이션(점 3개), Enter 전송, 다크모드 대응

---

### 4단계 · 채팅 위젯 UX 개선 `c5e0379`

- **풍선 도움말 상시 노출**: 채팅 닫힌 상태에서 지연·닫기 없이 항상 표시
  - 메시지: *"💬 AI 학습 도우미 — 특강 일정·n8n·AI 영상 등 궁금한 건 여기서 물어보세요!"*
  - 하단 CTA: *채팅 시작 ↗*
- **float 애니메이션**: 풍선 도움말 + FAB를 `.chat-cluster`로 묶어 `floatSoft(±10px, 4s)` 함께 적용
  - 떠 있는 중에도 화살표가 항상 버튼을 정확히 가리킴
  - 팝업 열리면 `is-open` 클래스로 float 정지

---

### 5단계 · 커서 디테일 수정 `fbf2a2d`

- 케이크 커서 크기 **46px → 60px** (약 1.3배 확대)
- 클릭 시 튕기는 효과 제거 — `.press` scale 제거, transition 정리

---

## 설정 체크리스트

### Supabase 대시보드
- [x] `supabase/schema.sql` SQL Editor 실행
- [x] Authentication → Providers → Google 활성화
- [ ] Authentication → Providers → Kakao 활성화 *(Kakao Developers 앱 등록 필요)*
- [x] Authentication → Redirect URLs → `https://jiwonoh-omp.github.io/rest06/` 추가
- [x] Edge Function `chat` 배포 + `SOLAR_API_KEY` 시크릿 등록

### GitHub Secrets (`Settings → Secrets → Actions`)
- [x] `VITE_SUPABASE_URL`
- [x] `VITE_SUPABASE_ANON_KEY`

### 로컬 개발
```bash
# .env.local 생성
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...

npm install
npm run dev   # http://localhost:5173/rest06/
```
