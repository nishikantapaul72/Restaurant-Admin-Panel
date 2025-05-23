"use client";
import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useOrders } from "@/hooks/useOrders";
import { Order } from "@/types/orders";

export default function OrderManager() {
  const { orders, loading, error, totalCount, currentPage, fetchOrders, updateOrderStatus } =
    useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  console.log("Status",selectedStatus);
  useEffect(() => {
    fetchOrders({
      page: 1,
      limit: rows,
    });
  }, []);

  const statusOptions = [
    { label: "Pending", value: "Pending" },
    { label: "Preparing", value: "Preparing" },
    { label: "Completed", value: "Completed" },
    { label: "Delivered", value: "Delivered" },
  ];

  const handleStatusChange = async (order: Order, status: string) => {
    await updateOrderStatus(order.id, status);
    fetchOrders({
      page: currentPage,
      limit: rows,
      name: searchName || undefined,
      status: selectedStatus || undefined,
    });
  };

  const onPageChange = (event: any) => {
    const newFirst = event.first;
    const newRows = event.rows;
    setFirst(newFirst);
    setRows(newRows);

    const newPage = Math.floor(newFirst / newRows);

    fetchOrders({
      page: newPage + 1,
      limit: newRows,
      name: searchName || undefined,
      status: selectedStatus || undefined,
    });
  };

  useEffect(()=>{
    setFirst(0);
    fetchOrders({
      page: 1,
      limit: rows,
      name: searchName || undefined,
      status: selectedStatus || undefined,
    });
  },[searchName, selectedStatus]);

  const statusBodyTemplate = (rowData: Order) => {
    return (
      <Dropdown
        value={rowData.status}
        options={statusOptions}
        onChange={(e) => handleStatusChange(rowData, e.value)}
        placeholder="Select Status"
        className="w-40"
      />
    );
  };

  const actionBodyTemplate = (rowData: Order) => {
    return (
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-info"
        onClick={() => {
          setSelectedOrder(rowData);
          setShowDetailsDialog(true);
        }}
      />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <div className="p-input-icon-left">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search by customer name"
              className="p-inputtext p-component p-filled w-full"
            />
          </div>
          <Dropdown
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.value)}
            options={statusOptions}
            placeholder="Filter by status"
            className="w-48"
          />
          {(searchName || selectedStatus) && (
            <Button
              icon="pi pi-filter-slash"
              className="p-button-outlined"
              onClick={() => {
                setSearchName("");
                setSelectedStatus("");
              }}
              tooltip="Clear filters"
            />
          )}
        </div>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      <DataTable
        value={orders}
        className="p-datatable-sm"
        responsiveLayout="scroll"
        paginator
        rows={rows}
        rowsPerPageOptions={[5, 10, 20, 50]}
        first={first}
        totalRecords={totalCount}
        onPage={onPageChange}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
      >
        <Column field="id" header="Order ID" sortable />
        <Column field="customer.name" header="Customer" sortable />
        <Column
          field="total"
          header="Total ($)"
          sortable
          body={(rowData) => rowData.total.toFixed(2)}
        />
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          sortable
        />
        <Column
          field="createdAt"
          header="Created At"
          sortable
          body={(rowData) => formatDate(rowData.createdAt)}
        />
        <Column
          body={actionBodyTemplate}
          header="Details"
          style={{ width: "100px" }}
        />
      </DataTable>

      <Dialog
        header={`Order #${selectedOrder?.id} Details`}
        visible={showDetailsDialog}
        style={{ width: "500px" }}
        onHide={() => setShowDetailsDialog(false)}
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold">Customer Info</h3>
              <p>Name: {selectedOrder.customer.name}</p>
              <p>Email: {selectedOrder.customer.email}</p>
            </div>
            <div>
              <h3 className="font-bold">Order Items</h3>
              <ul className="list-disc pl-5">
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price.toFixed(2)} x {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold">Total</h3>
              <p>${selectedOrder.total.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-bold">Status</h3>
              <p>{selectedOrder.status}</p>
            </div>
            <div>
              <h3 className="font-bold">Created At</h3>
              <p>{formatDate(selectedOrder.createdAt)}</p>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
