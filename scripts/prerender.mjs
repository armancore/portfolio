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

const setMeta = (html, attr, name, value) => {
  const pattern = new RegExp(`(<meta\\s+${attr}="${name}"[^>]*?content=")[^"]*(")`, 'i');
  if (!pattern.test(html)) throw new Error(`No <meta ${attr}="${name}"> in the template`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
};

const applyMeta = (html, route, origin) => {
  const url = `${origin}${route.path === '/' ? '/' : route.path}`;
  const shareTitle = route.shareTitle ?? route.title;

  let out = html.replace(/<title>[^<]*<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);
  out = setMeta(out, 'name', 'description', route.description);
  out = setMeta(out, 'property', 'og:title', shareTitle);
  out = setMeta(out, 'property', 'og:description', route.description);
  out = setMeta(out, 'property', 'og:url', url);
  out = setMeta(out, 'name', 'twitter:title', shareTitle);
  out = setMeta(out, 'name', 'twitter:description', route.description);

  if (route.noindex) {
    // An error page must not claim to be another URL. It previously
    // canonicalised to the origin, which told crawlers the 404 was the
    // homepage. The tag goes entirely, and noindex says what is actually true.
    out = out.replace(/\s*<link\s+rel="canonical"[^>]*>/i, '');
    out = out.replace(/<title>/i, '<meta name="robots" content="noindex, follow" />\n  <title>');
  } else {
    out = out.replace(
      /(<link\s+rel="canonical"[^>]*?href=")[^"]*(")/i,
      `$1${escapeAttr(url)}$2`
    );
  }

  if (route.jsonLd) {
    out = out.replace(
      /(<script type="application\/ld\+json">)[\s\S]*?(<\/script>)/i,
      `$1\n${JSON.stringify(route.jsonLd, null, 2)}\n  $2`
    );
  }

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

  const indexable = ROUTES.filter((r) => r.file && r.path !== '/404');
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexable.map((r) => `  <url><loc>${SITE_ORIGIN}${r.path === '/' ? '/' : r.path}</loc></url>`),
    '</urlset>',
    '',
  ].join(String.fromCharCode(10));
  await writeFile(join(dist, 'sitemap.xml'), sitemap, 'utf8');
  console.log(`  sitemap    -> dist/sitemap.xml (${indexable.length} urls)`);

  await rm(ssrDist, { recursive: true, force: true });
};

main().catch((error) => {
  console.error('\nPrerender failed:\n', error);
  process.exit(1);
});
