export interface Order {
  orderId: number;
  pictureUrl: string;
  buyerId: string;
  address: Address;
  date: string;
  status: string;
  total: number;
  orderItems: OrderItem[];
}

export interface Address {
  city: string;
  street: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  unitPrice: number;
  discount: number;
  units: number;
  pictureUrl: string;
}
