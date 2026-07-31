/**
 * Writes a static HTML file per route into dist/.
 *
 * Runs after both Vite builds: the client build produces dist/index.html with
 * hashed asset tags, and the SSR build produces dist-ssr/entry-server.js. This
 * renders each route through the SSR bundle, injects the markup into the client
 * template, and rewrites the head tags from the shared route table so a cold
 * load and a link-preview bot both see the right title and description.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const dist = join(root, 'dist');
const ssrDist = join(root, 'dist-ssr');

const escapeAttr = (value) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Replaces the content="" of a meta tag matched by its identifying attribute. */
const setMeta = (html, attr, name, value) => {
  const pattern = new RegExp(`(<meta\\s+${attr}="${name}"[^>]*?content=")[^"]*(")`, 'i');
  if (!pattern.test(html)) throw new Error(`No <meta ${attr}="${name}"> in the template`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
};

const applyMeta = (html, route, origin) => {
  const url = route.path === '/404' ? origin : `${origin}${route.path === '/' ? '/' : route.path}`;

  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  out = setMeta(out, 'name', 'description', route.description);
  out = setMeta(out, 'property', 'og:title', route.title);
  out = setMeta(out, 'property', 'og:description', route.description);
  out = setMeta(out, 'property', 'og:url', url);
  out = setMeta(out, 'name', 'twitter:title', route.title);
  out = setMeta(out, 'name', 'twitter:description', route.description);
  out = out.replace(
    /(<link\s+rel="canonical"[^>]*?href=")[^"]*(")/i,
    `$1${escapeAttr(url)}$2`
  );
  return out;
};

const main = async () => {
  const { render, ROUTES, SITE_ORIGIN } = await import(
    pathToFileURL(join(ssrDist, 'entry-server.js')).href
  );

  const template = await readFile(join(dist, 'index.html'), 'utf8');
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Expected an empty <div id="root"></div> in the built template');
  }

  for (const route of ROUTES) {
    if (!route.file) continue;

    const markup = await render(route.path);
    const html = applyMeta(template, route, SITE_ORIGIN).replace(
      '<div id="root"></div>',
      `<div id="root">${markup}</div>`
    );

    const target = join(dist, route.file);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html, 'utf8');

    const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(`  prerendered ${route.path.padEnd(10)} -> dist/${route.file} (${kb} kB)`);
  }

  await rm(ssrDist, { recursive: true, force: true });
};

main().catch((error) => {
  console.error('\nPrerender failed:\n', error);
  process.exit(1);
});
