import { Brand } from './brand.model';

export interface BrandRequest {
  pageSize: number,
  pageIndex: number,
  totalItems: number,
  items: Brand[]
}
