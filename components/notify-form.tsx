"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { NOTIFY_MAILTO, siteConfig } from "@/lib/site-config";
import { ArrowIcon, Button } from "./primitives";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "fallback" }
  | { kind: "error"; message: string };

export function NotifyForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state.kind === "sending") return;
    setState({ kind: "sending" });

    try {
      const response = await fetch("/api/notify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data: { ok: boolean; reason?: string } = await response.json();

      if (data.ok) {
        setState({ kind: "done" });
        return;
      }

      if (data.reason === "invalid-email") {
        setState({ kind: "error", message: "That address doesn't look right." });
        return;
      }

      // No provider wired up yet, so hand the visitor a pre-filled email instead
      // of a confirmation we can't honour.
      setState({ kind: "fallback" });
      window.location.href = NOTIFY_MAILTO;
    } catch {
      setState({ kind: "error", message: "Something went wrong. Try emailing us instead." });
    }
  }

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait" initial={false}>
        {state.kind === "done" ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 rounded-2xl border border-accent/35 bg-tint px-5 py-4 text-[0.9375rem] font-medium text-ink"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="size-3"
              >
                <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            You&rsquo;re on the list. We&rsquo;ll email you the day applications open.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            noValidate
          >
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <label htmlFor="notify-email" className="sr-only">
                Email address
              </label>
              <input
                id="notify-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (state.kind === "error") setState({ kind: "idle" });
                }}
                aria-invalid={state.kind === "error"}
                className="min-w-0 flex-1 rounded-full border border-line bg-paper px-5 py-3.5 text-[0.9375rem] font-medium text-ink shadow-lift transition-[border-color,box-shadow] duration-300 placeholder:text-ink-4 focus:border-accent focus:shadow-raise focus:outline-none"
              />
              <Button type="submit" variant="primary" disabled={state.kind === "sending"}>
                {state.kind === "sending" ? "Sending…" : "Notify me"}
                {state.kind === "sending" ? null : <ArrowIcon />}
              </Button>
            </div>

            <p
              className="mt-3 min-h-5 text-[0.8125rem] font-medium text-ink-3"
              role={state.kind === "error" ? "alert" : undefined}
            >
              {state.kind === "error" ? (
                <span className="text-alert">{state.message}</span>
              ) : state.kind === "fallback" ? (
                <>
                  Opening a pre-filled email to {siteConfig.email}. Hit send and you&rsquo;re on the
                  list.
                </>
              ) : (
                <>One email, sent once, the day applications go live. Nothing else, ever.</>
              )}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
