"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createProductSnapshot } from "./commerce-utils";
import type { ComparisonItem, Product } from "@/types";

const MAX_COMPARISON_ITEMS = 4;

interface ComparisonState {
  items: ComparisonItem[];
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isCompared: (productId: string) => boolean;
  clearComparison: () => void;
}

export const useComparisonStore = create<ComparisonState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.productId === product.id);

          if (exists) {
            return {
              items: state.items.filter((item) => item.productId !== product.id),
            };
          }

          const nextItems = [
            ...state.items,
            {
              productId: product.id,
              slug: product.slug,
              product: createProductSnapshot(product),
              addedAt: new Date().toISOString(),
            },
          ];

          return { items: nextItems.slice(-MAX_COMPARISON_ITEMS) };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      isCompared: (productId) =>
        get().items.some((item) => item.productId === productId),
      clearComparison: () => set({ items: [] }),
    }),
    {
      name: "path-comparison",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);

