# AOLF Hackathon — landing page

Marketing site for the Art of Living Foundation's first hackathon. Built to look
finished while the event itself is still being planned: every detail that is not
decided yet is a switch in one file, not a hard-coded string scattered across
components.

## Stack

| Piece      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router, Turbopack, React 19)                  |
| Styling    | Tailwind CSS v4 — tokens declared in `app/globals.css @theme` |
| Motion     | Motion 13 (`motion/react`)                                    |
| Type       | EB Garamond (display) + Inter Tight (text), via `next/font`   |
| Deployment | Vercel                                                        |

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Filling in the details as they're decided

Everything still up in the air lives in [`lib/site-config.ts`](lib/site-config.ts)
as an `Announcement<T>` — either `{ status: "tba" }` or `{ status: "set", value }`.
The UI reads the status and upgrades itself. No component edits needed.

**Dates.** Today the hero shows a "being finalized" plate. Set the window and it
becomes a live countdown, and the JSON-LD `Event` schema starts emitting real
`startDate` / `endDate`:

```ts
window: set<EventWindow>({
  startsAt: "2026-11-14T06:00:00-05:00",
  endsAt:   "2026-11-15T18:00:00-05:00",
  label:    "November 14–15, 2026",
}),
```

**Venue.** `venue: set<Venue>({ name: "…", city: "Montreal, QC", mode: "hybrid" })`
replaces "To be announced" in the hero plate.

**Challenge tracks.** While `tracks` is `tba`, the Challenges section renders
`plannedTrackCount` locked placeholder cards. Provide an array of `Track` objects
and it renders the real ones instead.

**Applications.** `applicationsOpen` is the flag to flip when the CTA should
point at an application form rather than the notify list.

Copy, contact address and the 36-hour duration also live in that file.

## The notify form

`POST /api/notify` validates the address, then:

- **`NOTIFY_WEBHOOK_URL` set** → forwards `{ email, source, at }` as JSON and
  returns `{ ok: true }`. Point it at Zapier, Make, a Google Apps Script, or a
  Resend audience endpoint.
- **not set** → returns `{ ok: false, reason: "not-configured" }`, and the client
  falls back to opening a pre-filled email to the address in `site-config`.

That fallback is deliberate: a form that accepts addresses into a void is worse
than one that hands the visitor a working alternative. Set the variable and the
in-page path activates with no code change.

```bash
vercel env add NOTIFY_WEBHOOK_URL
```

## Layout

```
app/
  layout.tsx             fonts, metadata, JSON-LD Event schema
  page.tsx               section composition
  globals.css            @theme tokens, base styles, utilities, keyframes
  icon.svg               favicon (the rising sun)
  opengraph-image.tsx    generated 1200×630 social card
  api/notify/route.ts    notify-list endpoint
components/
  hero.tsx               scroll-driven sunrise + CSS-driven entrance
  arc.tsx                the interactive 36-hour timeline
  announcement-plate.tsx TBA ⇄ countdown
  …
lib/site-config.ts       every undecided detail
reference/               the original single-file draft, kept for copy
```

## Notes on the build

- **The hero entrance is CSS, not JS.** The `h1` is the LCP element; animating it
  with Motion meant shipping it translated out of view until hydration. It now
  uses `@keyframes` with a `--delay` custom property, so it paints on the first
  frame and resolves even if JavaScript never runs. Scroll-linked motion stays in
  JS as progressive enhancement.
- **Reveals degrade.** Scroll reveals are Motion-driven and marked `data-reveal`;
  a `<noscript>` rule forces them visible when JS is unavailable.
- **`prefers-reduced-motion` is honoured** globally in `globals.css` and again in
  components via `useReducedMotion`, which drops the parallax entirely rather
  than merely shortening it.
- **The 36-hour arc is a real tablist** — arrow keys, Home/End, roving
  `tabIndex`, `aria-selected`, and a linked `tabpanel`. Hover is a convenience on
  top, not the only way in.
- **Colour comes from the logo.** The `--color-sun / amber / ember` ramp is
  sampled from the mark's gradient; `--color-ink` is its warm black. Nothing in
  the palette is arbitrary.
- **Every ink step clears WCAG AA.** `ink`, `ink-2`, `ink-3` and `ink-4` were
  chosen against all four surfaces (cream, sand, paper, gold-tint) at 4.5:1 or
  better, so any of them is safe at body size. `gold` is the text-safe member of
  the sun ramp; `sun`, `amber` and `ember` are for fills and strokes only, and
  error text uses `alert` rather than `ember` for the same reason.
- **The type scale is tuned for Garamond.** Its x-height runs well below a
  grotesque's, so display sizes step up roughly 10%, tracking is close to
  neutral instead of tight, and card-level `h3`s carry 500 weight to hold their
  own beside Inter Tight.

## Deploying

```bash
vercel          # preview
vercel --prod   # production
```
