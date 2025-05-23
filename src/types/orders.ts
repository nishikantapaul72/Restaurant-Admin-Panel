export interface Order {
  id: number;
  customer: {
    customerId: number;
    name: string;
    email: string;
  };
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "Pending" | "Preparing" | "Completed" | "Delivered";
  createdAt: string;
}


export interface FetchOrderItemsParams {
  page?: number;
  limit?: number;
  name?: string;
  status?: string;
}