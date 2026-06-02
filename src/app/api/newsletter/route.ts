import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { subscribeToNewsletter } from "@/services/newsletter";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const subscription = await subscribeToNewsletter(body);

    return NextResponse.json({ data: subscription }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid newsletter payload.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Unable to subscribe to newsletter." },
      { status: 500 },
    );
  }
}

