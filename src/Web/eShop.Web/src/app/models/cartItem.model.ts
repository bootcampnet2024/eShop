export interface CartItemModel {
  productId: string; 
  quantity: number;
  price: number;
  discount: number;
  finalPrice?: number;
  name: string;
  description: string;
  imageURL: string;
  availableQuantity: number;
  userId: string;
}
