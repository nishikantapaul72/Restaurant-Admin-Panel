import DashboardStats from "@/components/DashboardStats";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          <DashboardStats />
        </div>
      </div>
    </div>
  );
}