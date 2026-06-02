export const MAIN_NAVIGATION = [
  { label: "New Arrivals", href: "/products?sort=newest" },
  { label: "Men", href: "/products?gender=men" },
  { label: "Women", href: "/products?gender=women" },
  { label: "Unisex", href: "/products?gender=unisex" },
] as const;

export const UTILITY_NAVIGATION = [
  { label: "Wishlist", href: "/wishlist" },
  { label: "Compare", href: "/compare" },
  { label: "Cart", href: "/cart" },
] as const;

export const FOOTER_NAVIGATION = [
  { label: "Products", href: "/products" },
  { label: "Wishlist", href: "/wishlist" },
  { label: "Compare", href: "/compare" },
  { label: "Cart", href: "/cart" },
] as const;

