import { NextRequest, NextResponse } from "next/server";

let orders = [
  {
    id: 1,
    customer: { name: "John Doe", email: "john@example.com" },
    items: [
      { name: "Burger", price: 8.99, quantity: 2 },
      { name: "Cola", price: 2.5, quantity: 1 },
    ],
    total: 20.48,
    status: "Pending",
    createdAt: "2025-05-16T10:00:00+06:00",
  },
  {
    id: 2,
    customer: { name: "Jane Smith", email: "jane@example.com" },
    items: [
      { name: "Pizza", price: 12.99, quantity: 1 },
    ],
    total: 12.99,
    status: "Preparing",
    createdAt: "2025-05-16T11:30:00+06:00",
  },
  {
    id: 3,
    customer: { name: "Alice Johnson", email: "alice@example.com" },
    items: [
      { name: "Pasta", price: 9.5, quantity: 1 },
      { name: "Garlic Bread", price: 3.0, quantity: 2 },
    ],
    total: 15.5,
    status: "Delivered",
    createdAt: "2025-05-15T14:45:00+06:00",
  },
  {
    id: 4,
    customer: { name: "Bob Marley", email: "bob@example.com" },
    items: [
      { name: "Steak", price: 18.0, quantity: 1 },
      { name: "Wine", price: 7.5, quantity: 1 },
    ],
    total: 25.5,
    status: "Delivered",
    createdAt: "2025-05-15T19:20:00+06:00",
  },
  {
    id: 5,
    customer: { name: "Charlie Rose", email: "charlie@example.com" },
    items: [
      { name: "Tacos", price: 3.5, quantity: 3 },
      { name: "Juice", price: 2.5, quantity: 2 },
    ],
    total: 15.5,
    status: "Pending",
    createdAt: "2025-05-16T08:10:00+06:00",
  },
  {
    id: 6,
    customer: { name: "David Lee", email: "david@example.com" },
    items: [
      { name: "Sushi", price: 10.0, quantity: 2 },
    ],
    total: 20.0,
    status: "Preparing",
    createdAt: "2025-05-16T12:00:00+06:00",
  },
  {
    id: 7,
    customer: { name: "Eva Green", email: "eva@example.com" },
    items: [
      { name: "Salad", price: 6.5, quantity: 1 },
      { name: "Smoothie", price: 4.0, quantity: 1 },
    ],
    total: 10.5,
    status: "Cancelled",
    createdAt: "2025-05-14T17:25:00+06:00",
  },
  {
    id: 8,
    customer: { name: "Frank Ocean", email: "frank@example.com" },
    items: [
      { name: "Hot Dog", price: 4.0, quantity: 2 },
      { name: "Beer", price: 5.0, quantity: 2 },
    ],
    total: 18.0,
    status: "Delivered",
    createdAt: "2025-05-13T20:00:00+06:00",
  },
  {
    id: 9,
    customer: { name: "Grace Hopper", email: "grace@example.com" },
    items: [
      { name: "Fish & Chips", price: 11.0, quantity: 1 },
    ],
    total: 11.0,
    status: "Preparing",
    createdAt: "2025-05-16T10:20:00+06:00",
  },
  {
    id: 10,
    customer: { name: "Harry Styles", email: "harry@example.com" },
    items: [
      { name: "Burger", price: 8.99, quantity: 1 },
      { name: "Fries", price: 3.0, quantity: 1 },
    ],
    total: 11.99,
    status: "Pending",
    createdAt: "2025-05-16T09:50:00+06:00",
  },
  {
    id: 11,
    customer: { name: "Ivy Chan", email: "ivy@example.com" },
    items: [
      { name: "Ramen", price: 9.99, quantity: 1 },
    ],
    total: 9.99,
    status: "Delivered",
    createdAt: "2025-05-14T13:40:00+06:00",
  },
  {
    id: 12,
    customer: { name: "Jack Ma", email: "jack@example.com" },
    items: [
      { name: "Dumplings", price: 6.0, quantity: 2 },
      { name: "Tea", price: 2.0, quantity: 1 },
    ],
    total: 14.0,
    status: "Cancelled",
    createdAt: "2025-05-15T15:30:00+06:00",
  },
  {
    id: 13,
    customer: { name: "Kelly Rowland", email: "kelly@example.com" },
    items: [
      { name: "Wrap", price: 5.99, quantity: 2 },
    ],
    total: 11.98,
    status: "Preparing",
    createdAt: "2025-05-16T13:00:00+06:00",
  },
  {
    id: 14,
    customer: { name: "Liam Payne", email: "liam@example.com" },
    items: [
      { name: "Fried Rice", price: 7.0, quantity: 1 },
      { name: "Soup", price: 4.0, quantity: 1 },
    ],
    total: 11.0,
    status: "Pending",
    createdAt: "2025-05-16T13:15:00+06:00",
  },
  {
    id: 15,
    customer: { name: "Mila Kunis", email: "mila@example.com" },
    items: [
      { name: "Panini", price: 6.5, quantity: 1 },
      { name: "Coffee", price: 3.0, quantity: 1 },
    ],
    total: 9.5,
    status: "Delivered",
    createdAt: "2025-05-14T08:30:00+06:00",
  },
  {
    id: 16,
    customer: { name: "Noah Brooks", email: "noah@example.com" },
    items: [
      { name: "Nachos", price: 5.5, quantity: 2 },
    ],
    total: 11.0,
    status: "Preparing",
    createdAt: "2025-05-16T14:00:00+06:00",
  },
  {
    id: 17,
    customer: { name: "Olivia Wilde", email: "olivia@example.com" },
    items: [
      { name: "Quesadilla", price: 7.5, quantity: 2 },
    ],
    total: 15.0,
    status: "Pending",
    createdAt: "2025-05-16T14:20:00+06:00",
  },
  {
    id: 18,
    customer: { name: "Paul Allen", email: "paul@example.com" },
    items: [
      { name: "Curry", price: 10.0, quantity: 1 },
      { name: "Rice", price: 3.0, quantity: 1 },
    ],
    total: 13.0,
    status: "Delivered",
    createdAt: "2025-05-13T11:00:00+06:00",
  },
  {
    id: 19,
    customer: { name: "Queen Latifah", email: "queen@example.com" },
    items: [
      { name: "Chicken Wings", price: 9.99, quantity: 1 },
    ],
    total: 9.99,
    status: "Cancelled",
    createdAt: "2025-05-15T10:10:00+06:00",
  },
  {
    id: 20,
    customer: { name: "Ryan Gosling", email: "ryan@example.com" },
    items: [
      { name: "Sushi", price: 10.0, quantity: 3 },
    ],
    total: 30.0,
    status: "Preparing",
    createdAt: "2025-05-16T15:00:00+06:00",
  },
  {
    id: 21,
    customer: { name: "Sara Lee", email: "sara@example.com" },
    items: [
      { name: "Cheesecake", price: 6.0, quantity: 1 },
      { name: "Coffee", price: 3.0, quantity: 1 },
    ],
    total: 9.0,
    status: "Delivered",
    createdAt: "2025-05-14T16:20:00+06:00",
  },
  {
    id: 22,
    customer: { name: "Tom Hardy", email: "tom@example.com" },
    items: [
      { name: "Lasagna", price: 11.5, quantity: 1 },
    ],
    total: 11.5,
    status: "Pending",
    createdAt: "2025-05-16T16:10:00+06:00",
  },
  {
    id: 23,
    customer: { name: "Uma Thurman", email: "uma@example.com" },
    items: [
      { name: "Chow Mein", price: 8.0, quantity: 1 },
      { name: "Iced Tea", price: 2.0, quantity: 1 },
    ],
    total: 10.0,
    status: "Delivered",
    createdAt: "2025-05-12T18:40:00+06:00",
  },
  {
    id: 24,
    customer: { name: "Victor Hugo", email: "victor@example.com" },
    items: [
      { name: "French Fries", price: 3.5, quantity: 2 },
      { name: "Burger", price: 9.0, quantity: 1 },
    ],
    total: 16.0,
    status: "Preparing",
    createdAt: "2025-05-16T16:45:00+06:00",
  },
  {
    id: 25,
    customer: { name: "Wendy Wu", email: "wendy@example.com" },
    items: [
      { name: "Noodles", price: 7.0, quantity: 1 },
      { name: "Spring Rolls", price: 4.0, quantity: 1 },
    ],
    total: 11.0,
    status: "Cancelled",
    createdAt: "2025-05-15T09:30:00+06:00",
  },
];


export async function GET(request: NextRequest) {
  return NextResponse.json(orders, { status: 200 });
}

export async function PUT(request: NextRequest) {
  const { id, status } = await request.json();
  const orderIndex = orders.findIndex((order) => order.id === id);
  if (orderIndex === -1) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  if (!["Pending", "Preparing", "Completed"].includes(status)) {
    return NextResponse.json({ message: "Invalid status" }, { status: 400 });
  }

  orders[orderIndex] = { ...orders[orderIndex], status };
  return NextResponse.json(orders[orderIndex], { status: 200 });
}