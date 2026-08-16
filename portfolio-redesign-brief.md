# Portfolio redesign — implementation brief

Repo: `armancore/portfolio`. Work **in place** on a `redesign` branch. Do not
scaffold a new project, do not migrate frameworks.

**Stack (do not change):** React 19, Vite 7, TypeScript, Tailwind 4,
`motion/react` v12, React Router 7, Formspree, prerendered to static HTML per
route via `scripts/prerender.mjs`.

**Read before writing anything:** `src/index.css`, `src/lib/motion.ts`,
`src/pages/Home.tsx`, `src/constants/index.ts`, `src/routes.ts`,
`scripts/prerender.mjs`, `vercel.json`.

**Non-negotiable:** `npm run build` must keep prerendering **every** registered
route to static HTML with correct per-route meta. That is five routes through
step 4, and thirteen once §5 adds the eight project detail pages. If a change
would break that, stop and ask.

---

## 1. Tokens — `src/index.css`

Dark only. There is **no** light theme: no theme toggle, no `data-theme`
attribute, no `@custom-variant dark`, no `prefers-color-scheme` branching.

Delete `--color-accent*`, `--bg-gradient`, the stacked radial gradients, and the
blue glows on `.gradient-text`, `.noise-overlay`, `navbar-scanline`.

```css
@theme {
  --font-display: 'Archivo', system-ui, sans-serif;
  --font-body:    'Archivo', system-ui, sans-serif;
  --font-mono:    'IBM Plex Mono', ui-monospace, monospace;

  /* base — true black, lifting only where surfaces must separate */
  --color-void:    oklch(0 0 0);            /* page background, #000 */
  --color-panel:   oklch(0.16 0.004 75);    /* cards, hero surface layer */
  --color-panel-2: oklch(0.21 0.005 75);    /* hover, pressed, inputs */
  --color-rule:    oklch(0.30 0.005 75);    /* hairlines, borders, table rules */

  /* text */
  --color-chalk:   oklch(0.96 0.006 85);    /* headings, primary */
  --color-chalk-2: oklch(0.72 0.008 80);    /* body, secondary */
  --color-chalk-3: oklch(0.55 0.008 78);    /* labels, captions, muted */

  /* three signals, one chroma band */
  --color-signal:   oklch(0.78 0.145 66);   /* amber — structure, links, focus */
  --color-verified: oklch(0.76 0.135 158);  /* phosphor — live, available, 2xx */
  --color-reject:   oklch(0.63 0.170 28);   /* red — 4xx and form errors ONLY */

  /* type scale, 1.25 from 16 */
  --text-xs: 0.75rem;  --text-sm: 0.875rem; --text-base: 1rem;
  --text-lg: 1.25rem;  --text-xl: 1.563rem; --text-2xl: 1.953rem;
  --text-3xl: 2.441rem; --text-4xl: 3.052rem; --text-5xl: 3.815rem;

  --spacing: 0.25rem;

  --radius-xs: 2px; --radius-sm: 4px; --radius-md: 6px; --radius-lg: 8px;

  --ease-signal: cubic-bezier(0.2, 0.85, 0.2, 1);

  --duration-tap: 120ms;     /* state flips, focus rings */
  --duration-move: 240ms;    /* hover reveals, card content */
  --duration-enter: 320ms;   /* section reveals, page transitions */
  --duration-stage: 2400ms;  /* hero sweep only */
}
```

`body` background is `--color-void`, flat. No gradients, no radial washes, no
noise overlay. Depth comes from `--color-panel` surfaces and `--color-rule`
hairlines, never from glow.

**Signal discipline**

- Amber is the only accent: structure layer, links, focus rings, sweep line.
- Phosphor green **only** for live / available / 2xx states.
- Red **only** for 422 and Formspree validation errors. Never decorative.
- Never set amber body text on `--color-void` at `--text-sm` or below. Amber is
  for mono labels, annotations, and short emphasis. Long-form reads in
  `--color-chalk-2`. (Pure-black OLED pixels halate against saturated amber at
  small sizes.)
- Every text/background pair passes WCAG AA: 4.5:1 body, 3:1 large text and UI.

Do not introduce colors, easings, durations, or radii beyond this block. If a
value seems missing, ask rather than invent.

**Fonts.** Install `@fontsource/archivo` and `@fontsource/ibm-plex-mono`. Remove
`@fontsource/poppins`, `@fontsource/plus-jakarta-sans` and
`@fontsource/jetbrains-mono` entirely — package, imports, and every
`font-family` reference. Archivo serves both display and body; `--font-body` is
a separate token even though it resolves to the same family today, so body copy
can diverge later without a site-wide sweep. Self-host, latin subset,
`font-display: swap`, preload only the two weights used above the fold.

