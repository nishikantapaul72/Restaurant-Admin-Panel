import MenuManager from "@/components/MenuManager";

export default function MenuPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Menu Management</h1>
          <MenuManager />
        </div>
      </div>
    </div>
  );
}
