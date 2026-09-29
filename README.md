# 모바일 청첩장

카카오톡·문자로 링크를 보내면 하객이 스마트폰에서 바로 열어보는 청첩장 웹사이트입니다.
기획 배경과 전체 로드맵은 [PLAN.md](./PLAN.md) 에 정리되어 있습니다.

현재 들어 있는 이름·날짜·사진은 **모두 샘플**입니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # 배포용 빌드
npm run lint
npm run placeholders   # 샘플 사진(SVG 플레이스홀더) 다시 만들기
```

## 내용 바꾸기

이름, 날짜, 예식장, 계좌번호, 인사말, 교통 안내는 **전부 한 파일에 모여 있습니다.**

```
src/data/wedding.ts
```

다른 파일은 건드리지 않아도 됩니다. 달력·D-Day·공유 문구·썸네일은 이 값에서 자동으로 계산됩니다.

### 사진 교체

1. `public/images/` 안의 `*.svg` 플레이스홀더를 지웁니다.
2. 실제 사진을 같은 폴더에 넣습니다. (jpg 또는 webp 권장)
3. `src/data/wedding.ts` 의 `gallery.cover` 와 `gallery.photos` 경로를 새 파일명으로 바꿉니다.
4. 사진이 모두 jpg/webp가 되면 `next.config.ts` 의 `dangerouslyAllowSVG` 옵션을 지워도 됩니다.

> 요즘 폰 사진은 1장에 5MB가 넘습니다. 가로 최대 1600px 정도로 줄이고 webp로 변환하면
> 모바일 데이터에서 훨씬 빠릅니다. 커버는 세로 비율(3:4 또는 2:3)이 잘 맞습니다.

## 카카오 지도 · 카카오톡 공유 켜기

키가 없어도 사이트는 정상 동작하며, 지도 자리에 안내 문구가 표시되고
공유 버튼은 기본 공유 시트나 링크 복사로 대체됩니다.

1. [카카오 개발자](https://developers.kakao.com) → 내 애플리케이션 → 애플리케이션 추가
2. **앱 키 → JavaScript 키** 복사
3. **플랫폼 → Web → 사이트 도메인**에 `http://localhost:3000` 과 배포 주소를 등록
4. `.env.example` 을 `.env.local` 로 복사한 뒤 키를 붙여넣기

```
NEXT_PUBLIC_KAKAO_JS_KEY=발급받은_JavaScript_키
```

예식장 좌표(`venue.lat`, `venue.lng`)는 카카오맵에서 장소를 검색해 확인한 값으로 바꿔주세요.

## 배포 (Vercel)

1. 이 폴더를 GitHub 등에 올린 뒤 [Vercel](https://vercel.com) 에서 import
2. Environment Variables 에 `NEXT_PUBLIC_KAKAO_JS_KEY` 추가
3. 배포 후 나온 주소를 `src/data/wedding.ts` 의 `siteUrl` 에 입력하고 다시 배포
   (카카오톡 공유 썸네일이 이 주소를 기준으로 만들어집니다)
4. 카카오 개발자 콘솔의 사이트 도메인에도 배포 주소를 추가

### 배포 후 확인할 것

- [ ] 실제 카카오톡으로 링크를 보내 **카톡 인앱 브라우저**에서 열어보기
- [ ] 공유 카드에 썸네일·제목이 제대로 보이는지 확인
      (잘못된 썸네일이 캐싱되면 [카카오 캐시 초기화](https://developers.kakao.com/tool/clear/og)로 지웁니다)
- [ ] 아이폰·안드로이드에서 전화/문자 버튼, 계좌 복사, 지도앱 길찾기 동작 확인

## 구조

```
src/
├── data/wedding.ts          ★ 모든 내용은 여기서만 관리
├── lib/
│   ├── date.ts              달력 / D-Day / 날짜 문구 (한국 시간 기준)
│   ├── format.ts            이름·전화번호 표기
│   └── clipboard.ts         복사 (카톡 인앱 브라우저 폴백 포함)
├── components/
│   ├── Cover.tsx            메인 커버
│   ├── Greeting.tsx         인사말 + 혼주 소개
│   ├── Calendar.tsx         달력 + D-Day
│   ├── Gallery.tsx          사진 그리드 + 확대 보기(스와이프)
│   ├── Location.tsx         오시는 길 + 교통 안내
│   ├── KakaoMap.tsx         카카오 지도
│   ├── Contact.tsx          전화 / 문자
│   ├── Accounts.tsx         마음 전하실 곳
│   ├── ShareButtons.tsx     카카오톡 공유 / 링크 복사
│   └── ui/                  Section, Reveal, CopyButton, Toast
└── app/
    ├── layout.tsx           메타데이터 · 폰트
    ├── page.tsx             섹션 조립
    └── opengraph-image.tsx  공유 썸네일 (빌드 시 PNG 생성)
```

## 알아두면 좋은 점

- **검색엔진 노출은 기본 차단**입니다. 계좌번호·연락처가 검색되지 않도록 `wedding.hideFromSearchEngines`
  가 `true` 로 설정되어 있습니다.
- **D-Day는 브라우저에서 계산**합니다. 정적 빌드라서 서버에서 계산하면 빌드 시점 값으로 고정됩니다.
- **한글 폰트는 Google Fonts CSS로 불러옵니다.** 자체 호스팅하면 수 MB를 내려받게 되지만,
  Google Fonts는 필요한 글자만 조각으로 받아오기 때문에 모바일에서 훨씬 빠릅니다.
- **공유 썸네일은 영문**입니다. 코드로 PNG를 생성하는 방식이라 한글을 넣으려면 폰트를 따로
  심어야 해서, 지금은 `share.coupleEn` 값을 씁니다.
