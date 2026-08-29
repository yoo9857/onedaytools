# OneDay Tools 작업 인수인계서

작성 기준일: 2026-08-29 (Asia/Seoul)

## 1. 현재 상태

OneDay Tools의 기본 플랫폼, 첫 번째 실제 변환기, 운영 서버와 HTTPS 배포까지 완료되어 있습니다.

| 구분 | 값 |
| --- | --- |
| GitHub | `https://github.com/yoo9857/onedaytools` |
| 로컬 작업 폴더 | `C:\onedaytools` |
| 운영 URL | `https://tool.onedaytrading.net` |
| 첫 도구 | `https://tool.onedaytrading.net/jpg-to-png` |
| 운영 서버 | `104.64.142.223` |
| 기존 메인 서버 | `onedaytrading.net` → `172.233.72.19` |
| OS | Ubuntu 24.04.4 LTS |
| Node.js | 22.22.2 |
| Nginx | 1.24.0 |
| 앱 내부 포트 | `127.0.0.1:3200` |

운영 URL의 HTTP→HTTPS 리다이렉트, 홈, JPG→PNG 페이지, 보안 헤더를 외부에서 확인했습니다. 기존 `onedaytrading.net`도 별도 서버에서 정상 응답하므로 두 서비스는 충돌하지 않습니다.

## 2. 완료된 기능

- Next.js 16 App Router, React 19, TypeScript 기반 독립 프로젝트
- 이미지·오디오/영상·문서/PDF·금융 계산기 카테고리
- 이름·설명·키워드 기반 도구 검색과 카테고리 필터
- 도구 상태(`live`, `building`, `planned`)와 로컬 처리 여부 표시
- 카테고리별 정적 랜딩 페이지
- 공통 도구 페이지 셸, 관련 도구, FAQ, 구조화 데이터
- JPG/JPEG 최대 10개 일괄 PNG 변환
- 파일당 최대 30MB 검증, 개별 다운로드, ZIP 일괄 다운로드
- 파일을 서버에 올리지 않는 브라우저 내부 처리
- 소개, 개인정보처리방침, robots.txt, sitemap.xml, manifest
- 애드센스와 GA 환경 변수 기반 선택적 로딩 구조
- standalone 프로덕션 빌드와 정적 파일 복사 자동화
- 반응형 홈·도구·카테고리 레이아웃

## 3. 저장소 구조

```text
src/
├─ app/                         # URL과 SEO 메타데이터
│  ├─ category/[category]/      # 카테고리 랜딩
│  └─ jpg-to-png/               # 도구별 설명·FAQ 조합
├─ components/
│  ├─ catalog/                  # 도구 검색·필터·카드
│  ├─ layout/                   # 헤더·푸터
│  └─ tool/                     # 공통 도구 페이지 구성
├─ config/tool-catalog.ts       # 모든 도구의 단일 등록부
├─ features/
│  ├─ image/jpg-to-png/         # UI, 검증, 변환 엔진
│  └─ media/mp3-to-mp4/         # 향후 미디어 인코더 슬롯
├─ lib/                         # 사이트 공통 설정
└─ types/                       # 도구·카테고리 타입

deploy/
├─ nginx/                       # 최초 HTTP Nginx 구성
├─ ssh/                         # 공개키 전용 SSH 정책
├─ systemd/                     # 앱 서비스 정의
└─ onedaytools.env.example      # 운영 런타임 변수 예시
```

세부 설계는 `docs/ARCHITECTURE.md`, 화면 구조는 `docs/WIREFRAMES.md`를 참고합니다.

## 4. 운영 서버 구조

```text
/opt/onedaytools/releases/20260829-initial  # 현재 릴리스
/opt/onedaytools/current                    # 현재 릴리스 심볼릭 링크
/etc/onedaytools.env                        # 런타임 환경 변수, 권한 600
/etc/systemd/system/onedaytools.service     # 앱 서비스
/etc/nginx/sites-available/tool.onedaytrading.net
/etc/letsencrypt/live/tool.onedaytrading.net/
```

서비스 계정은 로그인할 수 없는 `onedaytools` 시스템 사용자입니다. 앱은 외부에 포트를 열지 않고 `127.0.0.1:3200`에서만 실행되며 Nginx가 80/443 요청을 전달합니다.

### 자주 쓰는 운영 명령

```bash
systemctl status onedaytools
systemctl restart onedaytools
journalctl -u onedaytools -n 100 --no-pager

nginx -t
systemctl reload nginx
tail -n 100 /var/log/nginx/onedaytools.error.log

certbot certificates
systemctl status certbot.timer
```

SSH는 공개키 인증만 허용합니다. 로컬의 전용 키를 사용하는 접속 예시는 다음과 같습니다.

```powershell
ssh -i C:\Users\hanbi\.ssh\oneday_trading_rsa root@104.64.142.223
```

비밀번호를 저장소, 문서, 명령행 인자에 기록하지 않습니다.

