"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { useCartStore } from "@/store";

export function CartPageClient() {
  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items],
  );
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  if (!mounted) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <CommerceShell title="Cart" description="Your cart is ready for selected PATH products.">
        <EmptyCommerceState
          title="Your cart is empty"
          description="Add a product from the catalog to start a checkout-ready cart state."
          href="/products"
          action="Shop products"
        />
      </CommerceShell>
    );
  }

  return (
    <CommerceShell title="Cart" description="Review quantities and pricing before checkout.">
      <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
        <section className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 border border-border bg-card p-4 sm:grid-cols-[5rem_1fr_auto]"
            >
              <div className="grid aspect-square place-items-center bg-muted text-xs font-semibold uppercase tracking-[0.16em]">
                PATH
              </div>
              <div>
                <Link
                  href={`/products/${item.slug}`}
                  className="font-semibold underline-offset-4 hover:underline"
                >
                  {item.name}
                </Link>
                <p className="mt-1 text-sm capitalize text-muted-foreground">
                  {item.color} / {item.size}
                </p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="mt-3 text-sm font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                <p className="font-semibold">${item.price * item.quantity}</p>
                <div className="mt-0 flex items-center border border-border sm:mt-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="grid size-9 place-items-center"
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>
                  <span className="grid size-9 place-items-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="grid size-9 place-items-center"
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="h-fit border border-border bg-card p-5 lg:sticky lg:top-24">
          <h2 className="text-lg font-semibold">Summary</h2>
          <form
            className="mt-4 grid gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              setPromoApplied(promoCode.trim().toUpperCase() === "PATH10");
            }}
          >
            <label className="text-sm font-medium" htmlFor="promo-code">
              Promo code
            </label>
            <div className="grid grid-cols-[1fr_auto]">
              <input
                id="promo-code"
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
                placeholder="PATH10"
                className="h-11 border border-input bg-background px-3 text-sm outline-none focus:border-ring"
              />
              <button className="h-11 bg-foreground px-4 text-sm font-semibold text-background">
                Apply
              </button>
            </div>
            {promoApplied ? (
              <p className="text-sm text-muted-foreground">10% discount applied.</p>
            ) : null}
          </form>

          <div className="mt-5 grid gap-3 border-t border-border pt-5 text-sm">
            <SummaryRow label="Subtotal" value={subtotal} />
            <SummaryRow label="Discount" value={-discount} />
            <SummaryRow label="Shipping" value={0} />
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            className={buttonVariants({
              size: "lg",
              className: "mt-5 h-12 w-full rounded-none",
            })}
          >
            Checkout Ready
          </button>
          <button
            type="button"
            onClick={clearCart}
            className="mt-3 w-full text-sm font-semibold text-muted-foreground hover:text-foreground"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </CommerceShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <span>{label}</span>
      <span>${value.toFixed(2)}</span>
    </div>
  );
}

function CartSkeleton() {
  return (
    <CommerceShell title="Cart" description="Loading persisted cart state.">
      <div className="h-40 animate-pulse bg-muted" />
    </CommerceShell>
  );
}

function CommerceShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-border pb-8">
        <h1 className="text-4xl font-semibold sm:text-6xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

function EmptyCommerceState({
  title,
  description,
  href,
  action,
}: {
  title: string;
  description: string;
  href: string;
  action: string;
}) {
  return (
    <div className="border border-dashed border-border bg-card px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <Link
        href={href}
        className={buttonVariants({
          size: "lg",
          className: "mt-6 h-12 rounded-none px-7",
        })}
      >
        {action}
      </Link>
    </div>
  );
}

