
# 📚 RGTBOOK

RGTBOOK은 온라인 서점 관리 웹 애플리케이션으로, 책 목록 조회, 검색, 추가, 수정 및 삭제 기능을 제공합니다.  
**Next.js 14, Supabase, Tailwind CSS, shadcn/ui** 등의 최신 기술을 사용하여 개발되었습니다.

배포링크 : [RGTBOOK](https://euphonious-frangipane-9cca49.netlify.app/)

---

## 🚀 주요 기능

### 🔍 책 검색 및 페이지네이션
- 제목 또는 저자로 필터링 가능
- 한 페이지당 10개의 책을 표시하는 페이지네이션 지원

### 📖 책 상세 조회
- 특정 책을 클릭하여 상세 정보 확인 가능

### ➕ 책 추가
- 제목, 저자, 가격, 재고, 설명, 이미지 업로드 지원
- Supabase Storage를 활용한 이미지 업로드 기능 포함

### ✏️ 책 수정
- 기존 책 정보를 수정하여 업데이트 가능

### ❌ 책 삭제
- 삭제 확인 모달을 활용한 사용자 경험 향상
- 삭제 후 자동 새로고침 및 페이지 이동 처리

---

## 🛠️ 사용 기술 스택

### 📌 프론트엔드
- **Next.js 14.2.5 (App Router 사용)**
- **TypeScript** - 타입 안정성 확보
- **Tailwind CSS** - 빠르고 효율적인 스타일링
- **shadcn/ui** - UI 컴포넌트 활용
- **react-hook-from & Zod** - 폼 상태관리 및 입력값 검증

### 📌 백엔드
- **Supabase** - 데이터베이스 및 스토리지 활용
- **Next.js API Routes** - API 엔드포인트 구현

---

## 🛠️ 초기 데이터 세팅
### 📖 네이버 책 API 활용  
- **초기 목업 데이터는 [네이버 책 API](https://developers.naver.com/docs/serviceapi/search/book/book.md)를 사용하여 생성**했습니다.  
- API에서 가져온 데이터를 Supabase에 저장하여 기본 데이터베이스를 구축했습니다.  
- 이를 통해 **실제 서점 운영에 필요한 데이터 구조를 사전에 검증**하고, 보다 현실적인 테스트 환경을 만들었습니다.  

---

## 🚀 배포 환경

### ✅ 초기 배포: **Vercel**
- 최초에는 Vercel을 이용하여 배포했으나, 한국 도메인 이슈로 인해 Netlify로 변경했습니다.
- 관련 이슈: [Vercel 한국 도메인 문제](https://disquiet.io/@skyudev/makerlog/%ED%95%9C%EA%B5%AD%EC%97%90%EC%84%9C-vercel-app-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%9D%B4%EC%8A%88%EA%B0%80-%EC%83%9D%EA%B2%BC%EB%8B%A4%EA%B3%A0-%ED%95%A9%EB%8B%88%EB%8B%A4)

### ✅ 최종 배포: **Netlify**
- 현재 Netlify에 배포 

---
### API문서
| 엔드포인트 | 메서드 | 설명 |
| --- | --- | --- |
| `/api/books` | `GET` | 책 목록 조회 (페이지네이션 지원) |
| `/api/books/:id` | `GET` | 특정 책 상세 조회 |
| `/api/books` | `POST` | 책 추가 (요청 본문에 제목, 저자, 가격, 재고, 설명 포함) |
| `/api/books/:id` | `PUT` | 책 정보 수정 (수정할 필드만 포함 가능) |
| `/api/books/:id` | `DELETE` | 책 삭제 (삭제 후 자동 새로고침) |

책 삭제
---

### 📌 실행 방법

1️⃣ 환경 변수 설정
.env.local 파일을 프로젝트 루트에 생성하고, 필요한 환경 변수 값은 별도의 문서나 관리자에게 문의하여 확인하세요.

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
2️⃣ 패키지 설치 및 실행
```bash
pnpm install
pnpm dev
브라우저에서 http://localhost:3000 접속
```
---
# 🚀 성능 최적화 (Lighthouse 점수)
RGTBOOK은 웹 성능 최적화를 고려하여 개발되었으며, **Google Lighthouse 테스트 결과 다음과 같은 높은 점수**를 받았습니다.
![스크린샷 2025-02-27 오후 10 37 14](https://github.com/user-attachments/assets/b57c84d6-8ec1-4cc3-9834-1201dbc0b2ee)

| 항목            | 점수  |
|---------------|------|
| **Performance** | 🟢 99 |
| **Accessibility** | 🟢 90 |
| **Best Practices** | 🟠 78 |
| **SEO** | 🟢 100 |

### 📊 주요 성능 지표:
- **First Contentful Paint (FCP):** 0.6s
- **Largest Contentful Paint (LCP):** 0.7s
- **Total Blocking Time (TBT):** 0ms (최적화 완료)
- **Speed Index:** 0.9s
- **Cumulative Layout Shift (CLS):** 0.032 (안정적인 레이아웃 유지)

**→ 빠른 로딩 속도, 높은 SEO 점수, 안정적인 UX를 제공하도록 최적화하였습니다.**  
