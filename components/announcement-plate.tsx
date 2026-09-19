"use client";

import { motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { siteConfig } from "@/lib/site-config";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

/* ------------------------------------------------------------------ clock */

/**
 * The wall clock is an external store, so it is read with
 * useSyncExternalStore rather than an effect writing to state. The server
 * snapshot is 0, which both renders a stable label during SSR and gives us an
 * unambiguous "not ticking yet" value to hydrate against.
 */
let currentTime = 0;

function subscribeToClock(onStoreChange: () => void) {
  currentTime = Date.now();
  const id = setInterval(() => {
    currentTime = Date.now();
    onStoreChange();
  }, 1000);
  return () => clearInterval(id);
}

const subscribeToNothing = () => () => {};
const getSnapshot = () => currentTime;
const getServerSnapshot = () => 0;

const remainingBetween = (iso: string, now: number): Remaining | null => {
  const delta = new Date(iso).getTime() - now;
  if (Number.isNaN(delta) || delta <= 0) return null;
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor(delta / 3_600_000) % 24,
    minutes: Math.floor(delta / 60_000) % 60,
    seconds: Math.floor(delta / 1000) % 60,
  };
};

/* ------------------------------------------------------------------ plate */

const UNITS = ["days", "hours", "minutes", "seconds"] as const;

/**
 * Renders one of three states straight from `siteConfig`:
 *   • dates unset          → an honest "being finalized" plate
 *   • dates set, upcoming  → a live countdown
 *   • dates set, elapsed   → the event label
 * Nothing else on the page needs to know which state we are in.
 */
export function AnnouncementPlate() {
  const eventWindow = siteConfig.window;
  const venue = siteConfig.venue;
  const isScheduled = eventWindow.status === "set";

  const now = useSyncExternalStore(
    isScheduled ? subscribeToClock : subscribeToNothing,
    getSnapshot,
    getServerSnapshot,
  );

  // The venue line is shown in every state; it just changes from a pending
  // marker to a real place once it is known.
  const venueField = (
    <Field label="Venue">
      {venue.status === "set" ? (
        <span className="text-[1.35rem] font-bold tracking-[-0.03em] text-white">
          {venue.value.city}
        </span>
      ) : (
        <Pending>To be announced</Pending>
      )}
    </Field>
  );

  if (eventWindow.status !== "set") {
    return (
      <Plate>
        <Field label="Dates">
          <Pending>Being finalized</Pending>
        </Field>
        <Divider />
        {venueField}
        <Divider />
        <Field label="Duration">
          <span className="numeric text-[1.35rem] font-bold tracking-[-0.03em] text-white">
            {siteConfig.durationHours} hours
          </span>
        </Field>
      </Plate>
    );
  }

  const remaining = now > 0 ? remainingBetween(eventWindow.value.startsAt, now) : null;

  // Before the clock store has ticked (SSR and first paint) and after the event
  // has begun, the plate shows the date label rather than a countdown.
  if (!remaining) {
    return (
      <Plate>
        <Field label="Dates">
          <span className="text-[1.35rem] font-bold tracking-[-0.03em] text-white">
            {eventWindow.value.label}
          </span>
        </Field>
        <Divider />
        {venueField}
      </Plate>
    );
  }

  return (
    <Plate>
      {UNITS.map((unit, i) => (
        <div key={unit} className="flex items-end gap-5">
          {i > 0 ? <Divider /> : null}
          <Field label={unit}>
            <span className="numeric text-[1.7rem] leading-none font-bold tracking-[-0.03em] text-white">
              {String(remaining[unit]).padStart(2, "0")}
            </span>
          </Field>
        </div>
      ))}
      <Divider />
      {venueField}
    </Plate>
  );
}

function Plate({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex flex-wrap items-end gap-x-5 gap-y-3 rounded-2xl border border-white/15 bg-white/[0.07] px-5 py-4 backdrop-blur-md">
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="flex flex-col gap-1.5">
      <span className="text-[0.625rem] font-bold tracking-[0.18em] text-white/45 uppercase">
        {label}
      </span>
      {children}
    </span>
  );
}

function Divider() {
  return <span aria-hidden="true" className="h-8 w-px self-center bg-white/15" />;
}

/** A value we genuinely do not know yet, signalled rather than faked. */
function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-[1.35rem] font-bold tracking-[-0.03em] text-white">
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="size-1.5 rounded-full bg-marigold"
      />
      {children}
    </span>
  );
}
