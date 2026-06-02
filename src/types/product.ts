import type {
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_GENDERS,
  PRODUCT_SIZES,
  PRODUCT_SORT_OPTIONS,
} from "@/constants/catalog";

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type ProductGender = (typeof PRODUCT_GENDERS)[number];
export type ProductSize = (typeof PRODUCT_SIZES)[number];
export type ProductColor = (typeof PRODUCT_COLORS)[number];
export type ProductSortOption = (typeof PRODUCT_SORT_OPTIONS)[number];

export interface ProductImage {
  id: string;
  src: string;
  alt: string;
  color?: ProductColor;
}

export interface ProductVariant {
  id: string;
  color: ProductColor;
  colorHex: string;
  sizes: ProductSize[];
}

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  category: ProductCategory;
  gender: ProductGender;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: ProductImage[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isTrending: boolean;
  isFeatured: boolean;
  materials: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  search?: string;
  category?: ProductCategory;
  gender?: ProductGender;
  size?: ProductSize;
  color?: ProductColor;
  sort?: ProductSortOption;
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

