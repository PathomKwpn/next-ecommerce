import { z } from "zod";

import {
  PRODUCT_CATEGORIES,
  PRODUCT_COLORS,
  PRODUCT_GENDERS,
  PRODUCT_SIZES,
  PRODUCT_SORT_OPTIONS,
} from "@/constants/catalog";

export const productFiltersSchema = z.object({
  search: z.string().trim().optional(),
  category: z.enum(PRODUCT_CATEGORIES).optional(),
  gender: z.enum(PRODUCT_GENDERS).optional(),
  size: z.enum(PRODUCT_SIZES).optional(),
  color: z.enum(PRODUCT_COLORS).optional(),
  sort: z.enum(PRODUCT_SORT_OPTIONS).default("featured"),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(48).default(12),
});

export const productSlugSchema = z.object({
  slug: z.string().min(1),
});

export type ProductFiltersInput = z.infer<typeof productFiltersSchema>;
export type ProductSlugInput = z.infer<typeof productSlugSchema>;

