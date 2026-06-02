import { mockProductRepository } from "@/repositories/products";
import {
  productFiltersSchema,
  productSlugSchema,
} from "@/lib/validations/products";
import type { Product, ProductFilters, ProductSortOption } from "@/types";

const productRepository = mockProductRepository;

export async function getProducts(filters: ProductFilters = {}) {
  const parsedFilters = productFiltersSchema.parse(filters);
  const products = await productRepository.findMany(filters);
  const filteredProducts = applyProductFilters(products, parsedFilters);
  const sortedProducts = sortProducts(filteredProducts, parsedFilters.sort);
  const page = parsedFilters.page;
  const pageSize = parsedFilters.pageSize;
  const start = (page - 1) * pageSize;

  return {
    items: sortedProducts.slice(start, start + pageSize),
    page,
    pageSize,
    total: sortedProducts.length,
    totalPages: Math.max(1, Math.ceil(sortedProducts.length / pageSize)),
  };
}

export async function getProductBySlug(slug: string) {
  const parsedInput = productSlugSchema.parse({ slug });

  return productRepository.findBySlug(parsedInput.slug);
}

export async function getFeaturedProducts(limit = 4) {
  const { items } = await getProducts({ sort: "featured", pageSize: limit });

  return items.filter((product) => product.isFeatured).slice(0, limit);
}

export async function getNewArrivals(limit = 4) {
  const { items } = await getProducts({ sort: "newest", pageSize: limit });

  return items;
}

export async function getTrendingProducts(limit = 4) {
  const { items } = await getProducts({ sort: "rating", pageSize: limit });

  return items.filter((product) => product.isTrending).slice(0, limit);
}

export async function getRecommendedProducts(slug: string, limit = 4) {
  const parsedInput = productSlugSchema.parse({ slug });
  const product = await getProductBySlug(parsedInput.slug);

  if (!product) {
    return [];
  }

  const { items } = await getProducts({
    category: product.category,
    pageSize: limit + 1,
  });

  const categoryMatches = items.filter((item) => item.slug !== parsedInput.slug);

  if (categoryMatches.length >= limit) {
    return categoryMatches.slice(0, limit);
  }

  const { items: fallbackItems } = await getProducts({
    sort: "rating",
    pageSize: limit + 1,
  });
  const fallbackMatches = fallbackItems.filter(
    (item) =>
      item.slug !== parsedInput.slug &&
      !categoryMatches.some((match) => match.id === item.id),
  );

  return [...categoryMatches, ...fallbackMatches].slice(0, limit);
}

function applyProductFilters(products: Product[], filters: ProductFilters) {
  return products.filter((product) => {
    const search = filters.search?.toLowerCase();
    const matchesSearch = search
      ? [product.name, product.brand, product.description]
          .join(" ")
          .toLowerCase()
          .includes(search)
      : true;

    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;
    const matchesGender = filters.gender ? product.gender === filters.gender : true;
    const matchesSize = filters.size ? product.sizes.includes(filters.size) : true;
    const matchesColor = filters.color
      ? product.colors.includes(filters.color)
      : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesGender &&
      matchesSize &&
      matchesColor
    );
  });
}

function sortProducts(products: Product[], sort: ProductSortOption = "featured") {
  return [...products].sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    if (sort === "price-asc") {
      return a.price - b.price;
    }

    if (sort === "price-desc") {
      return b.price - a.price;
    }

    if (sort === "rating") {
      return b.rating - a.rating;
    }

    return Number(b.isFeatured) - Number(a.isFeatured);
  });
}
