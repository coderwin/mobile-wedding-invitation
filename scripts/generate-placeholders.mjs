/**
 * 실제 사진이 준비되기 전까지 쓸 SVG 플레이스홀더를 만듭니다.
 *
 *   npm run placeholders
 *
 * 실제 사진으로 교체할 때는 public/images 안의 svg 파일을 지우고
 * jpg/webp 파일을 넣은 뒤 src/data/wedding.ts 의 경로만 바꿔주세요.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUTPUT_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images');

/** 톤이 서로 이어지는 따뜻한 중성색 팔레트 */
const PALETTE = [
  ['#f3ede7', '#ded2c6'],
  ['#efe9e5', '#d6c7bd'],
  ['#f1eee9', '#cfc4b8'],
  ['#ece6e2', '#d3c3b9'],
  ['#f4f0ea', '#dbcfc2'],
  ['#eeeae4', '#cdc0b4'],
  ['#f2ece6', '#d8cabe'],
  ['#ebe6e0', '#d1c2b6'],
  ['#f0ebe6', '#d5c8bb'],
  ['#ede8e3', '#cec1b5'],
];

function svg({ width, height, from, to, label }) {
  const fontSize = Math.round(Math.min(width, height) * 0.055);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <circle cx="${width * 0.5}" cy="${height * 0.44}" r="${Math.min(width, height) * 0.13}" fill="#ffffff" opacity="0.35"/>
  <text x="50%" y="${height * 0.62}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="${fontSize}" letter-spacing="${fontSize * 0.22}" fill="#8b8480">${label}</text>
</svg>
`;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = [
    {
      name: 'cover.svg',
      content: svg({ width: 1080, height: 1620, from: '#f6f2ee', to: '#ddd0c4', label: 'COVER PHOTO' }),
    },
    ...PALETTE.slice(0, 9).map(([from, to], index) => ({
      name: `gallery-${String(index + 1).padStart(2, '0')}.svg`,
      content: svg({ width: 900, height: 1200, from, to, label: `PHOTO ${index + 1}` }),
    })),
  ];

  await Promise.all(files.map((file) => writeFile(join(OUTPUT_DIR, file.name), file.content, 'utf8')));

  console.log(`플레이스홀더 ${files.length}개를 public/images 에 만들었습니다.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
