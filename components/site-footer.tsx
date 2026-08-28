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
    <footer className="border-t border-line bg-cream">
      <div className="container-page py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Image
              src="/brand/aol-logo.png"
              alt={siteConfig.org}
              width={2287}
              height={967}
              sizes="200px"
              className="h-auto w-[11.5rem]"
            />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-3">
              Built by and for the volunteer community of the {siteConfig.org}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-2">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line-soft pt-6 text-[0.8125rem] text-ink-4 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.org}
          </span>
          <span>{siteConfig.durationHours} hours · free to join · dates to be announced</span>
        </div>
      </div>
    </footer>
  );
}
