"use client";
import { useState, useCallback } from "react";
import { MenuItem } from "@/types/menu";

interface MenuItemData {
  name: string;
  price: number;
  availability: boolean;
  category: string;
}

interface PaginatedResponse {
  items: MenuItem[];
  totalCount: number;
  currentPage: number;
  limit: number;
  message?: string;
}

interface FetchMenuItemsParams {
  page?: number;
  limit?: number;
  name?: string;
  category?: string;
}

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMenuItems = useCallback(async (params: FetchMenuItemsParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const searchParams = new URLSearchParams();
      
      if (params.page) searchParams.append('_page', params.page.toString());
      if (params.limit) searchParams.append('_limit', params.limit.toString());
      
      if (params.name) searchParams.append('name_like', params.name);
      if (params.category) searchParams.append('category', params.category);

      const response = await fetch(`/api/menu/items?${searchParams.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      
      const data: PaginatedResponse = await response.json();
      
      if (response.ok) {
        setMenuItems(data.items);
        setTotalCount(data.totalCount);
        setCurrentPage(data.currentPage);
      } else {
        setError(data.message || "Failed to fetch menu items");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/menu/categories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setCategories(data);
      } else {
        setError(data.message || "Failed to fetch categories");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addMenuItem = async (data: MenuItemData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/menu/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Failed to add item");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateMenuItem = async (data: MenuItem) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/menu/items", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Failed to update item");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteMenuItem = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/menu/items", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Failed to delete item");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
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
    deleteMenuItem 
  };
};