import { Category } from './category.model';

export interface CategoryRequest {
  pageSize: number,
  pageIndex: number,
  totalItems: number,
  items: Category[]
}
