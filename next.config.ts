import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 상위 폴더의 package-lock.json 을 프로젝트 루트로 오인하지 않도록 고정합니다.
  turbopack: { root: import.meta.dirname },
  images: {
    // 샘플 사진이 SVG 플레이스홀더라서 필요합니다.
    // 실제 사진(jpg/png)으로 모두 교체한 뒤에는 이 옵션을 지워도 됩니다.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
  },
};

export default nextConfig;
