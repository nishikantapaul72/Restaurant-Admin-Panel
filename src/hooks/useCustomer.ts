"use client";
import { customerApi } from "@/lib/api";
import { Customer } from "@/types/customer";
import { useCallback, useState } from "react";

export const useCustomer = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchCustomers = useCallback(async () => {
    const response = await customerApi.getCustomers();
    console.log("Customer Hook ( response ) --> ", response);
    setCustomers(response);
  }, []);

  const updateCustomerDetails = async (data: Customer) => {
    setLoading(true);
    setError(null);
    console.log("From hook;;; ", data);
    try {
      if (!data.id) {
        throw new Error("Customer ID is required");
      }
      await customerApi.updateCustomerDetails(data.id, data);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await customerApi.deleteCustomer(id);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return { customers, fetchCustomers, updateCustomerDetails, deleteCustomer };
};
