"use client";
import { categoriesApi, menuApi } from "@/lib/api";
import { FetchMenuItemsParams, MenuItem } from "@/types/menu";
import { useCallback, useState } from "react";

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMenuItems = useCallback(
    async (params: FetchMenuItemsParams = {}) => {
      setLoading(true);
      setError(null);
      try {
        const apiParams = {
          _page: params.page,
          _limit: params.limit,
          name_like: params.name,
          category: params.category,
        };

        const response = await menuApi.getItems(apiParams);
        setMenuItems(response.items);
        setTotalCount(response.totalCount);
        setCurrentPage(response.currentPage);
      } catch (error: any) {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = await categoriesApi.getAll();
      setCategories(categories);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const addMenuItem = async (data: MenuItem) => {
    setLoading(true);
    setError(null);
    try {
      await menuApi.createItem(data);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateMenuItem = async (data: MenuItem) => {
    setLoading(true);
    setError(null);
    try {
      if (!data.id) throw new Error('Item ID is required');
      await menuApi.updateItem(data.id, data);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteMenuItem = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await menuApi.deleteItem(id);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
};
