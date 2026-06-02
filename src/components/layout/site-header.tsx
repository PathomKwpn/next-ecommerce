import { Heart, Scale, ShoppingBag } from "lucide-react";
import Link from "next/link";

import { MAIN_NAVIGATION } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const utilityLinks = [
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Compare", href: "/compare", icon: Scale },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/86 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="PATH home"
        >
          <span className="grid size-9 place-items-center border border-foreground bg-foreground text-sm font-semibold text-background transition-colors group-hover:bg-background group-hover:text-foreground">
            P
          </span>
          <span className="text-lg font-semibold tracking-[0.18em]">PATH</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          {MAIN_NAVIGATION.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 md:flex">
          {utilityLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={cn(
                  "grid size-10 place-items-center text-muted-foreground transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
              </Link>
            );
          })}
        </div>

        <Link
          href="/products"
          className="inline-flex h-10 items-center border border-foreground bg-foreground px-4 text-sm font-semibold text-background transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden"
        >
          Shop
        </Link>
      </div>
    </header>
  );
}

