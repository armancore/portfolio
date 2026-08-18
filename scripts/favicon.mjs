/**
 * Generates every favicon and app icon from one vector source.
 *
 * The mark is the site's own wayfinding language: a chalk "A" on void with the
 * amber rule beneath it, the same pairing the navbar uses to say which route
 * you are on. The letterform is drawn as geometry rather than set in Archivo,
 * because rasterising text here would depend on the font being installed on
 * whichever machine runs the build.
 *
 * Colours are the section 1 tokens converted to sRGB -- the previous icon was
 * the last artifact of the blue palette the redesign removed.
 *
 * Committed as a script for the same reason as scripts/images.mjs: the source
 * is in the repo, so the output is reproducible and cannot drift. Unlike that
 * script this one always rewrites, since the icons are cheap and the whole
 * point is that changing the mark here changes every size at once.
 */

import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(root, 'public');

const VOID = '#000000';
const CHALK = '#f4f1ed';
const SIGNAL = '#f5a344';

/**
 * Drawn on a 64 grid.
 *
 * The apex is flattened rather than pointed: a true point disappears into a
 * single pixel at 16px, where this mark spends most of its life. The rule sits
 * on the baseline at full bleed, so at 16px it survives as a solid band even
 * when the letter softens.
 */
const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="${VOID}"/>
  <path d="M9.5 50 L27.4 9.5 L36.6 9.5 L54.5 50 L44.6 50 L40.5 40 L23.5 40 L19.4 50 Z M26.8 32 L37.2 32 L32 19.5 Z"
        fill="${CHALK}" fill-rule="evenodd"/>
  <rect x="0" y="56" width="64" height="8" fill="${SIGNAL}"/>
</svg>`;

const png = (size) => sharp(Buffer.from(svg(size))).png({ compressionLevel: 9 });

/**
 * ICO container. Every entry is a PNG rather than a BMP -- every browser that
 * still reads .ico at all has supported PNG entries for over a decade, and the
 * BMP path would mean hand-rolling a bottom-up bitmap with an AND mask.
 */
const buildIco = (entries) => {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const directory = [];

  for (const { size, data } of entries) {
    const entry = Buffer.alloc(16);
    // 256 is stored as 0; nothing here is that large, but the rule is the rule.
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
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