**Step 1 is tokens plus a full retokenization sweep.** The token rename breaks
every file that hardcodes `#2E8FFF`, `#ECEEF2`, `rgba(46,143,255,…)` and
friends — eleven files, several hundred literals. All of it lands in step 1. No
commit in this job may leave the site visually broken.

---

## 2. Motion system — `src/lib/motion.ts`

One curve for the entire site: `const EASE = [0.2, 0.85, 0.2, 1]`.

Export variants that are **directional and different per element class** — not
one `fadeUp` reused everywhere:

- `revealHeading` — mask wipe: parent `overflow: hidden`, child `y: '110%' → 0`
- `revealRule` — `scaleX: 0 → 1`, `transformOrigin: 'left'`
- `revealBody` — `opacity` + `y: 12`
- `revealCard` — `opacity` + `y: 20`, stagger 60ms, entering from the side the
  grid flows (odd columns `x: -12`, even `x: 12`)

Durations read from the token scale; stagger 60–90ms. Delete
`src/hooks/useTypewriter.ts` and every call site. Switch `useReveal` to
`once: true`.

**Delete in step 2**, with every call site:

- `src/components/ui/CustomCursor.tsx`
- `src/hooks/useTypewriter.ts`
- `src/hooks/useMagnetic.ts` — magnetic hover animates transform in a way §2
  does not sanction
- the `MouseGlow` component in `src/App.tsx` — a pointer-following radial glow
  directly contradicts §1's "depth never from glow"

Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`,
`left`, `margin`, or `box-shadow`.

---

## 3. `src/components/sections/HeroXray.tsx` — the signature moment

**Concept.** A finished, ordinary profile card. A plotter head crosses it, the
paint drops away, and the data layer is exposed — drawn exactly under the
elements it supports. Then it crosses back. Tagline: *"from schema to interface"*.

Two absolutely-positioned layers in one box, sharing identical internal row
geometry so every annotation aligns to the row it describes.

### SURFACE layer — on `--color-panel`, rendered as a normal UI

| Row | Content |
|---|---|
| avatar | `public/profile-640.webp` |
| name | **Arman Khan** |
| role | Full-stack developer |
| location | Kathmandu, Nepal |
| status | phosphor dot + "Available for internships" |
| stack | React · Node.js · PostgreSQL · Prisma |
| action | primary button "Get in touch" |

### STRUCTURE layer — mono, `--color-signal`, dotted grid, tick ruler down the left edge

**Rule: every annotation adds something the surface did not say.** The surface
already shows the name, role, and stack — restating those in SQL is a costume
change, not a reveal. Each line must be readable at a glance by someone with no
technical background. Short, plain, human. The mono/amber/grid treatment
supplies the "hidden systems layer" feeling; the words do not have to.

| Aligned to | Annotation | Max |
|---|---|---|
| avatar | `github.com/armancore` | 1 line |
| name | `IT student · Texas College, Kathmandu` | 1 line |
| role | `interested in the part nobody sees: logins, data, APIs` | 2 lines |
| location | `UTC+05:45 — the world's only 45-minute timezone` | 1 line |
| status | `open to internships · replies within 24 hours` | 1 line |
| stack | `4 languages · 6 tools · 8 live projects` | 1 line |
| action | `contact@armankhan.com.np` | 1 line |

Constraints on this text:

- No SQL, no code syntax, no jargon a non-developer would have to decode.
- Each line ≤ 8 words where possible, hard cap 2 lines at any breakpoint.
- Small mono caps label to the left of each value in `--color-chalk-3`
  (`SOURCE`, `EDU`, `FOCUS`, `TZ`, `STATUS`, `SKILLS`, `CONTACT`) so the layer
  reads as a data readout without needing technical literacy.
- Every value must be **true of me**. Do not invent counts, metrics, or facts —
  ask instead. The seven values in the table above are confirmed accurate and
  may be used verbatim. The `UTC+05:45` line is the most memorable line in the
  hero; give it prominence rather than burying it.
- Below 768px, drop the `role` line to one clause and keep all others; never
  truncate with an ellipsis.

### Reveal mechanism

ONE clock via `useAnimationFrame` from `motion/react`, driving:

- surface `clip-path: inset(0 0 0 P%)`
- structure `clip-path: inset(0 calc(100% - P%) 0 0)`
- sweep line at `left: P%` — 1px, `--color-signal`, small square head above

Write `P` to CSS custom properties with `ref.current.style.setProperty('--p', …)`.
**Do not re-render React at 60fps.**

