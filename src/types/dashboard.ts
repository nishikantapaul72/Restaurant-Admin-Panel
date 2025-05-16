export interface DashboardStats {
  totalOrders: number;
  dailySales: number;
  weeklySales: number;
  totalMenuItems: number;
  dailySalesData: { date: string; sales: number }[];
  weeklySalesData: { week: string; sales: number }[];
  dailyOrdersData: { date: string; orders: number }[];
}
