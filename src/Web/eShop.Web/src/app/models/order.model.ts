export interface Order {
  orderId: number;
  pictureUrl: string;
  buyerId: string;
  address: Address;
  date: Date;
  status: string;
  total: number;
  items: OrderItem[];
}

export interface Address {
  city: string;
  street: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  unitPrice: number;
  discount: number;
  units: number;
  pictureUrl: string;
}
