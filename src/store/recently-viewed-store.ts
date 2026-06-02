"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createProductSnapshot } from "./commerce-utils";
import type { Product, RecentlyViewedItem } from "@/types";

const MAX_RECENTLY_VIEWED_ITEMS = 8;

interface RecentlyViewedState {
  items: RecentlyViewedItem[];
  trackProduct: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      trackProduct: (product) =>
        set((state) => {
          const nextItem: RecentlyViewedItem = {
            productId: product.id,
            slug: product.slug,
            product: createProductSnapshot(product),
            viewedAt: new Date().toISOString(),
          };

          return {
            items: [
              nextItem,
              ...state.items.filter((item) => item.productId !== product.id),
            ].slice(0, MAX_RECENTLY_VIEWED_ITEMS),
          };
        }),
      clearRecentlyViewed: () => set({ items: [] }),
    }),
    {
      name: "path-recently-viewed",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

