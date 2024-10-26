
export interface Order
{
  id: number;
  city: string;
  street: string;
  state: string;
  country: string;
  zipCode: string;
  cardNumber: string;
  cardHolderName: string;
  cardExpiration: string;
  cardSecurityNumber: string;
  cardTypeId: number;
  items: OrdemItem[];
}

export interface OrdemItem{
      id: string;
      productId: number;
      productName: string;
      unitPrice: number;
      oldUnitPrice: number;
      quantity: number;
      pictureUrl: string;
}