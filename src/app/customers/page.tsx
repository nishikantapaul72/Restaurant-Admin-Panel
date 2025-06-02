import CustomerManager from "@/components/CustomerManager";

export default function Customerspage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold">Customer Management</h1>
          <CustomerManager/>
        </div>
      </div>
    </div>
  )
}
