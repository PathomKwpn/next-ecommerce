"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type {
  CartItem,
  CommerceProductSnapshot,
  Product,
  ProductColor,
  ProductSize,
} from "@/types";

interface AddCartItemInput {
  product: Product;
  color: ProductColor;
  size: ProductSize;
  quantity?: number;
}

interface AddCartSnapshotInput {
  product: CommerceProductSnapshot;
  color: ProductColor;
  size: ProductSize;
  quantity?: number;
}

interface CartState {
  items: CartItem[];
  addItem: (input: AddCartItemInput) => void;
  addSnapshotItem: (input: AddCartSnapshotInput) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: ({ product, color, size, quantity = 1 }) =>
        set((state) => {
          const id = `${product.id}:${color}:${size}`;
          const existingItem = state.items.find((item) => item.id === id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          const image = product.images[0]?.src ?? "";

          return {
            items: [
              ...state.items,
              {
                id,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image,
                color,
                size,
                quantity,
              },
            ],
          };
        }),
      addSnapshotItem: ({ product, color, size, quantity = 1 }) =>
        set((state) => {
          const id = `${product.productId}:${color}:${size}`;
          const existingItem = state.items.find((item) => item.id === id);

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                id,
                productId: product.productId,
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                color,
                size,
                quantity,
              },
            ],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((item) => item.id !== id)
              : state.items.map((item) =>
                  item.id === id ? { ...item, quantity } : item,
                ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "path-cart",
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
);
