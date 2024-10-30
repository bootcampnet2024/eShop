import { Product } from "./product.model";

export interface ProductRequest {
  pageSize: number,
  pageIndex: number,
  totalItems: number,
  items: Product[]
}
