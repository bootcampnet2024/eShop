import { Product } from "./product.model";

export interface ProductRequest {
  pageSize: number,
  pageIndex: number,
  count: number,
  items: Product[]
}
