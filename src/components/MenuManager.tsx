"use client";
import { useMenu } from "@/hooks/useMenu";
import { menuItemSchema } from "@/lib/yupSchemas";
import { MenuItem } from "@/types/menu";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function MenuManager() {
  const {
    menuItems,
    categories,
    loading,
    error,
    totalCount,
    currentPage,
    fetchMenuItems,
    fetchCategories,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
  } = useMenu();
  const [showDialog, setShowDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  console.log("total count : ",totalCount);
  interface FormData {
    name: string;
    price: number;
    availability: boolean;
    category: string;
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(menuItemSchema),
    defaultValues: {
      name: "",
      price: 0,
      availability: true,
      category: "",
    },
  });

  const availability = watch("availability");

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Initial load with default pagination
  useEffect(() => {
    fetchMenuItems({
      page: 1,
      limit: rows,
    });
  }, []);

  // Handle pagination changes
  const onPageChange = (event: any) => {
    const newFirst = event.first;
    const newRows = event.rows;
    console.log("new First",newFirst);
    console.log("new Rows",newRows);
    setFirst(newFirst);
    setRows(newRows);

    const newPage = Math.floor(newFirst / newRows);

    fetchMenuItems({
      page: newPage + 1,
      limit: newRows,
      name: searchName || undefined,
      category: selectedCategory || undefined,
    });
  };

  // Handle search and filter changes
  useEffect(() => {
    setFirst(0);
    fetchMenuItems({
      page: 1,
      limit: rows,
      name: searchName || undefined,
      category: selectedCategory || undefined,
    });
  }, [searchName, selectedCategory]);

  const openDialog = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setValue("name", item.name);
      setValue("price", item.price);
      setValue("availability", item.availability);
      setValue("category", item.category);
    } else {
      setEditingItem(null);
      reset();
    }
    setShowDialog(true);
  };

  const onSubmit = async (data: FormData) => {
    if (editingItem) {
      await updateMenuItem({ ...editingItem, ...data });
    } else {
      await addMenuItem(data);
    }
    setShowDialog(false);
    const currentPage = Math.floor(first / rows);
    fetchMenuItems({
      page: currentPage + 1,
      limit: rows,
      name: searchName || undefined,
      category: selectedCategory || undefined,
    });
  };

  const handleDelete = async (id: number) => {
    await deleteMenuItem(id);
    const currentPage = Math.floor(first / rows);
    fetchMenuItems({
      page: currentPage + 1,
      limit: rows,
      name: searchName || undefined,
      category: selectedCategory || undefined,
    });
  };
  const actionBodyTemplate = (rowData: MenuItem) => {
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
          onClick={() => rowData.id && handleDelete(rowData.id)}
        />
      </div>
    );
  };

  const availabilityBodyTemplate = (rowData: MenuItem) => {
    return (
      <span
        className={`font-semibold ${
          rowData.availability ? "text-green-500" : "text-red-500"
        }`}
      >
        {rowData.availability ? "In Stock" : "Out of Stock"}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div className="p-input-icon-left">
            <InputText
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search by name"
              className="p-inputtext-sm"
            />
          </div>
          <Dropdown
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.value)}
            options={[...categories.map((cat) => ({ label: cat, value: cat }))]}
            placeholder="Filter by category"
            className="p-inputtext-sm"
          />
          {(searchName || selectedCategory) && (
            <Button
              icon="pi pi-filter-slash"
              className="p-button-outlined"
              onClick={() => {
                setSearchName("");
                setSelectedCategory("");
              }}
              tooltip="Clear filters"
            />
          )}
        </div>
        <Button
          label="Add Item"
          icon="pi pi-plus"
          className="p-button-raised p-button-primary"
          onClick={() => openDialog()}
        />
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">Error: {error}</div>}

      <DataTable
        value={menuItems}
        className="p-datatable-sm"
        responsiveLayout="scroll"
        paginator
        rows={rows}
        rowsPerPageOptions={[5, 10, 20, 50]}
        first={first}
        onPage={onPageChange}
        totalRecords={totalCount}
        lazy
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} items"
        loading={loading}
      >
        <Column field="name" header="Name" sortable />
        <Column
          field="price"
          header="Price ($)"
          sortable
          body={(rowData) => rowData.price.toFixed(2)}
        />
        <Column
          field="availability"
          header="Availability"
          body={availabilityBodyTemplate}
          sortable
        />
        <Column field="category" header="Category" sortable />
        <Column
          field="action"
          header="Action"
          body={actionBodyTemplate}
          style={{ width: "100px" }}
        />
      </DataTable>

      <Dialog
        header={editingItem ? "Edit Item" : "Add Item"}
        visible={showDialog}
        style={{ width: "400px" }}
        onHide={() => setShowDialog(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <InputText
              id="name"
              {...register("name")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter item name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price ($)
            </label>
            <InputText
              id="price"
              type="number"
              step="0.01"
              {...register("price")}
              className="w-full p-2 border rounded-md"
              placeholder="Enter price"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-700"
            >
              Availability
            </label>
            <Checkbox
              id="availability"
              {...register("availability")}
              checked={availability}
              onChange={(e) => setValue("availability", e.checked ?? false)}
            />
            <span className="ml-2">
              {availability ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Dropdown
              id="category"
              {...register("category")}
              options={categories.map((cat) => ({ label: cat, value: cat }))}
              value={watch("category")}
              onChange={(e) => setValue("category", e.value)}
              placeholder="Select a category"
              className="w-full"
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          <Button
            type="submit"
            label={editingItem ? "Update" : "Add"}
            className="w-full p-button-raised p-button-primary"
          />
        </form>
      </Dialog>
    </div>
  );
}
