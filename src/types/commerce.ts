import type { ProductColor, ProductSize } from "./product";

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  color: ProductColor;
  size: ProductSize;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
}

export interface ComparisonItem {
  productId: string;
  slug: string;
  addedAt: string;
}

export interface RecentlyViewedItem {
  productId: string;
  slug: string;
  viewedAt: string;
}

