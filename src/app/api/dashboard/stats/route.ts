import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const stats = {
    totalOrders: 150,
    dailySales: 1200.5,
    weeklySales: 8500.75,
    totalMenuItems: 45,
    dailySalesData: [
      { date: "2025-05-09", sales: 800.2 },
      { date: "2025-05-10", sales: 950.3 },
      { date: "2025-05-11", sales: 700.1 },
      { date: "2025-05-12", sales: 1100.4 },
      { date: "2025-05-13", sales: 900.6 },
      { date: "2025-05-14", sales: 1300.8 },
      { date: "2025-05-15", sales: 1200.5 },
    ],
    weeklySalesData: [
      { week: "Week 1", sales: 7500.25 },
      { week: "Week 2", sales: 8200.5 },
      { week: "Week 3", sales: 7800.75 },
      { week: "Week 4", sales: 8500.75 },
    ],
    dailyOrdersData: [
      { date: "2025-05-09", orders: 20 },
      { date: "2025-05-10", orders: 25 },
      { date: "2025-05-11", orders: 18 },
      { date: "2025-05-12", orders: 30 },
      { date: "2025-05-13", orders: 22 },
      { date: "2025-05-14", sales: 35 },
      { date: "2025-05-15", orders: 28 },
    ],
  };

  return NextResponse.json(stats, { status: 200 });
}
