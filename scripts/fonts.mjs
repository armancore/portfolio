import { copyFile, mkdir, readdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outDir = join(root, 'public', 'fonts');

const FILES = [
  ['@fontsource/archivo', 'archivo-latin-400-normal.woff2'],
  ['@fontsource/archivo', 'archivo-latin-600-normal.woff2'],
  ['@fontsource/archivo', 'archivo-latin-700-normal.woff2'],
  ['@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff2'],
  ['@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2'],
];

const main = async () => {
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
