import { Brand } from "./brand.model";
import { Category } from "./category.model";

export interface Product {
  id: string;
  name: string,
  description: string,
  price: number,
  quantity: number,
  brand: Brand,
  category: Category,
  imageURL: string,
  isActive: boolean,
  isHighlighted: boolean
}
