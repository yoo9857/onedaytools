# OneDay Tools

빠르고 안전한 브라우저 기반 파일 도구 모음입니다. 파일은 가능한 한 서버로 전송하지 않고 사용자의 브라우저에서 처리합니다.

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

프로덕션 실행은 `npm run build` 후 `npm start`를 사용합니다. 빌드 과정에서 Next.js standalone 서버에 정적 파일을 자동으로 복사합니다.

## 환경 변수

`.env.example`을 참고해 `.env.local`을 만듭니다.

- `NEXT_PUBLIC_SITE_URL`: 실제 서비스 주소. 기본값은 `https://tool.onedaytrading.net`
- `NEXT_PUBLIC_ADSENSE_CLIENT`: 애드센스 게시자 ID (`ca-pub-...`)
- `NEXT_PUBLIC_GA_ID`: Google Analytics 측정 ID (`G-...`)

값이 비어 있으면 해당 외부 스크립트는 로드되지 않습니다.

## 주요 경로

- `/`: 도구 홈
- `/jpg-to-png`: JPG → PNG 변환기
- `/about`: 서비스 소개
- `/privacy`: 개인정보처리방침
- `/robots.txt`: 검색 로봇 정책
- `/sitemap.xml`: 검색 사이트맵

## 설계 문서

- `docs/WIREFRAMES.md`: 홈, 도구 페이지, MP3 → MP4 화면 와이어프레임
- `docs/ARCHITECTURE.md`: 다중 도구 폴더 체계와 새 도구 추가 절차
- `docs/HANDOFF.md`: 운영 서버, DNS, 배포, 보안, 후속 작업 인수인계서

## 배포 전 확인

1. 실제 서브도메인에 맞춰 `NEXT_PUBLIC_SITE_URL` 설정
2. 애드센스 게시자 ID와 GA 측정 ID 설정
3. 최상위 도메인의 `ads.txt` 확인
4. Search Console에 URL 접두어 속성과 사이트맵 등록
5. 개인정보처리방침의 운영자 연락처 확정
