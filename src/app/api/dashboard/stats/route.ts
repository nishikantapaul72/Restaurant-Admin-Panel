import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch('http://localhost:3001/stats');
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    const stats = await response.json();
    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}
