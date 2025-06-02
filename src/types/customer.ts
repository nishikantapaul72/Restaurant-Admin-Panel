export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalcode: string;
    country: string;
  };
  loyaltyPoints: number;
  registeredAt: string;
}

export interface FormData {
  name: string;
  phone: string;
  address: string;
  loyaltyPoints: number;
}
