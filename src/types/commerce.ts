import type {
  ProductCategory,
  ProductColor,
  ProductGender,
  ProductSize,
} from "./product";

export interface CommerceProductSnapshot {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice: number | null;
  image: string;
  category: ProductCategory;
  gender: ProductGender;
  colors: ProductColor[];
  sizes: ProductSize[];
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  brand: string;
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
  brand: string;
  price: number;
  image: string;
  category: ProductCategory;
  product: CommerceProductSnapshot;
  addedAt: string;
}

export interface ComparisonItem {
  productId: string;
  slug: string;
  product: CommerceProductSnapshot;
  addedAt: string;
}

export interface RecentlyViewedItem {
  productId: string;
  slug: string;
  product: CommerceProductSnapshot;
  viewedAt: string;
}
