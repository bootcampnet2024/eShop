export interface Product {
  id: string;
  name: string,
  description: string,
  price: number,
  discount: number,
  finalPrice: number,
  quantity: number,
  brand: string,
  category: string,
  imageURL: string,
  isActive: boolean,
  isHighlighted: boolean,
  createdAt: Date,
  updatedAt: Date
}
