import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email && password) {
    if (email === "admin@example.com") {
      return NextResponse.json(
        { message: "Email Already Exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  }
  return NextResponse.json({ message: "Invalid data" }, { status: 400 });
}
