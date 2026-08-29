# MP3 → MP4 기능 슬롯

이 폴더에는 향후 MP3와 커버 이미지를 하나의 MP4 영상으로 만드는 기능을 구현합니다.

예정 모듈:

```text
mp3-to-mp4/
├─ Mp3ToMp4Converter.tsx   # 단계형 UI와 인코딩 진행률
├─ encoder.ts              # FFmpeg WebAssembly 동적 로더
├─ validation.ts           # 파일 형식·길이·메모리 검증
├─ presets.ts              # 16:9, 1:1, 9:16 해상도 프리셋
├─ types.ts                # 작업 상태와 결과 타입
└─ worker.ts               # 메인 UI를 막지 않는 인코딩 작업
```

FFmpeg 관련 패키지는 이 기능이 실제로 구현될 때 추가하며 반드시 동적 import로 불러옵니다. 이미지 변환기와 홈 번들에는 포함하지 않습니다.
