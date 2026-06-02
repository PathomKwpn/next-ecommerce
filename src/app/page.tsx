import {
  BrandStorySection,
  HeroSection,
  NewsletterSection,
  ProductRailSection,
} from "@/features/home/components";
import {
  getFeaturedProducts,
  getNewArrivals,
  getTrendingProducts,
} from "@/services/products";

export default async function Home() {
  const [featuredProducts, newArrivals, trendingProducts] = await Promise.all([
    getFeaturedProducts(3),
    getNewArrivals(3),
    getTrendingProducts(3),
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <ProductRailSection
        title="Featured Collection"
        description="Curated PATH silhouettes for the first product story."
        href="/products"
        products={featuredProducts}
      />
      <ProductRailSection
        title="New Arrivals"
        description="Fresh catalog entries sourced through the product service layer."
        href="/products?sort=newest"
        products={newArrivals}
      />
      <ProductRailSection
        title="Trending Products"
        description="Top-rated models prepared for recommendation and comparison flows."
        href="/products?sort=rating"
        products={trendingProducts}
      />
      <BrandStorySection />
      <NewsletterSection />
    </div>
  );
}

