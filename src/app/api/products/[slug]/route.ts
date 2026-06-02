import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { getProductBySlug } from "@/services/products";

interface ProductRouteContext {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(_request: Request, context: ProductRouteContext) {
  try {
    const { slug } = await context.params;
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ data: product });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid product slug.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Unable to load product." },
      { status: 500 },
    );
  }
}