## 5. DNS와 HTTPS

필수 DNS 레코드는 하나입니다.

```text
Type: A
Hostname: tool.onedaytrading.net
Value: 104.64.142.223
TTL: Default
```

현재 이 레코드는 전파되어 운영 중입니다. Linode DNS 영역에 추가한 `www` 레코드는 `www.tool.onedaytrading.net`을 뜻하므로 사용하지 않을 경우 삭제합니다. 기존 루트 도메인과 `www.onedaytrading.net` 레코드는 변경하지 않습니다.

Let's Encrypt 인증서는 Certbot Nginx 플러그인으로 발급되었고 만료 예정일은 2026-11-27입니다. `certbot.timer`가 활성화되어 자동 갱신되며 `certbot renew --dry-run --no-random-sleep-on-renew` 모의 갱신도 통과했습니다. Nginx의 현재 운영 파일은 Certbot이 HTTPS 설정을 추가한 상태이므로 평상시 앱 배포에서는 `deploy/nginx`의 최초 설치용 파일을 덮어쓰지 않습니다.

## 6. 새 도구 개발 절차

1. `src/config/tool-catalog.ts`에 도구를 `planned` 상태로 등록합니다.
2. `src/features/<category>/<slug>/`에 UI와 변환 엔진을 구현합니다.
3. 파일 형식·크기·개수·메모리 한계를 별도 검증 모듈에 둡니다.
4. `src/app/<slug>/page.tsx`에서 `ToolPageShell`과 기능 UI를 조합합니다.
5. 제목·설명·canonical·FAQ·WebApplication 구조화 데이터를 추가합니다.
6. 실제 기능과 모바일 검증 후 상태를 `live`로 바꿉니다.
7. `src/app/sitemap.ts`에 실제 공개 URL만 추가합니다.

## 7. MP3 → MP4 구현 지시

MP3 → MP4는 확장자 변경이 아니라 오디오와 정지 이미지를 영상으로 인코딩하는 기능으로 구현합니다.

필수 사용자 흐름:

1. MP3 파일 선택
2. 커버 이미지 선택 또는 단색 배경 선택
3. 화면비(16:9, 1:1, 9:16)와 해상도 선택
4. 제목·배경 미리보기
5. 인코딩 진행률과 취소
6. MP4 미리보기와 다운로드

FFmpeg WebAssembly 코어는 크기가 크므로 반드시 해당 도구 페이지에서만 동적으로 불러옵니다. 홈·이미지 변환기 번들에 포함하지 않습니다. 인코딩은 Web Worker에서 실행해 UI가 멈추지 않게 하고, 모바일 메모리 부족과 장시간 음원 제한을 사전에 안내합니다. 기본 구조는 `src/features/media/mp3-to-mp4/README.md`에 정의되어 있습니다.

## 8. 애드센스·분석 적용 전 확인

운영 환경에서 아래 빌드 타임 환경 변수를 설정한 뒤 새로 빌드해야 합니다.

```text
NEXT_PUBLIC_SITE_URL=https://tool.onedaytrading.net
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-...
NEXT_PUBLIC_GA_ID=G-...
```

- 최상위 `onedaytrading.net/ads.txt`의 게시자 ID를 확인합니다.
- 광고는 파일 선택·변환·다운로드 버튼과 충분히 떨어뜨립니다.
- 개인정보처리방침의 운영 이메일 `contact@onedaytrading.net`이 실제 수신 가능한지 확인하고 필요하면 수정합니다.
- EU/영국/스위스 사용자를 받을 경우 Google 인증 CMP를 구성합니다.

## 9. 다음 작업 우선순위

1. 실제 모바일 기기에서 JPG 다중 선택·ZIP 다운로드 점검
2. 이미지 용량 줄이기 구현 후 `building` → `live`
3. WebP↔JPG/PNG 및 HEIC→JPG 추가
4. PDF 합치기·분할·용량 줄이기 추가
5. MP3→MP4 기능 구현
6. 애드센스·GA 환경 변수 적용 및 광고 배치 검수
7. Search Console에 `https://tool.onedaytrading.net/` URL 접두어 속성과 사이트맵 등록
8. Naver Search Advisor 및 Bing Webmaster Tools 등록

## 10. 검증과 배포

로컬 검증:

```powershell
npm ci
npm run lint
npm run typecheck
npm run build
```

현재 검증 결과는 모두 통과했습니다. 운영 배포는 새 릴리스 디렉터리에서 `npm ci`, `npm run build` 후 `current` 심볼릭 링크를 교체하고 `onedaytools.service`만 재시작하는 방식입니다.

롤백은 이전 릴리스로 링크를 되돌리는 방식입니다.

```bash
ln -sfn /opt/onedaytools/releases/<previous-release> /opt/onedaytools/current
systemctl restart onedaytools
```

링크 교체 전 대상 경로가 `/opt/onedaytools/releases/` 아래의 검증된 릴리스인지 반드시 확인합니다.
