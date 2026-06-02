"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { createProductSnapshot } from "./commerce-utils";
import type { Product, WishlistItem } from "@/types";

interface WishlistState {
  items: WishlistItem[];
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
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

          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.images[0]?.src ?? "",
                category: product.category,
                product: createProductSnapshot(product),
                addedAt: new Date().toISOString(),
              },
            ],
          };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),
      isWishlisted: (productId) =>
        get().items.some((item) => item.productId === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "path-wishlist",
      storage: createJSONStorage(() => localStorage),
      version: 2,
    },
  ),
);
