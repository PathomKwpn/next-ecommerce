export function BrandStorySection() {
  return (
    <section className="grid gap-8 border-y border-border py-14 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Brand story
        </p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">
          Designed for movement. Built for scale.
        </h2>
      </div>
      <div className="grid gap-5 text-muted-foreground sm:grid-cols-2">
        <p className="leading-7">
          PATH is a premium sneaker commerce system shaped around clean product
          discovery, fast server-rendered catalog data, and reusable UI modules.
        </p>
        <p className="leading-7">
          Every product surface uses placeholder media frames for now, so real
          campaign assets can be dropped in later without changing the page
          architecture.
        </p>
      </div>
    </section>
  );
}

