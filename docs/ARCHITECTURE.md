# OneDay Tools 아키텍처

## 목표

- 이미지, 오디오·영상, PDF, 금융 계산기를 한 서비스에서 일관되게 제공한다.
- 도구별 인코더와 무거운 라이브러리는 해당 페이지에서만 지연 로딩한다.
- 파일은 가능한 한 브라우저에서 처리하고 서버 업로드 여부를 도구마다 명시한다.
- 도구 추가 시 공통 레이아웃과 검색·SEO·관련 도구 기능을 재사용한다.

## 폴더 체계

```text
src/
├─ app/                         # URL, 메타데이터, 정적 페이지
│  ├─ category/[category]/      # 카테고리 랜딩
│  ├─ jpg-to-png/               # 도구별 SEO 콘텐츠 조합
│  ├─ about/
│  └─ privacy/
├─ components/
│  ├─ catalog/                  # 검색, 필터, 도구 카드
│  ├─ layout/                   # 헤더, 푸터
│  ├─ tool/                     # 도구 페이지 공통 셸
│  └─ ui/                       # 범용 UI
├─ config/
│  └─ tool-catalog.ts           # 도구·카테고리의 단일 정보 원천
├─ features/
│  ├─ image/jpg-to-png/         # 변환 UI와 순수 변환 로직
│  └─ media/mp3-to-mp4/         # FFmpeg 지연 로딩 영역
├─ lib/                         # 사이트 설정과 공용 함수
└─ types/                       # 공용 타입
```

## 새 도구 추가 순서

1. `tool-catalog.ts`에 상태가 `planned`인 도구를 등록한다.
2. `features/<category>/<slug>`에 변환 엔진, 상태, UI를 만든다.
3. `app/<slug>/page.tsx`에서 공통 `ToolPageShell`과 기능 UI를 조합한다.
4. 기능 검증 후 상태를 `live`로 변경한다.
5. 사이트맵에 URL을 추가하고 검색 설명, FAQ, 구조화 데이터를 검증한다.

## 미디어 도구 원칙

MP3 → MP4는 단순 확장자 교체가 아니라 영상 인코딩입니다. 사용자가 MP3와 커버 이미지를 선택하고 해상도·배경·길이를 정한 뒤 MP4를 생성하는 제품으로 설계합니다. FFmpeg WebAssembly 코어는 수십 MB가 될 수 있으므로 홈이나 이미지 도구 번들에 포함하지 않고 `features/media/mp3-to-mp4`에서 동적으로 불러옵니다.

대용량 파일과 저사양 모바일에서는 브라우저 메모리 한계를 사전에 안내하고, 장기적으로는 브라우저 처리와 서버 작업 큐 중 하나를 도구 설정으로 선택할 수 있게 확장합니다.
