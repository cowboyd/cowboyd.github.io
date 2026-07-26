# cogentdude.com — Design Spec

**Date:** 2026-07-24
**Author:** Charles Lowell (cowboyd@frontside.com)

## Purpose

A personal site for Charles Lowell that serves as both a homepage and a
first-class CV. The CV lives at `/cv` as a web page and is also
available as `/cv.pdf`, generated from the same HTML source of truth.
The site is built with the same stack as `frontside.com`
([staticalize](https://github.com/thefrontside/staticalize) +
[revolution](https://deno.land/x/revolution)) so it can be maintained
alongside that codebase without cognitive overhead.

The design deliberately avoids the corporate-resume tropes (skill
bars, buzzword tables, objective statements, logo walls). Substance
comes from linking to specific code, RFCs, and writing — the reader
draws their own conclusion about depth.

## Non-goals

- No blog posts at launch. The blog route is scaffolded (empty index)
  but no content authored.
- No proxied sites (frontside.com proxies old WordPress content;
  this site has no such requirement).
- No CMS. All content is TSX / Markdown in the repo.
- No dark mode at launch. Add later if it earns its keep.
- No analytics at launch.
- No i18n.

## Stack

Matches `frontside.com` exactly:

- **Runtime:** Deno 2 (no `package.json`, no `node_modules`).
- **JSX:** Revolution's JSX runtime (`"jsxImportSource": "revolution"`).
- **Framework:** `revolution` for routing, HAST middleware, generator-based handlers.
- **Concurrency:** `effection` (transitively via revolution).
- **Styling:** `@twind/core` with `@twind/preset-tailwind` and
  `@twind/preset-typography`, injected via a HAST plugin.
- **Static generation:** `@frontside/staticalize` crawls the running
  server via its sitemap and writes files to `built/`.
- **PDF generation:** `jsr:@astral/astral` — Deno-native headless
  browser (Puppeteer-style API, works without Node). Chosen over
  `npm:playwright` to keep the project pure Deno.
- **Deploy:** Netlify (mirrors frontside.com), preview per PR + prod
  on a designated branch.

## Site Map

```
/              home
/cv            CV as a web page
/cv.pdf        CV as a PDF (in sitemap, staticalized as a binary asset)
/blog          blog index (empty at launch, route stubbed)
/assets/*      static assets
```

The `/blog` route exists so future posts drop in without a
re-architecture, but is empty at launch.

## Page Designs

### `/` (Home)

- Header: name, one-line positioning ("Software architect. Structured
  concurrency, functional programming, testing tools."), primary links
  (GitHub, email, CV).
- Intro: two paragraphs, first person, prose. Signals mastery through
  *how* the writing frames problems, not through adjectives.
- "Currently" line: what he's working on now (Effection 4.x, Frontside
  R&D). Similar to Derek Sivers `/now`, inlined.
- Link to `/cv` and to `cv.pdf`.

### `/cv` (Web CV)

Sections in order:

1. **Header** — name, positioning line, contact links (GitHub, email,
   site URL, Frontside URL). Small "Download PDF" link to
   `/cv.pdf`.
2. **Intro** — two or three paragraphs, first person, prose. Frames
   what he cares about and how he approaches computation. Not a
   summary of the bullets that follow; a genuine paragraph.
3. **Selected Work** — six items, each a paragraph with a headline,
   dates, an impact statement, and a link to the primary artifact
   (repo, RFC, or case study). Draft picks:
   - **Effection** — structured concurrency for JS/TS. Ships v4 with
     delimited continuations under the hood. 837⭐, adopted in
     Frontside client platforms.
   - **Microstates** — composable, functional state primitives for
     JavaScript. 1,303⭐.
   - **therubyracer** — embeds V8 in Ruby; foundational gem in the
     Rails asset-pipeline era. 1,654⭐, ~200 forks.
   - **Continuation** — delimited continuations for JavaScript; the
     theoretical substrate under Effection. Derived by translating an
     OCaml tutorial on delimited continuations first into Lisp, then
     into TypeScript — following the reference implementation across
     three languages to make sure the semantics survived the trip.
   - **Simulacrum / Interactors** — the Frontside testing stack:
     simulation-first acceptance testing that decouples teams from
     mocks.
   - **Backstage for enterprise developer platforms** —
     consulting/OSS work rolling out Backstage at Resideo and others;
     `lspx` and related tooling.
4. **Experience** — reverse-chronological, one short paragraph per
   role (not bullets):
   - **Frontside** (2005–present) — Founder, Head of R&D.
   - **TuneCore** — Consulting Architect / Developer.
   - **ThoughtWorks Inc.** — Software Consultant.
   - **Pre-software:** biochemistry background, pivoted during the
     early web era. One sentence, framed as intellectual
     through-line, not as filler.
5. **Speaking & Writing** — Frontside Podcast (100+ episodes as
   host), guest appearances (devtools.fm ep. 134, Learn With Jason,
   JS Jabber #337, Software Defined Talk), EmberConf 2016, selected
   essays ("The heartbreaking inadequacy of AbortController," "The
   await event horizon in JavaScript," "Announcing Effection 4.0",
   "Deno is the best tool for maintaining NPM packages"). Each
   essay is a link.
6. **Education**
   - **University of Michigan** — BS, Computer Science and
     Linguistics. 2006. 4.0 GPA in major.
   - **LBJ Science Academy** — 1994.
7. **Colophon** — one paragraph naming the fonts, the stack, and a
   link to the source repo. Optional but a nice signal of craft.

### `/cv.pdf`

- A route (not a static file). Handler starts a headless browser,
  loads the site's own `/cv` URL over HTTP with print media
  emulated, returns the PDF bytes with
  `Content-Type: application/pdf`.
- The route participates in the sitemap so staticalize crawls it
  and writes the resulting bytes to `built/cv.pdf`. The generator
  writes binary as-is.
- Playwright/astral is only needed at build time. In dev, the
  route works on demand.

## Visual Design

- **Typography**
  - Display / headings: **Instrument Serif** (Google Fonts) — warm,
    editorial, distinctive without being precious.
  - Body: **JetBrains Mono** (Google Fonts) at a comfortable size
    (16–17px). Mono body reads deliberately and signals a
    developer's voice.
  - Fallback stacks: `Instrument Serif, Georgia, serif` and
    `JetBrains Mono, ui-monospace, SFMono-Regular, monospace`.
- **Palette**
  - Background: off-white `#FAFAF7`.
  - Text: off-black `#1A1A1A`.
  - Accent: muted terracotta `#B85C38` — used sparingly for links,
    the accent line under the header, and small typographic
    ornaments. Never for backgrounds or blocks.
  - Rule / dividers: `#E5E2DA`.
- **Layout**
  - Single column, 65–75ch measure, generous top/bottom padding.
  - No sidebar, no nav bar on `/cv`. On `/`, a minimal top-right
    link cluster to `/cv` and GitHub.
  - Line-height 1.6 for body, 1.2 for display.
  - Section headings in Instrument Serif at ~1.75–2rem with a thin
    rule beneath in the accent color.
- **Density** — prose-first, not a scannable bullet grid. Each
  section reads like a page of a book.

## PDF Export Details

Approach: **HTML-first**, PDF derived by a headless browser. One
source of truth (`/cv`), no drift.

- **Print CSS** (`@media print`)
  - `@page { size: Letter; margin: 0.6in }`.
  - Body 10.5–11pt.
  - Force black on white; keep accent color for links only using
    `print-color-adjust: exact`.
  - Hide non-CV nav / interactive elements / "Download PDF" link.
  - `break-inside: avoid` on role blocks, project blocks, and
    education blocks so they don't split awkwardly.
  - Expand any hover-only or collapsed content.
- **Generation** — at build time, staticalize crawls `/cv.pdf`;
  the handler drives astral against `http://localhost:$PORT/cv`
  with `emulateMedia({ media: 'print' })`, then `page.pdf({ format: 'Letter', printBackground: true })`.
- **Fallback** — user can also hit `Cmd-P` on `/cv` and get a very
  similar result from the print stylesheet alone. The generated
  PDF exists so the downloaded file is deterministic and consistent.

## Directory Layout

```
main.tsx                       entry: createRevolution({...})
deno.json                      imports, tasks, jsxImportSource
deno.lock
twind.config.ts                Twind preset, colors, fonts
routes/
  app.html.tsx                 <AppHtml> layout wrapper
  index.tsx                    /
  cv.tsx                       /cv
  cv-pdf.ts                    /cv.pdf handler
  blog/
    index.tsx                  /blog (empty state)
plugins/
  twind.ts                     HAST → CSS injector (copy from frontside.com)
  sitemap.ts                   sitemap-aware route helper (copy)
  etag.ts                      etag headers (copy)
components/
  header.tsx                   home page header
  cv/                          CV section components
    intro.tsx
    selected-work.tsx
    experience.tsx
    speaking.tsx
    education.tsx
    colophon.tsx
content/
  cv.ts                        typed CV data (projects, roles, talks)
assets/
  fonts/                       (optional: self-hosted Instrument Serif + JetBrains Mono)
  favicon.svg
docs/
  superpowers/specs/           this file
.github/
  workflows/deploy.yaml        Netlify preview + prod
```

CV content lives in a single typed `content/cv.ts` module. Components
render from that module. This keeps the copy in one place and makes it
easy to edit without touching layout.

## Deployment

- **Netlify.** Two-job GitHub Action mirroring
  `frontside.com/.github/workflows/deploy.yaml`:
  - PR preview: run `deno task start` in background, run
    `deno task staticalize`, `netlify deploy` with a PR alias,
    sticky-comment the URL.
  - Production: on push to `production` branch, same steps with
    `netlify deploy --prod`.
- Netlify site ID and auth token stored as repo secrets.

## Local Dev

```bash
deno task dev         # watch + serve on :8005
deno task start       # serve on :8005 without watch
deno task staticalize # crawl live server → built/
```

`staticalize` invocation includes `--site http://localhost:8005 --output built --base https://cogentdude.com`.

## Content Voice Guidelines

- First person on `/` and `/cv` intro; third-person or
  role-descriptive prose in the role/project entries.
- No adjectives-as-substance ("world-class," "10x," "passionate").
  Replace with specifics: what was built, what it does, who uses it,
  what the tricky part was.
- Every "Selected Work" entry ends with a link that a curious
  reader can actually click to see the code / RFC / write-up.
- Sentence-level rhythm matters: mix short and long. Read aloud.

## Success Criteria

1. `deno task dev` boots the site on `:8005` with `/`, `/cv`,
   `/cv.pdf`, `/blog` all rendering.
2. `deno task staticalize` produces a `built/` directory with all
   pages as HTML, `cv.pdf` as a real PDF, all assets, and a valid
   `sitemap.xml`.
3. `/cv` reads as a coherent narrative in Chrome, Safari, and
   Firefox. Print preview in each browser looks like the generated
   `cv.pdf`.
4. `cv.pdf` opens cleanly in Preview, Adobe Reader, and Chrome's
   PDF viewer. Links inside the PDF are clickable.
5. Netlify preview deploy works on PR; prod deploy works from the
   `production` branch.
6. Total repo contains no unreferenced files; no `TODO` markers in
   shipped content.

## Open Questions

None at spec time. Content copy will be iterated during
implementation and reviewed with the user before final publish.
