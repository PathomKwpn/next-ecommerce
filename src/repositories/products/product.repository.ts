import type { Product, ProductFilters } from "@/types";

export interface ProductRepository {
  findMany(filters?: ProductFilters): Promise<Product[]>;
  findBySlug(slug: string): Promise<Product | null>;
}

