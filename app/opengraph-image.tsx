import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} · ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Satoshi Bold, as static TTF. Satori needs real font data and cannot read woff2. */
const SATOSHI_BOLD_TTF =
  "https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.ttf";

/**
 * Fetched once at build time. If the fetch fails the card still renders in the
 * bundled default; a build should never break over a social image.
 */
async function loadSatoshi(): Promise<ArrayBuffer | null> {
  try {
    const response = await fetch(SATOSHI_BOLD_TTF);
    if (!response.ok) return null;
    return await response.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const satoshi = await loadSatoshi();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(140deg, #2e1b21 0%, #4a2b35 55%, #5c3a45 100%)",
        padding: "72px 80px",
        position: "relative",
        fontFamily: satoshi ? "Satoshi" : "sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: -160,
          top: -160,
          width: 620,
          height: 620,
          borderRadius: 620,
          background: "radial-gradient(circle, rgba(217,155,160,0.5), rgba(217,155,160,0) 68%)",
        }}
      />

      <div
        style={{
          display: "flex",
          fontSize: 21,
          letterSpacing: 5,
          textTransform: "uppercase",
          color: "#f0c4c7",
          fontWeight: 700,
        }}
      >
        The Art of Living Foundation
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.02,
            color: "#ffffff",
            letterSpacing: -3.5,
            maxWidth: 860,
          }}
        >
          Thirty-six hours between one sunrise and the next.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
          A hackathon that builds the volunteer tech team · Free to join · Dates to be announced
        </div>
      </div>
    </div>,
    {
      ...size,
      ...(satoshi
        ? { fonts: [{ name: "Satoshi", data: satoshi, style: "normal", weight: 700 }] }
        : {}),
    },
  );
}
