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
step 4, and **fourteen** once §5 adds the nine project detail pages. If a
change would break that, stop and ask.

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
  --color-chalk-3: oklch(0.60 0.008 78);    /* labels, captions, muted */

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
  --duration-move: 240ms;    /* hover reveals, card content, page transitions */
  --duration-enter: 320ms;   /* section reveals */
  --duration-stage: 2400ms;  /* hero sweep only */
}
```

`body` background is `--color-void`, flat. No gradients, no radial washes, no
noise overlay. Depth comes from `--color-panel` surfaces and `--color-rule`
hairlines, never from glow.

**Signal discipline**

- Amber is the only accent: structure layer, links, focus rings, sweep line.
- **One amber call to action per viewport.** Wayfinding marks and transient
  motion are exempt: the navbar's active-route rule says where the reader is
  rather than asking them to go somewhere, and the hero sweep is a moment that
  passes. Both may share a viewport with the page's one amber CTA. What the rule
  forbids is two things competing to be clicked.
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

**Concept.** My portrait dissolving into pure information. A plotter head
crosses the photo; where it has passed, the photo is gone and my details are
there as clean mono text. Then it crosses back.

That dissolve **is** the whole idea. Nothing decorative is layered on top of
it: no SVG filter, no contour lines, no duotone, no second image copy, no
dotted grid, no tick ruler, no leader lines, no anchor dots, no annotation
gutter, and no "from schema to interface" headline. The `<h1>` is my name,
**Arman Khan**, and it sits in the left column.

### Two layers, one box

**SURFACE** — the portrait, rendered normally, at its **natural framing**. Use
the full frame (`profile-960`), not a tight crop and not a CSS zoom: the source
is 3:4 and the box is 4:5, so `object-fit: cover` trims roughly 6% of the
height and nothing more. `--radius-lg`, on `--color-panel` with a 1px
`--color-rule` hairline.

**STRUCTURE** — my details as mono text on `--color-void`. Nothing else.
Identical dimensions, same position, stacked in the same grid cell.

Both layers are responsive, never fixed:

```css
width: clamp(280px, 28vw, 420px);
aspect-ratio: 4 / 5;
```

They must stay dimensionally identical or the sweep desyncs. The aspect ratio
is a floor rather than a cap: the two layers share one grid cell, so if the
structure text needs more height than the photo the box grows and nothing is
truncated.

### Structure content

A left-aligned stack of label/value pairs with generous vertical rhythm,
filling the same box the photo occupied. **Six rows:**

| Label | Value |
|---|---|
| `NAME` | Arman Khan |
| `EDU` | Bachelor of (Hons.) in Information Technology |
| `FOCUS` | the part nobody sees: logins, data, APIs |
| `TZ` | UTC+05:45 — the world's only 45-minute timezone |
| `STATUS` | open to internships · replies within 24 hours |
| `CONTACT` | contact@armankhan.com.np |

There is deliberately **no SKILLS row and no college name**. Skills belong to
the skills section further down the page, where the stack is already shown;
repeating them here would be the echo this layer exists to avoid.

- Labels: mono caps, `--text-sm`, `--color-chalk-3`.
- Values: mono, `--text-base`, `--color-chalk`.
- **Nothing in the structure layer is amber.** The sweep line and its square
  head are the only `--color-signal` in the hero. (The pause control picks up
  amber on hover and focus, but it is a control, not structure text.)
- Every value is the **same size**. `FOCUS` was briefly larger and amber; with
  the colour gone, the size bump alone read as an inconsistency, so the rows are
  uniform and that line earns its weight from its position and its wording.
- Six rows leave more room than seven did, so take it in vertical gap rather
  than letting the block float in empty space.
- All six must fit at the 320px minimum without truncating. If they do not,
  reduce the gap — never the font size below `--text-sm`.
- Each row fades in as the sweep passes its position. The stagger derives from
  vertical position, not index. The cascade is gated on the card actually
  animating: these rows are content, so the static hold frame shows all six.
- Every value must be **true of me**. Do not invent counts, metrics or facts.

### Reveal mechanism

ONE clock via `useAnimationFrame` from `motion/react`, driving:

- surface `clip-path: inset(0 0 0 P%)`
- structure `clip-path: inset(0 calc(100% - P%) 0 0)`
- sweep line at `left: P%` — 1px, `--color-signal`, small square head above

Write `P` to CSS custom properties with `ref.current.style.setProperty('--p', …)`.
**Do not re-render React at 60fps.**

**Which side ends up which.** These clip-paths put the *already-passed* side on
the left: at P=50 the structure text occupies the left half and the photo the
right. That follows from the concept — "where it has passed, the photo is gone
and the text is there", and the head travels left to right. Earlier drafts of
this brief described the hold frame the other way round ("photo left of the
split, text right"); that was a slip, and the mechanism above is what governs.
Swapping the two `clip-path` declarations is a one-line change if the other
orientation is wanted.

### Layout

The section is `min-height: min(88svh, 780px)`, grid-centred, with padding from
the spacing scale. Nothing fixed in px.

```css
grid-template-columns: minmax(0, 1fr) clamp(280px, 28vw, 420px);
gap: clamp(32px, 5vw, 80px);
```

The image column is not a narrow sidebar. The left column keeps the `<h1>`, the
intro paragraph, the CTAs and the social icons, vertically centred against the
portrait; the dead space above the `<h1>` goes.

- `<h1>` caps at `clamp(2.4rem, 5vw, 3.8rem)` — confident, not shouty.
- Intro paragraph caps at `52ch`.

Below 768px the sweep runs vertically and the structure text stacks — label
above value rather than in a fixed-width column. Never truncate a value.

### Pause control

Top-right of the image box, not beneath it — under the photo it reads as a
caption. Small, icon-only, with an accessible name; `--color-chalk-3`, amber on
hover and focus. Present but quiet.

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
| landscape phone, height < 500px | hero collapses to the static hold frame; no full-height section |

Use container queries for the hero card's internal layout so it responds to its
own box, not the viewport. Use `clamp()` for hero type. No fixed pixel heights on
any section.

`.xray-card` is the named container (`xray`). Its padding, gap, type step and
row template all query it, and `cqi` drives the fluid values in between.

**Two rules stay on the viewport, deliberately:** the card's own width, and the
sweep axis with the row template that follows it. A container cannot size itself
from its own query, and the two layout regimes overlap in inline size -- beside
the copy the card is `clamp(280px, 28vw, 420px)`, stacked above it it is
full-width, which at 360-767px comes to 328-735px. A 340px card is both at once.
The question those rules answer is "is the card beside the copy or above it",
which is a property of the page, not of the box.

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
| `prefers-reduced-motion: reduce` | render the hold frame statically: the sweep parked at 50%, both layers fully readable. Never a blank box, never just `animation: none`. All page transitions and reveals become instant. |
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
- Self-host Archivo and IBM Plex Mono with `font-display: swap`, subset to
  latin, and preload the **three** faces that set above-the-fold text: Archivo
  400, Archivo 700, and IBM Plex Mono 400. (This was originally capped at two,
  which was an arbitrary number rather than a measured budget. The mono carries
  the hero's entire structure layer, so letting it swap would reflow the
  signature moment's most important text on first paint. Three subsetted latin
  woff2 files cost a few KB; the correctness is worth more.) Archivo 600 is not
  preloaded — it appears below the fold only.
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
- `status` — `live | in-progress | archived`. "in-progress" was added because
  "a project with no liveUrl is archived" would have labelled an unshipped
  project as abandoned. The axis only renders once more than one value is
  reachable.
- `stack` — derived from the tags that actually exist.

Remap `ProjectCategory` to the new `type` vocabulary: TriLearn, Expense Tracker
and ArticleHub → `full-stack`; Weather, Movie, Nepal Patra → `API`; Typing Test,
TaskFlow → `tooling`. Add an explicit `status` field to all eight.

Filtering is **plain conditional rendering** — no `AnimatePresence`, no
`layout`, no `layoutId`. All three were tried and all three broke it:
`layoutId` waits on a matching id that never appears so cards never unmount; a
card that is both a variant child and an `AnimatePresence` child gets the
parent's variant pushed back over its exit; and `popLayout` hands each child a
ref that a plain function component silently drops, leaving every card at
opacity 0. Cards appear and disappear without an exit animation. Empty-filter
state is designed, not blank.

**Page transitions.** `AnimatePresence mode="wait"`, exit `opacity → 0` +
`y: -8` at 140ms, enter reverse at `--duration-move`. **Total 380ms.**

This clause originally paired a `--duration-enter` entrance with a 400ms cap.
`mode="wait"` runs the phases in sequence, so that came to 140 + 320 = 460ms and
the two halves of the sentence could not both hold. The cap wins: a route change
is a state flip the reader is waiting through, not a section reveal they are
reading into, and 380ms keeps it under the threshold where navigation starts to
feel weighted.

**Project detail route.** New template with room for an architecture write-up —
prose column, schema/diagram blocks, decision log.

**Prerender all nine.** `PROJECT_ROUTES` in `src/routes.ts` is derived from
`PROJECTS` rather than hand-listed, so adding a project with a `slug` adds its
route, its meta and its static file in one edit. The route count goes from 5 to
**14**; "all five routes must keep prerendering" becomes "all fourteen".

Nine, not ten: the portfolio site itself has no `slug` and therefore no detail
page, because a detail page about the page you are already on says nothing.

Slugs are stored explicitly on each project, never derived at runtime — a slug
is a URL, and it must not change silently because a title was reworded.

`dist/sitemap.xml` is generated from the same route table during prerender. The
old static file in `public/` listed four URLs while the build emitted fourteen,
so every detail page was invisible to a crawler that trusted it.

**The template renders only fields that exist in `PROJECTS` today** — title,
long description, type, status, stack and links. The architecture write-up,
schema blocks and decision log are deliberately absent rather than stubbed:
scaffolding them would ship nine pages of visible placeholder. They arrive in a
later pass with real copy.

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
- confirmation all fourteen routes prerender with correct titles
- the list of device/preference conditions from §4 actually tested, and how
- **Lighthouse:** do not produce scores that cannot be trusted. This
  environment has no throttled Chrome runner, so hand over the exact command
  for Arman to run locally instead of reporting numbers:

  ```
  npm run build && npx vite preview --port 4173
  npx lighthouse http://localhost:4173/ \
    --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless=new" \
    --view
  ```

  Two traps, both hit on the first real run. `--preset=perf` loads a config
  carrying only the performance category, so pairing it with
  `--only-categories` silently drops the other three; mobile form factor and
  simulated throttling are already the defaults, so neither flag was needed.
  And on Windows, Lighthouse's own Chrome dies at launch if a normal Chrome
  is already running -- it surfaces as `Target closed` during setup, before
  any page loads. `--headless=new` avoids the collision.

Ask before inventing any value, metric, or design decision not specified here.

---

## Deferred

Nothing open.

### Cleared

- Legacy motion call sites — zero remain. Home, About, Projects, Contact,
  ContactForm and NotFound are all on the §2 directional variants;
  `RevealWrapper.tsx`, `ScrollReveal.tsx`, the orphaned `useReveal` hook, the
  `.reveal` CSS pair and its `<noscript>` override are deleted.
- Non-eyebrow amber in `NotFound.tsx` — the compass glyph is removed and the
  404 label now uses the muted shared `eyebrow`. One accent, the CTA.
- Page transition total — the brief contradicted itself, pairing a
  `--duration-enter` entrance with a 400ms cap that `mode="wait"` made
  unreachable. Resolved in favour of the cap: 140 + 240 = 380ms. §5 and
  the token comments now agree.
- Expense Tracker's type axis — stays `frontend`. It has a persistence layer
  but no backend of its own, and `fullstack` would overstate it.
- Hero container queries — internal layout now queries the card, not the
  window. The two viewport rules that remain are documented in §4 with the
  overlap that forces them.
- Site-wide `88px` section padding — now `calc(var(--spacing) * 22)` in Skills,
  FeaturedWork and ContactCta. No raw pixel remains in the section rhythm.
