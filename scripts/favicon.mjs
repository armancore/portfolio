import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(root, 'public');

const VOID = '#000000';
const CHALK = '#f4f1ed';
const SIGNAL = '#f5a344';

const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${VOID}"/>
  <path d="M9.5 50 L27.4 9.5 L36.6 9.5 L54.5 50 L44.6 50 L40.5 40 L23.5 40 L19.4 50 Z M26.8 32 L37.2 32 L32 19.5 Z"
        fill="${CHALK}" fill-rule="evenodd"/>
  <rect x="0" y="56" width="64" height="8" fill="${SIGNAL}"/>
</svg>`;

const png = (size) => sharp(Buffer.from(svg(size))).png({ compressionLevel: 9 });

const buildIco = (entries) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const directory = [];

  for (const { size, data } of entries) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    directory.push(entry);
    offset += data.length;
  }

  return Buffer.concat([header, ...directory, ...entries.map((e) => e.data)]);
};

const PNG_TARGETS = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['android-chrome-192x192.png', 192],
  ['android-chrome-512x512.png', 512],
];

const run = async () => {
  for (const [name, size] of PNG_TARGETS) {
    await png(size).toFile(join(publicDir, name));
    console.log(`  favicon  ${name} (${size}x${size})`);
  }

  const icoSizes = [16, 32, 48];
  const entries = await Promise.all(
    icoSizes.map(async (size) => ({ size, data: await png(size).toBuffer() }))
  );
  await writeFile(join(publicDir, 'favicon.ico'), buildIco(entries));
  console.log(`  favicon  favicon.ico (${icoSizes.join(', ')})`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
