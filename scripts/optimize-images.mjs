import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC = path.resolve('public/images');
const BACKUP = path.resolve('public/images-original');
const MAX_WIDTH = 800;
const QUALITY = 80;

async function optimizeDir(subdir, ext) {
  const srcDir = path.join(PUBLIC, subdir);
  const backupDir = path.join(BACKUP, subdir);

  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(backupDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter(f => f.endsWith(ext));
  console.log(`\n[${subdir}] ${files.length}개 파일 처리 중...`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const backupPath = path.join(backupDir, file);
    const outName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outPath = path.join(srcDir, outName);

    // 원본 백업
    fs.copyFileSync(srcPath, backupPath);

    const beforeSize = fs.statSync(srcPath).size;
    totalBefore += beforeSize;

    // 리사이즈 + WebP 변환
    await sharp(srcPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);

    // 원본 삭제 (WebP로 대체)
    fs.unlinkSync(srcPath);

    const afterSize = fs.statSync(outPath).size;
    totalAfter += afterSize;

    const reduction = ((1 - afterSize / beforeSize) * 100).toFixed(1);
    console.log(`  ${file} → ${outName}  (${fmt(beforeSize)} → ${fmt(afterSize)}, -${reduction}%)`);
  }

  console.log(`[${subdir}] 합계: ${fmt(totalBefore)} → ${fmt(totalAfter)} (-${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%)`);
  return { totalBefore, totalAfter };
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function main() {
  console.log('이미지 최적화 시작...');
  console.log(`설정: 최대 너비=${MAX_WIDTH}px, WebP 품질=${QUALITY}%`);
  console.log(`원본 백업 위치: ${BACKUP}\n`);

  const r1 = await optimizeDir('real', '.jpg');
  const r2 = await optimizeDir('ai', '.png');

  const before = (r1?.totalBefore || 0) + (r2?.totalBefore || 0);
  const after = (r1?.totalAfter || 0) + (r2?.totalAfter || 0);
  console.log(`\n전체: ${fmt(before)} → ${fmt(after)} (-${((1 - after / before) * 100).toFixed(1)}%)`);
  console.log('완료! 원본은 public/images-original/ 에 백업됨');
}

main().catch(console.error);