### Timeline — one 9.2s pass

| Time | Beat |
|---|---|
| 0–0.7s | headline words mask-wipe up, 90ms stagger |
| 0.35–1.05s | card settles |
| 1.1–1.5s | sweep head appears |
| 1.5–3.9s | cross (`--duration-stage`) |
| 3.9–5.3s | hold on structure |
| 5.3–7.3s | return |
| 7.3–9.2s | rest on surface |

Runs **one full 9.2s pass per entry into view — it does not repeat while in
view.** Once on load, then one further pass each time the section is scrolled
back into view (`IntersectionObserver`). Pauses on
`document.visibilitychange`. Include a
visible pause/play control as a real `<button>` with a `--color-signal`
`:focus-visible` ring; its state persists for the session.

### Headline

Per-word mask wipe on the same clock. Explicitly **not** character-by-character
typewriter. "schema" in `--color-signal`; "from"/"to" in mono at 60% size;
"interface" in display weight.

---

## 4. Device and environment matrix

The hero and the whole site must hold up across all of the following. Treat each
row as a requirement, not a nice-to-have.

### Viewport

| Range | Behaviour |
|---|---|
| < 360px | single column, hero card fills width minus 16px gutters, no horizontal scroll at 320px |
| 360–767px | sweep runs **vertically** down a single-column card; annotations sit below their row, not beside it |
| 768–1023px | two-column card, sweep horizontal, reduced annotation verbosity if it would wrap past two lines |
| 1024–1439px | full 512×364 hero as specified |
| ≥ 1440px | hero scales with a `clamp()` cap; never exceeds 720px wide — do not stretch to fill ultrawide |
| landscape phone, height < 500px | hero collapses to headline + static hold frame; no full-height section |

Use container queries for the hero card's internal layout so it responds to its
own box, not the viewport. Use `clamp()` for hero type. No fixed pixel heights on
any section.

### Viewport units and safe areas

- Use `dvh`/`svh`, never bare `vh` — iOS Safari's collapsing toolbar breaks `vh`.
- Respect `env(safe-area-inset-*)` on notched and gesture-bar devices; add
  `viewport-fit=cover` to the meta viewport tag.
- Nothing may sit under the mobile browser's bottom UI.

### Input and interaction

- Touch targets ≥ 44×44px on coarse pointers; verify via `@media (pointer: coarse)`.
- Every hover reveal has a `:focus-within` equivalent — hover-only content is
  invisible on touch and to keyboard users.
- No `:hover` styles applied on coarse pointers (prevents sticky hover states).
- Full keyboard path: Tab reaches every control, `:focus-visible` ring in
  `--color-signal` at 2px offset, visible against `--color-void` and
  `--color-panel` both.
- Skip-to-content link as the first focusable element.

### Capability and preference

| Condition | Behaviour |
|---|---|
| `prefers-reduced-motion: reduce` | render the 4.6s hold frame statically — surface left of the split, structure right, both fully readable. Never a blank box, never just `animation: none`. All page transitions and reveals become instant. |
| `prefers-reduced-transparency` | no backdrop blur anywhere |
| `prefers-contrast: more` | raise `--color-rule` and `--color-chalk-3` to meet 7:1 |
| `forced-colors: active` (Windows High Contrast) | borders and focus rings use system colors; the structure layer stays legible |
| `navigator.connection.saveData` | static hold frame, no loop |
| `navigator.deviceMemory <= 4` | static hold frame, no loop |
| `navigator.hardwareConcurrency <= 4` | static hold frame, no loop |
| print stylesheet | hero renders as the static hold frame; navigation and controls hidden |

Wrap these in one `useDeviceProfile()` hook so the checks live in a single place
and are SSR-safe.

### SSR and prerender safety

- Guard every `window`, `document`, `navigator`, `matchMedia`, and
  `IntersectionObserver` access — they do not exist during prerender.
- No `useLayoutEffect` warnings in the SSR build.
- `npm run build` must not crash in `scripts/prerender.mjs`.

### Performance budgets

- Hero must **not** delay LCP: headline, sub-copy, and card are in the
  prerendered HTML at their final position and readable at first paint.
- Motion starts after `requestIdleCallback` (200ms fallback) **and** after fonts
  settle via `document.fonts.ready`.
- Nothing that animates in changes layout. Target CLS < 0.02.
- Self-host Archivo and IBM Plex Mono with `font-display: swap` and preload only
  the two weights used above the fold. Subset to latin.
