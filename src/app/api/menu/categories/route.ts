import { NextRequest, NextResponse } from "next/server";

const categories = ["Drinks", "Meals", "Desserts", "Snacks"];

export async function GET(request: NextRequest) {
  return NextResponse.json(categories, { status: 200 });
}
