export interface Order {
  id: number;
  customer: {
    name: string;
    email: string;
  };
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "Pending" | "Preparing" | "Completed";
  createdAt: string;
}