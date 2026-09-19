import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const LINKS = [
  { href: "#mission", label: "Mission" },
  { href: "#process", label: "How it works" },
  { href: "#arc", label: "The 36 hours" },
  { href: "#challenges", label: "Challenges" },
  { href: "#faq", label: "FAQ" },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines [mask-image:linear-gradient(180deg,black,transparent_70%)]" />
        <div className="absolute top-[-40%] left-[30%] size-[30rem] drift-a rounded-full bg-[radial-gradient(circle,rgba(217,155,160,0.30),transparent_68%)] blur-3xl" />
      </div>

      <div className="container-page py-16">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            {/* The mark is black linework on transparent, so it needs a light
                plate to sit on rather than the night ground. */}
            <span className="inline-flex rounded-2xl bg-white px-5 py-4 shadow-deep">
              <Image
                src="/brand/aol-logo.png"
                alt={siteConfig.org}
                width={2287}
                height={967}
                sizes="200px"
                className="h-auto w-[10.5rem]"
              />
            </span>
            <p className="mt-6 text-[0.9375rem] leading-relaxed font-medium text-white/55">
              Built by and for the volunteer community of the {siteConfig.org}.
            </p>
          </div>

          <nav aria-label="Footer">
            <span className="eyebrow-invert">Explore</span>
            <ul className="mt-5 grid grid-cols-2 gap-x-12 gap-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] font-medium text-white/65 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.9375rem] font-medium text-white/65 transition-colors hover:text-white"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.8125rem] font-medium text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.org}
          </span>
          <span>{siteConfig.durationHours} hours · free to join · dates to be announced</span>
        </div>
      </div>
    </footer>
  );
}
