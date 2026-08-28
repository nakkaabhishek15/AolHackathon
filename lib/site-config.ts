/**
 * Single source of truth for everything that is still being decided.
 *
 * Dates, venue, and challenge tracks are all `null` today. Fill any of them in
 * and the UI upgrades itself — the hero swaps its "to be announced" plate for a
 * live countdown, the venue line resolves, and the locked track cards are
 * replaced by the real ones. No component edits required.
 */

export type Announcement<T> = { status: "tba"; value: null } | { status: "set"; value: T };

const tba = <T>(): Announcement<T> => ({ status: "tba", value: null });
const set = <T>(value: T): Announcement<T> => ({ status: "set", value });

export type EventWindow = {
  /** ISO 8601 with offset, e.g. "2026-11-14T06:00:00-05:00" */
  startsAt: string;
  endsAt: string;
  /** Human label rendered when the window is set, e.g. "Nov 14–15, 2026" */
  label: string;
};

export type Venue = {
  name: string;
  city: string;
  mode: "in-person" | "virtual" | "hybrid";
};

export type Track = {
  slug: string;
  title: string;
  summary: string;
  /** Rough team capacity for this challenge. */
  teams: string;
  source: string;
};

export const siteConfig = {
  name: "AOLF Hackathon",
  org: "Art of Living Foundation",
  tagline: "36 hours. One sunrise. One team that keeps going.",
  description:
    "The Art of Living Foundation's first hackathon — 36 continuous hours building real solutions to problems sourced from our own community, and the standing volunteer tech team that keeps solving them afterward.",
  url: "https://hackathon.artofliving.ca",
  email: "ghl@artofliving.ca",
  durationHours: 36,

  /** ── Still being decided ──────────────────────────────────── */
  window: tba<EventWindow>(),
  venue: tba<Venue>(),
  tracks: tba<Track[]>(),
  applicationsOpen: false,

  /** How many locked placeholder cards to show while tracks are TBA. */
  plannedTrackCount: 6,
} as const;

/** Kept so the helpers above are exercised and the shape stays honest. */
export const exampleWhenAnnounced = {
  window: set<EventWindow>({
    startsAt: "2026-11-14T06:00:00-05:00",
    endsAt: "2026-11-15T18:00:00-05:00",
    label: "November 14–15, 2026",
  }),
  venue: set<Venue>({ name: "Art of Living Retreat Center", city: "Montreal, QC", mode: "hybrid" }),
};

export const mailto = (subject: string, body?: string) =>
  `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}` +
  (body ? `&body=${encodeURIComponent(body)}` : "");

export const NOTIFY_MAILTO = mailto(
  "Notify me — AOLF Hackathon",
  "Please let me know when applications for the AOLF Hackathon open.\n\nName:\nWhat I'd bring to a team:\n",
);
