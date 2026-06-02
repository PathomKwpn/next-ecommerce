import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { productFiltersSchema } from "@/lib/validations/products";
import { getProducts } from "@/services/products";

export async function GET(request: Request) {
  try {
    const query = Object.fromEntries(new URL(request.url).searchParams);
    const filters = productFiltersSchema.parse(query);
    const products = await getProducts(filters);

    return NextResponse.json({ data: products });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid product filters.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Unable to load products." },
      { status: 500 },
    );
  }
}
