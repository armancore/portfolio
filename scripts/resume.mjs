// Builds public/resume.pdf from the portfolio's own data (src/constants) by printing
// an HTML page with a local Chrome or Edge. Run `npm run resume` after editing constants.
import { existsSync } from 'node:fs';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
  SOCIAL_LINKS,
  TIMELINE,
} from '../src/constants/index.ts';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const output = join(root, 'public', 'resume.pdf');
const fonts = pathToFileURL(join(root, 'public', 'fonts')).href;

const SITE = 'armankhan.com.np';
const PROJECT_SLUGS = [
  'trilearn',
  'kiteen',
  'sajilo-bus-ticketing',
  'weather-intelligence-platform',
  'nepal-patra',
  'articlehub',
];
const SKILL_LABELS = {
  'Frontend Development': 'Frontend',
  'Backend Development': 'Backend',
  'Programming Languages': 'Languages',
  'Dev Tools & Workflow': 'Tools',
  'Networking & Systems': 'Networking',
};

const BROWSERS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const esc = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\.git$/, '').replace(/\/$/, '');
const tags = (list) => list.map((t) => esc(t.label)).join(' · ');

const bySlug = new Map(PROJECTS.map((p) => [p.slug, p]));
const github = SOCIAL_LINKS.find((s) => s.label === 'GitHub');
const linkedin = SOCIAL_LINKS.find((s) => s.label === 'LinkedIn');
const timeline = (title) => TIMELINE.find((t) => t.title === title);
const education = [timeline('Bachelor of Information Technology'), timeline('+2 Science')];

const contact = [
  `<a href="mailto:${PERSONAL_INFO.email}">${PERSONAL_INFO.email}</a>`,
  `<a href="https://${SITE}">${SITE}</a>`,
  `<a href="${github.url}">${bare(github.url)}</a>`,
  `<a href="${linkedin.url}">${bare(linkedin.url)}</a>`,
  esc(PERSONAL_INFO.location),
];

const projectItems = PROJECT_SLUGS.map((slug) => bySlug.get(slug))
  .map(
    (p) => `
      <article class="item">
        <header>
          <h3>${esc(p.title)}</h3>
          <span class="meta">${p.liveUrl ? `<a href="${p.liveUrl}">${bare(p.liveUrl)}</a>` : ''}</span>
        </header>
        <p>${esc(p.description)}</p>
        <p class="tags">${tags(p.tags)}</p>
      </article>`
  )
  .join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${esc(PERSONAL_INFO.name)} Resume</title>
<style>
  @font-face { font-family: Archivo; font-weight: 400; src: url('${fonts}/archivo-latin-400-normal.woff2'); }
  @font-face { font-family: Archivo; font-weight: 600; src: url('${fonts}/archivo-latin-600-normal.woff2'); }
  @font-face { font-family: Archivo; font-weight: 700; src: url('${fonts}/archivo-latin-700-normal.woff2'); }
  @font-face { font-family: Plex; font-weight: 400; src: url('${fonts}/ibm-plex-mono-latin-400-normal.woff2'); }
  @font-face { font-family: Plex; font-weight: 500; src: url('${fonts}/ibm-plex-mono-latin-500-normal.woff2'); }

  @page { size: A4; margin: 12mm 15mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font: 400 9.1pt/1.42 Archivo, sans-serif; color: #3b3a37; }
  a { color: inherit; text-decoration: none; }
  h1 { font: 700 23pt/1 Archivo; letter-spacing: -0.03em; color: #161513; }
  .role { margin-top: 4pt; font: 500 8.6pt Plex, monospace; letter-spacing: 0.1em; text-transform: uppercase; color: #a35a12; }
  .contact { margin-top: 7pt; display: flex; flex-wrap: wrap; gap: 2pt 12pt; font: 400 8.2pt Plex, monospace; color: #55534f; }
  section { margin-top: 10pt; }
  h2 { font: 500 8pt Plex, monospace; letter-spacing: 0.14em; text-transform: uppercase; color: #161513;
       padding-bottom: 3pt; margin-bottom: 6pt; border-bottom: 1px solid #d9d6d0; }
  h3 { font: 600 10pt Archivo; color: #161513; }
  .summary { color: #3b3a37; }
  .skills { display: grid; grid-template-columns: 22mm 1fr; gap: 3pt 10pt; }
  .skills dt { font: 600 8.8pt Archivo; color: #161513; }
  .skills dd { font: 400 8.4pt Plex, monospace; color: #3b3a37; }
  .item { break-inside: avoid; }
  .item + .item { margin-top: 7pt; }
  .item header { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
  .item .org { font-weight: 400; color: #55534f; }
  .meta { font: 400 8pt Plex, monospace; color: #6b6964; white-space: nowrap; }
  .item p { margin-top: 1.5pt; }
  .tags { font: 400 7.8pt Plex, monospace; color: #6b6964; }
  .more { margin-top: 7pt; font: 400 8pt Plex, monospace; color: #6b6964; }
</style>
</head>
<body>
  <header>
    <h1>${esc(PERSONAL_INFO.name)}</h1>
    <p class="role">Full-Stack Web Developer · React · Node.js · PostgreSQL</p>
    <p class="contact">${contact.map((c) => `<span>${c}</span>`).join('')}</p>
  </header>

  <section>
    <h2>Profile</h2>
    <p class="summary">${esc(PERSONAL_INFO.intro.replace(/\s*—\s*/g, ': '))} ${esc(
      `${PERSONAL_INFO.degree} student in Kathmandu with ${PROJECTS.filter((p) => p.status === 'live').length} live projects, a shipped client e-commerce store, and a focus on authentication, data modelling and APIs. Looking for an internship or junior developer role.`
    )}</p>
  </section>

  <section>
    <h2>Skills</h2>
    <dl class="skills">
      ${SKILLS.filter((s) => s.title in SKILL_LABELS)
        .map((s) => `<dt>${SKILL_LABELS[s.title]}</dt><dd>${tags(s.tags)}</dd>`)
        .join('')}
    </dl>
  </section>

  <section>
    <h2>Education</h2>
    ${education
      .map(
        (e) => `
      <article class="item">
        <header>
          <h3>${esc(e.title)}<span class="org">, ${esc(e.org)}</span></h3>
          <span class="meta">${esc(e.year)}</span>
        </header>
        ${e === education[0] ? `<p>${esc(e.description)}</p>` : ''}
      </article>`
      )
      .join('')}
  </section>
  <section>
    <h2>Projects</h2>
    ${projectItems}
    <p class="more">All ${PROJECTS.length} projects with source and live demos: ${SITE}/projects</p>
  </section>

</body>
</html>`;

const browser = BROWSERS.find((path) => existsSync(path));
if (!browser) {
  console.error('No Chrome or Edge found. Set CHROME_PATH to a Chromium-based browser.');
  process.exit(1);
}

const workdir = await mkdtemp(join(tmpdir(), 'resume-'));
const page = join(workdir, 'resume.html');
await writeFile(page, html, 'utf8');

try {
  execFileSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--user-data-dir=${join(workdir, 'profile')}`,
    `--print-to-pdf=${output}`,
    pathToFileURL(page).href,
  ], { stdio: 'ignore' });
  console.log(`  resume     -> public/resume.pdf`);
} finally {
  await rm(workdir, { recursive: true, force: true });
}
