"use client";

import { Heart, Home, Scale, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const mobileNavigation = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop", href: "/products", icon: Search },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Compare", href: "/compare", icon: Scale },
  { label: "Cart", href: "/cart", icon: ShoppingBag },
] as const;

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/92 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-16px_40px_rgb(0_0_0/0.08)] backdrop-blur-xl md:hidden"
      aria-label="Mobile navigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {mobileNavigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex h-12 flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted-foreground",
                "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "text-foreground",
              )}
            >
              <Icon className="size-4" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

