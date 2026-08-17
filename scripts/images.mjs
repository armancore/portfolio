/**
 * Generates the AVIF derivatives of the profile photo.
 *
 * Committed as a script rather than as output files: the source photo is in
 * the repo, so the derivatives are reproducible, and a checked-in binary would
 * quietly drift from its source the first time the photo is replaced.
 *
 * Runs from `prebuild` alongside scripts/fonts.mjs. Existing files are left
 * alone, so a normal build does not pay the encode cost twice.
 */

import { mkdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const publicDir = join(root, 'public');

const SOURCE = join(publicDir, 'profile.webp');

/** [output name, width]. */
const TARGETS = [
  ['profile-320.avif', 320],
  ['profile-640.avif', 640],
  ['profile-960.avif', 960],
];

const exists = async (path) => {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
};

const main = async () => {
  if (!(await exists(SOURCE))) {
    throw new Error(`Missing source image: ${SOURCE}`);
  }

  await mkdir(publicDir, { recursive: true });

  for (const [name, width] of TARGETS) {
    const target = join(publicDir, name);
    if (await exists(target)) {
      console.log(`  images    -> public/${name} (cached)`);
      continue;
    }

    await sharp(SOURCE)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 55, effort: 4 })
      .toFile(target);

    const { size } = await stat(target);
    console.log(`  images    -> public/${name} (${(size / 1024).toFixed(1)} kB)`);
  }

};

main().catch((error) => {
  console.error('\nImage generation failed:\n', error);
  process.exit(1);
});
