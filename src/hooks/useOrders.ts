"use client";
import { useState, useCallback } from "react";
import { FetchOrderItemsParams, Order } from "@/types/orders";
import { ordersApi } from "@/lib/api";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = useCallback(async (params : FetchOrderItemsParams) => {
    setLoading(true);
    setError(null);
    try{
      const apiParams = {
        _page: params.page,
        _limit: params.limit,
        name_like: params.name,
        status: params.status
      };
      const response = await ordersApi.getOrders(apiParams);
      setOrders(response.orders);
      setTotalCount(response.totalCount);
      setCurrentPage(response.currentPage);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = async (id: number, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ordersApi.updateOrderStatus(id, status);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: response.status } : order
        )
      );
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return { orders, loading, error, totalCount, currentPage, fetchOrders, updateOrderStatus };
};