- No WebGL, no canvas, no particles. DOM + CSS `clip-path` only.
- Client JS ≤ 180KB gzipped. Report the number before and after.
- Serve the avatar as AVIF with WebP fallback, correct `width`/`height`
  attributes, `fetchpriority="high"`. Generate `profile-640.avif` and
  `profile-960.avif` with `sharp` from a committed **prebuild script**, not a
  one-off conversion — the script is the deliverable, the output is a
  by-product.
- Report gzipped client JS after **every** numbered step, not only at the end.
  Baseline is ~164 kB against a 180 kB ceiling. If any step crosses 180 kB,
  stop and report before continuing.

### Semantics and assistive tech

- `<h1>` holds the real tagline as one accessible string.
- Decorative layers are `aria-hidden`; the structure annotations are
  illustration, not content.
- The pause control is a real `<button>` with an accurate `aria-pressed`.
- Page title and focus move to the new `<h1>` on route change; scroll resets.
- Site remains usable at 200% browser zoom and at 400% with reflow, no
  horizontal scrolling.
- Test with VoiceOver and NVDA reading order.

---

## 5. Apply the system to the rest of the site

**Project cards.** Hover / `focus-within` reveals *useful* content: stack chips,
a one-line architecture note, and live status. Height must not jump — reserve
the space, animate `opacity` + `y: 6` at `--duration-move`. Keyboard focus shows
the same content.

Status is a **static dot only — no latency number.** Phosphor for `live`, muted
`--color-chalk-3` for `archived`. Measuring real latency would mean pinging
eight deployments on every pageview, which is a genuine cost for a decorative
number; a fabricated one is worse.

**Projects page.** Filter axes that work at 8 projects and scale to 12:

- `type` — `full-stack | API | tooling`. "coursework" is dropped; nothing
  populates it.
- `status` — `live | archived`, exactly two values. A project with no
  `liveUrl` is `archived`.
- `stack` — derived from the tags that actually exist.

Remap `ProjectCategory` to the new `type` vocabulary: TriLearn, Expense Tracker
and ArticleHub → `full-stack`; Weather, Movie, Nepal Patra → `API`; Typing Test,
TaskFlow → `tooling`. Add an explicit `status` field to all eight.

Filtering animates with a `layout` transition at `--duration-enter`, never a
reflow jump. Empty-filter state is designed, not blank.

**Page transitions.** `AnimatePresence mode="wait"`, exit `opacity → 0` +
`y: -8` at 140ms, enter reverse at `--duration-enter`. Total under 400ms.

**Project detail route.** New template with room for an architecture write-up —
prose column, schema/diagram blocks, decision log.

**Prerender all eight.** Register one `ROUTES` entry per project in
`src/routes.ts`, each with its own title and description, so the pipeline bakes
per-project meta exactly as it does for the original five. The route count goes
from 5 to 13; "all five routes must keep prerendering" becomes "all thirteen".

Build the template against **TriLearn only**. The other seven get visible,
obviously-unfilled placeholder slots that Arman will write himself. Do not
invent architecture write-ups, schema descriptions, or decision-log entries for
any project.

**Contact.** Formspree via `@formspree/react`. Designed empty, pending, success,
and error states. `--color-reject` appears here and on 422 only.

---

## 6. Order of work and verification

1. Tokens (`src/index.css`) **plus the full retokenization sweep** across all
   eleven files that hardcode the old palette, and the font swap to Archivo +
   IBM Plex Mono. The largest commit of the job.
2. Motion system (`src/lib/motion.ts`), delete `useTypewriter`, `CustomCursor`,
   `useMagnetic`, and `MouseGlow`
3. Split `src/pages/Home.tsx` (671 lines) into `src/components/sections/`;
   content and annotation strings stay in `src/constants/index.ts`
4. `HeroXray.tsx`
5. Cards, filters, transitions, project detail route

After **each** numbered step: run `npm run typecheck` and `npm run build`, fix
everything, and do not continue until both pass.

Report gzipped client JS after **each** step, not only at the end. Baseline is
~164 kB; the ceiling is 180 kB. Crossing it is a stop-and-report event.

Final report must include:

- client bundle size before and after, plus the per-step trail
- confirmation all thirteen routes prerender with correct titles
- the list of device/preference conditions from §4 actually tested, and how
- **Lighthouse:** do not produce scores that cannot be trusted. This
  environment has no throttled Chrome runner, so hand over the exact command
  for Arman to run locally instead of reporting numbers:

  ```
  npm run build && npx serve dist -l 5000
  npx lighthouse http://localhost:5000 \
    --preset=perf --form-factor=mobile \
    --throttling-method=simulate \
    --only-categories=performance,accessibility,best-practices,seo \
    --view
  ```

Ask before inventing any value, metric, or design decision not specified here.
