export interface PaginatedResult<T> {
  pageSize: number,
  pageIndex: number,
  totalItems: number,
  items: T[]
}
