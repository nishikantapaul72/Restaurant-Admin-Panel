export interface MenuItem {
  id?: number;
  name: string;
  price: number;
  availability: boolean;
  category: string;
}

export interface FetchMenuItemsParams {
  page?: number;
  limit?: number;
  name?: string;
  category?: string;
}