"use client";
import { useState, useCallback } from "react";
import { Order } from "@/types/orders";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      } else {
        setError(data.message || "Failed to fetch orders");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = async (id: number, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Failed to update order status");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { orders, loading, error, fetchOrders, updateOrderStatus };
};