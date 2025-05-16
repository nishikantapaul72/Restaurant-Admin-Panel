import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email === "admin@example.com" && password === "admin@example.com") {
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
