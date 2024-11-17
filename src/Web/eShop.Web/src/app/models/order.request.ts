export interface OrderRequest {
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
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: string;
  productName: string;
  unitPrice: number;
  oldUnitPrice: number;
  quantity: number;
  pictureUrl: string;
}

/* Exemplo:
{
    "city": "string",
    "street": "string",
    "state": "string",
    "country": "string",
    "zipCode": "string",
    "cardNumber": "string",
    "cardHolderName": "string",
    "cardExpiration": "2024-11-17T02:25:24.056Z",
    "cardSecurityNumber": "string",
    "cardTypeId": 0,
    "items": [
      {
        "productId": "string",
        "productName": "string",
        "unitPrice": 0,
        "oldUnitPrice": 0,
        "quantity": 0,
        "pictureUrl": "string"
      }
    ]
  }
*/
