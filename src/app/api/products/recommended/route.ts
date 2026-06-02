import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

import { getRecommendedProducts } from "@/services/products";

const recommendedProductsQuerySchema = z.object({
  slug: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(12).default(4),
});

export async function GET(request: Request) {
  try {
    const query = Object.fromEntries(new URL(request.url).searchParams);
    const { slug, limit } = recommendedProductsQuerySchema.parse(query);
    const products = await getRecommendedProducts(slug, limit);

    return NextResponse.json({ data: products });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid recommended products query.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Unable to load recommended products." },
      { status: 500 },
    );
  }
}

