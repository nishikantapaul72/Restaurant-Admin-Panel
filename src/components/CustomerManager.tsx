'use client';
import { useCustomer } from "@/hooks/useCustomer";
import { customerDetailsSchema } from "@/lib/yupSchemas";
import { Customer, FormData } from "@/types/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
function CustomerManager() {
  const { customers, fetchCustomers, updateCustomerDetails, deleteCustomer } = useCustomer();
  const [editingDetails, setEditingDetails] = useState<Customer | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const { handleSubmit, register, setValue, reset
    , formState: { errors }
  } = useForm({
    resolver: yupResolver(customerDetailsSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      loyaltyPoints: 0,
    }
  });
  useEffect(() => {
    fetchCustomers();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.slice(3, 15);
  }

  const onSubmit = async (data: FormData) => {
    console.log("Form data : ", data);
    console.log("Form Data : --> existy:: ", editingDetails);
    if (editingDetails) {
      const updatedCustomer: Customer = {
        ...editingDetails,
        name: data.name,
        phone: data.phone,
        loyaltyPoints: data.loyaltyPoints,
        address: {
          ...editingDetails.address,
          city: data.address
        }
      };
      console.log("Updated Customer --> ", updatedCustomer);
      await updateCustomerDetails(updatedCustomer);
    }
  }
  const openDialog = (Details?: Customer) => {
    console.log("Open Dialog : ", Details)
    if (Details) {
      setEditingDetails(Details);
      setValue("name", Details.name);
      setValue("phone", Details.phone);
      setValue("address", Details.address.city);
      setValue("loyaltyPoints", Details.loyaltyPoints);
    } else {
      setEditingDetails(null);
      reset();
    }
    setShowDialog(true);
  }

  const handleDelete = async (id: number) => {
    await deleteCustomer(id);
  }
  const actionBodyTemplate = (rowData: Customer) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success"
          onClick={() => openDialog(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData.id)}
        />
      </div>
    )
  }
  console.log('Customer Manager --> ', customers);
  return (
    <div className="space-y-4 bg-red-600">
      <DataTable
        value={customers}
      >
        <Column field="name" header="Name" sortable />
        <Column field="phone" header="Phone Number" sortable
          body={(rowData) => formatPhoneNumber(rowData.phone)}
        />
        <Column field="address.city" header="Address(City)" sortable />
        <Column field="loyaltyPoints" header="Loyalty Points" sortable />
        <Column field="registeredAt" header="Registration Date" sortable
          body={(rowData) => formatDate(rowData.registeredAt)}
        />
        <Column field="action" header="Action"
          body={actionBodyTemplate}
        />
      </DataTable>
      <Dialog
        header={editingDetails ? "Edit Customer Details" : "Add Customer Details"}
        visible={showDialog}
        style={{ width: "400px" }}
        onHide={() => setShowDialog(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <InputText
              id="name"
              {...register("name")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Customer Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <InputText
              id="phoneNumber"
              {...register("phone")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Phone Number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <InputText
              id="address"
              {...register("address")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="loyaltyPoints" className="block text-sm font-medium text-gray-700">
              Loyalty Points
            </label>
            <InputText
              id="loyaltyPoints"
              type="number"
              {...register("loyaltyPoints")}
              className="w-full border rounded-md"
              placeholder="Enter Loyalty Points"
            />
            {errors.loyaltyPoints && (
              <p className="text-red-500 text-sm">{errors.loyaltyPoints.message}</p>
            )}
          </div>
          <Button
            type="submit"
            label={editingDetails ? "Update" : "Add"}
            className="w-full p-button-raised p-button-primary"
          />
        </form>
      </Dialog>
    </div>
  )
}

export default CustomerManager
