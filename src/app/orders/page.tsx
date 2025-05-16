import OrderManager from "@/components/OrderManager";

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Order Management</h1>
          <OrderManager />
        </div>
      </div>
    </div>
  );
}