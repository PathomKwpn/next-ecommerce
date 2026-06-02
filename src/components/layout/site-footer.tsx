import Link from "next/link";

import { FOOTER_NAVIGATION } from "@/constants/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/35 pb-24 md:pb-0">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="PATH home"
          >
            <span className="grid size-8 place-items-center bg-foreground text-xs font-semibold text-background">
              P
            </span>
            <span className="text-base font-semibold tracking-[0.18em]">PATH</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
            Premium sneaker commerce built with a frontend-first experience and
            a backend-ready Next.js architecture.
          </p>
        </div>

        <nav
          className="grid grid-cols-2 gap-3 text-sm text-muted-foreground sm:grid-cols-4 lg:justify-items-end"
          aria-label="Footer navigation"
        >
          {FOOTER_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

