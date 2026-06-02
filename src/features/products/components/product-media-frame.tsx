import type { Product } from "@/types";

interface ProductMediaFrameProps {
  product: Product;
}

export function ProductMediaFrame({ product }: ProductMediaFrameProps) {
  const colorLabel = product.colors.join(" / ");

  return (
    <div className="relative grid aspect-[4/5] overflow-hidden border border-border bg-muted">
      <div className="absolute inset-3 border border-dashed border-foreground/20" />
      <div className="absolute left-4 top-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
        Asset frame
      </div>
      <div className="m-auto flex w-4/5 rotate-[-12deg] flex-col gap-3">
        <div className="h-14 rounded-full bg-foreground/90 shadow-[0_22px_40px_rgb(0_0_0/0.18)]" />
        <div className="ml-auto h-5 w-2/3 rounded-full bg-accent" />
        <div className="h-3 w-4/5 rounded-full bg-foreground/20" />
      </div>
      <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
        <p className="text-xs font-medium text-muted-foreground">{colorLabel}</p>
        <p className="text-xs font-semibold uppercase tracking-[0.16em]">
          {product.brand}
        </p>
      </div>
    </div>
  );
}
