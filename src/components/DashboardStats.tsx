"use client";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import type { ChartData, ChartOptions } from "chart.js";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardStats() {
  const { stats, loading, error, fetchStats } = useDashboard();

  const [dailySalesChartData, setDailySalesChartData] = useState<ChartData>();
  const [dailySalesChartOptions, setDailySalesChartOptions] =
    useState<ChartOptions>();
  const [weeklySalesChartData, setWeeklySalesChartData] = useState<ChartData>();
  const [weeklySalesChartOptions, setWeeklySalesChartOptions] =
    useState<ChartOptions>();
  const [dailyOrdersChartData, setDailyOrdersChartData] = useState<ChartData>();
  const [dailyOrdersChartOptions, setDailyOrdersChartOptions] =
    useState<ChartOptions>();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    if (stats) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      // Daily Sales Line Chart
      if (stats.dailySalesData) {
        const dailySalesData: ChartData = {
          labels: stats.dailySalesData.map((d) =>
            new Date(d.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          ),
          datasets: [
            {
              label: "Daily Sales",
              data: stats.dailySalesData.map((d) => d.sales),
              fill: false,
              borderColor: documentStyle.getPropertyValue("--blue-500"),
              tension: 0.4,
            },
          ],
        };
        const dailySalesOptions: ChartOptions = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: { labels: { color: textColor } },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              ticks: { color: textColorSecondary },
              grid: { color: surfaceBorder },
            },
            y: {
              ticks: { color: textColorSecondary },
              grid: { color: surfaceBorder },
              beginAtZero: true,
            },
          },
        };
        setDailySalesChartData(dailySalesData);
        setDailySalesChartOptions(dailySalesOptions);
      }

      // Weekly Sales Bar Chart
      if (stats.weeklySalesData) {
        const weeklySalesData: ChartData = {
          labels: stats.weeklySalesData.map((d) => d.week),
          datasets: [
            {
              label: "Weekly Sales",
              data: stats.weeklySalesData.map((d) => d.sales),
              backgroundColor: documentStyle.getPropertyValue("--green-500"),
            },
          ],
        };
        const weeklySalesOptions: ChartOptions = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: { labels: { color: textColor } },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              ticks: { color: textColorSecondary },
              grid: { color: surfaceBorder },
            },
            y: {
              ticks: { color: textColorSecondary },
              grid: { color: surfaceBorder },
              beginAtZero: true,
            },
          },
        };
        setWeeklySalesChartData(weeklySalesData);
        setWeeklySalesChartOptions(weeklySalesOptions);
      }

      // Daily Orders Pie Chart
      if (stats.dailyOrdersData) {
        const dailyOrdersData: ChartData = {
          labels: stats.dailyOrdersData.map((d) =>
            new Date(d.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          ),
          datasets: [
            {
              data: stats.dailyOrdersData.map((d) => d.orders),
              backgroundColor: [
                documentStyle.getPropertyValue("--blue-500"),
                documentStyle.getPropertyValue("--green-500"),
                documentStyle.getPropertyValue("--yellow-500"),
                documentStyle.getPropertyValue("--orange-500"),
                documentStyle.getPropertyValue("--purple-500"),
                documentStyle.getPropertyValue("--pink-500"),
                documentStyle.getPropertyValue("--indigo-500"),
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue("--blue-400"),
                documentStyle.getPropertyValue("--green-400"),
                documentStyle.getPropertyValue("--yellow-400"),
                documentStyle.getPropertyValue("--orange-400"),
                documentStyle.getPropertyValue("--purple-400"),
                documentStyle.getPropertyValue("--pink-400"),
                documentStyle.getPropertyValue("--indigo-400"),
              ],
            },
          ],
        };
        const dailyOrdersOptions: ChartOptions = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: textColor,
                padding: 20,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const label = context.label || "";
                  const value = context.raw as number;
                  const total = (context.dataset.data as number[]).reduce(
                    (a, b) => (a || 0) + (b || 0),
                    0
                  );
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value} orders (${percentage}%)`;
                },
              },
            },
          },
        };
        setDailyOrdersChartData(dailyOrdersData);
        setDailyOrdersChartOptions(dailyOrdersOptions);
      }
    }
  }, [stats]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!stats) return null;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <Card title="Total Orders" className="shadow-md h-full">
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
          </Card>
        </div>
        <div className="card">
          <Card title="Total Daily Sales" className="shadow-md h-full">
            <p className="text-2xl font-bold">${stats.dailySales.toFixed(2)}</p>
          </Card>
        </div>
        <div className="card">
          <Card title="Total Weekly Sales" className="shadow-md h-full">
            <p className="text-2xl font-bold">
              ${stats.weeklySales.toFixed(2)}
            </p>
          </Card>
        </div>
        <div className="card">
          <Card title="Total Menu Items" className="shadow-md h-full">
            <p className="text-2xl font-bold">{stats.totalMenuItems}</p>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {dailySalesChartData && dailySalesChartOptions && (
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Daily Sales Trend</h3>
            <Chart
              type="line"
              data={dailySalesChartData}
              options={dailySalesChartOptions}
              className="h-80"
            />
          </div>
        )}
        {weeklySalesChartData && weeklySalesChartOptions && (
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Weekly Sales Trend</h3>
            <Chart
              type="bar"
              data={weeklySalesChartData}
              options={weeklySalesChartOptions}
              className="h-80"
            />
          </div>
        )}
      </div>
      <div className="mt-6">
        {dailyOrdersChartData && dailyOrdersChartOptions && (
          <div className="card">
            <h3 className="text-xl font-semibold mb-2">Daily Orders Trend</h3>
            <Chart
              type="pie"
              data={dailyOrdersChartData}
              options={dailyOrdersChartOptions}
              className="h-80"
            />
          </div>
        )}
      </div>
    </div>
  );
}
