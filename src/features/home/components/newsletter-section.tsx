"use client";

import { useState, useTransition } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setMessage("Use a valid email address.");
        return;
      }

      setEmail("");
      setMessage("You're on the PATH list.");
    });
  }

  return (
    <section className="grid gap-8 bg-foreground px-5 py-10 text-background sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-background/60">
          Newsletter
        </p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
          Get launch notes before the drop.
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-12 border border-background/30 bg-background px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-12 rounded-none border-background bg-background px-7 text-foreground hover:bg-background/90 disabled:opacity-60",
            )}
          >
            {isPending ? "Joining..." : "Join"}
          </button>
        </div>
        {message ? <p className="text-sm text-background/70">{message}</p> : null}
      </form>
    </section>
  );
}

