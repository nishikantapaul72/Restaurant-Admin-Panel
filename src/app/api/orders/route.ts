import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch("http://localhost:3001/orders");
    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    const orders = await response.json();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const { id, status } = data;

    // First, get the existing order
    const getResponse = await fetch(`http://localhost:3001/orders/${id}`);
    if (!getResponse.ok) {
      throw new Error("Order not found");
    }
    const existingOrder = await getResponse.json();

    // Update the order with new status
    const updatedOrder = {
      ...existingOrder,
      status,
    };

    const response = await fetch(`http://localhost:3001/orders/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedOrder),
    });

    if (!response.ok) {
      throw new Error("Failed to update order");
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
