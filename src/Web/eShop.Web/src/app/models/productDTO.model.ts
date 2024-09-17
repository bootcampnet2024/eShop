import { Brand } from "./brand.model";
import { Category } from "./category.model";

export interface ProductDTO {
  name: string,
  description: string,
  price: number,
  quantity: number,
  brandId: number,
  categoryId: number,
  imageURL: string,
  isActive: boolean,
  isHighlighted: boolean
}
