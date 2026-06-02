import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="grid min-h-[calc(100svh-9rem)] gap-10 py-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <h1 className="max-w-3xl text-6xl font-semibold leading-[0.9] tracking-normal text-foreground sm:text-7xl lg:text-8xl">
          PATH
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          A premium sneaker storefront with a product-first frontend and a
          backend-ready Next.js architecture.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/products"
            className={buttonVariants({
              size: "lg",
              className: "h-12 rounded-none px-7",
            })}
          >
            Shop Collection
          </Link>
          <Link
            href="/products?sort=newest"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "h-12 rounded-none px-7",
            })}
          >
            New Arrivals
          </Link>
        </div>
      </div>

      <div className="relative min-h-[26rem] overflow-hidden border border-border bg-card">
        <div className="absolute inset-4 border border-dashed border-foreground/20" />
        <div className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Hero asset frame
        </div>
        <div className="absolute inset-x-10 top-1/2 h-20 -translate-y-1/2 -rotate-12 rounded-full bg-foreground shadow-[0_40px_80px_rgb(0_0_0/0.22)]" />
        <div className="absolute bottom-10 right-8 h-5 w-2/3 rounded-full bg-accent" />
      </div>
    </section>
  );
}

