/**
 * Copies the latin font files this site actually uses out of node_modules and
 * into public/fonts/ under stable, unhashed names.
 *
 * The @font-face rules live in src/index.css by hand rather than coming from
 * @fontsource's own CSS. That trade buys two things the imported stylesheets
 * cannot give us:
 *
 *   1. Preload. index.html is static, so a <link rel="preload"> can only name a
 *      path that never changes. Font files imported through CSS get a content
 *      hash from Vite, so their names are unknowable at the time the template
 *      is written.
 *   2. Weight discipline. Importing @fontsource/archivo/latin-400.css pulls the
 *      whole declaration set for that weight including files we never render.
 *      Listing the files explicitly here means the shipped set is auditable.
 *
 * Runs from `prebuild`, so `npm run build` cannot produce a dist with missing
 * fonts even on a clean checkout.
 */

import { copyFile, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'public', 'fonts');

/** woff2 only. Every browser that survives our support matrix reads it, and
 *  shipping woff alongside doubles the directory for no reachable user. */
const FILES = [
  ['@fontsource/archivo', 'archivo-latin-400-normal.woff2'],
  ['@fontsource/archivo', 'archivo-latin-600-normal.woff2'],
  ['@fontsource/archivo', 'archivo-latin-700-normal.woff2'],
  ['@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff2'],
  ['@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2'],
];

const main = async () => {
  // Rebuild the directory from scratch so a font dropped from FILES actually
  // disappears from public/ instead of lingering as an orphan.
  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });

  for (const [pkg, file] of FILES) {
    const from = join(root, 'node_modules', pkg, 'files', file);
    await copyFile(from, join(outDir, file));
  }

  const written = await readdir(outDir);
  console.log(`  fonts     -> public/fonts/ (${written.length} files)`);
};

main().catch((error) => {
  console.error('\nFont copy failed:\n', error);
  process.exit(1);
});
