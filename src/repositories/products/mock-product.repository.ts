import { products } from "./product.seed";
import type { ProductRepository } from "./product.repository";

export const mockProductRepository: ProductRepository = {
  async findMany() {
    return products;
  },

  async findBySlug(slug) {
    return products.find((product) => product.slug === slug) ?? null;
  },
};

