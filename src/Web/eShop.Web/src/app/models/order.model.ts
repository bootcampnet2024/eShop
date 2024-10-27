export interface Order {
  id: number;
  address: Address;
  date: Date;
  status: string;
  total: number;
  items: OrdemItem[];
}

export interface Address {
  city: string;
  street: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface OrdemItem {
  id: string;
  productId: number;
  productName: string;
  unitPrice: number;
  discount: number;
  units: number;
  pictureUrl: string;
}
