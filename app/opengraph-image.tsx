import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori needs real font data and cannot read woff2, so the display face is
 * fetched as TTF at build time. If that fetch fails the card still renders in
 * the bundled default — a build should never break over a social image.
 */
async function loadGaramond(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; rv:6.0) Gecko/20110814" } },
    ).then((r) => r.text());

    const url = /src:\s*url\((https:\/\/[^)]+\.ttf)\)/.exec(css)?.[1];
    if (!url) return null;

    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const garamond = await loadGaramond();

  const rays = Array.from({ length: 33 }, (_, i) => {
    const angle = Math.PI * (i / 32);
    const inner = 150;
    const outer = i % 2 === 0 ? 214 : 184;
    return {
      x1: 600 - Math.cos(angle) * inner,
      y1: 630 - Math.sin(angle) * inner,
      x2: 600 - Math.cos(angle) * outer,
      y2: 630 - Math.sin(angle) * outer,
    };
  });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(160deg, #fbf8f3 0%, #fbf0dc 58%, #ffe3b0 100%)",
        padding: "72px 80px",
        position: "relative",
      }}
    >
      <svg width="1200" height="630" style={{ position: "absolute", left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="og-sun" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d2601a" />
            <stop offset="52%" stopColor="#f0980e" />
            <stop offset="100%" stopColor="#ffc93c" />
          </linearGradient>
        </defs>
        <g stroke="#171310" strokeWidth="2" strokeLinecap="round" opacity="0.5">
          {rays.map((ray, i) => (
            <line key={i} {...ray} />
          ))}
        </g>
        <path d="M470 630a130 130 0 0 1 260 0Z" fill="url(#og-sun)" />
        <path d="M470 630a130 130 0 0 1 260 0" fill="none" stroke="#171310" strokeWidth="3" />
      </svg>

      <div
        style={{
          display: "flex",
          fontSize: 21,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: "#8c5d0a",
          fontWeight: 600,
        }}
      >
        The Art of Living Foundation
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontFamily: garamond ? "EB Garamond" : "sans-serif",
            fontSize: garamond ? 94 : 82,
            lineHeight: 1.04,
            color: "#171310",
            letterSpacing: -2,
            maxWidth: 840,
          }}
        >
          Thirty-six hours between one sunrise and the next.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#423a31" }}>
          A hackathon that builds the volunteer tech team · Free to join · Dates to be announced
        </div>
      </div>
    </div>,
    {
      ...size,
      ...(garamond
        ? { fonts: [{ name: "EB Garamond", data: garamond, style: "normal", weight: 400 }] }
        : {}),
    },
  );
}
