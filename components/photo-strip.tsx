import Image from "next/image";
import { Parallax, Reveal } from "./primitives";

/**
 * Mood imagery, not event documentation. These are CC0 (public domain)
 * photographs from StockSnap, so nothing here claims to be a picture of this
 * hackathon; when real event photos exist they should replace these files
 * one for one.
 *
 * Each frame is lightly desaturated and carries a thin accent wash, so the
 * photography sits inside the warm cream and teal palette instead of
 * fighting it.
 */
const PHOTOS = [
  {
    src: "/photos/team-build.jpg",
    alt: "A team working together around a table covered in laptops and notes",
    width: 960,
    height: 640,
  },
  {
    src: "/photos/workspace.jpg",
    alt: "Hands typing on a laptop beside printed plans and a notebook",
    width: 960,
    height: 720,
  },
  {
    src: "/photos/team-review.jpg",
    alt: "Two people reviewing written notes together at a shared desk",
    width: 960,
    height: 640,
  },
  {
    src: "/photos/sunrise.jpg",
    alt: "Clouds lit from below at sunrise over a treeline",
    width: 960,
    height: 643,
  },
] as const;

export function PhotoStrip() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {PHOTOS.map((photo, i) => (
            <Reveal as="li" key={photo.src} index={i}>
              <div className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-sand">
                {/* The frame is inset past its own bounds top and bottom so the
                    parallax drift always has cover to move into. Each photo
                    travels a little further than the last, which keeps the row
                    from reading as one sliding block. */}
                <Parallax range={22 + i * 6} className="absolute inset-x-0 -inset-y-[10%]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 639px) 45vw, 22vw"
                    className="h-full w-full object-cover saturate-75 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </Parallax>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-lotus/25 transition-opacity duration-500 group-hover:opacity-0"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
