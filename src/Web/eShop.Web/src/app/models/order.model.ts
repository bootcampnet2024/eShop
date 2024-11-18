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

/* Exemplo
{
  "pictureUrl": "string",
  "orderId": 0,
  "buyerId": "string",
  "date": "2024-11-17T02:25:24.059Z",
  "status": "string",
  "description": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "country": "string",
    "zipCode": "string"
  },
  "orderItems": [
    {
      "pictureUrl": "string",
      "productId": "string",
      "productName": "string",
      "units": 0,
      "discount": 0,
      "unitPrice": 0
    }
  ],
  "total": 0
}
*/
