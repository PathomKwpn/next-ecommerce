"use client";

import { useEffect } from "react";

import { useRecentlyViewedStore } from "@/store";
import type { Product } from "@/types";

interface RecentlyViewedTrackerProps {
  product: Product;
}

export function RecentlyViewedTracker({ product }: RecentlyViewedTrackerProps) {
  const trackProduct = useRecentlyViewedStore((state) => state.trackProduct);

  useEffect(() => {
    trackProduct(product);
  }, [product, trackProduct]);

  return null;
}

