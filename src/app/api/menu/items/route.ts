import { NextRequest, NextResponse } from "next/server";

let menuItems = [
  {
    id: 1,
    name: "Burger",
    price: 8.99,
    availability: true,
    category: "Meals",
  },
  {
    id: 2,
    name: "Mojo",
    price: 2.5,
    availability: false,
    category: "Drinks",
  },
];

export async function GET(request: NextRequest) {
  return NextResponse.json(menuItems, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { name, price, availability, category } = await request.json();
  if (!name || !price || !category) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const newItem = {
    id: menuItems.length + 1,
    name,
    price: parseFloat(price),
    availability: availability ?? true,
    category,
  };
  menuItems.push(newItem);
  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const { id, name, price, availability, category } = await request.json();
  const itemIndex = menuItems.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }

  menuItems[itemIndex] = {
    ...menuItems[itemIndex],
    name: name ?? menuItems[itemIndex].name,
    price: price ? parseFloat(price) : menuItems[itemIndex].price,
    availability: availability ?? menuItems[itemIndex].availability,
    category: category ?? menuItems[itemIndex].category,
  };
  return NextResponse.json(menuItems[itemIndex], { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const itemIndex = menuItems.findIndex((item) => item.id === id);
  if (itemIndex === -1) {
    return NextResponse.json({ message: "Item not found" }, { status: 404 });
  }
  menuItems = menuItems.filter((item) => item.id !== id);
  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
