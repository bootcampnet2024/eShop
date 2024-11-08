import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Brand } from '../../models/brand.model';
import { Category } from '../../models/category.model';
import { PaginatedResult } from '../../models/paginated-result.model';
import { ProductRequest } from '../../models/product-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  private url: string = "http://localhost:5200";
  private products: string = "products";
  private brands: string = "brands";
  private categories: string = "categories";

  constructor(private http: HttpClient) { }

  getBrands(pageIndex: number, pageSize: number): Observable<PaginatedResult<Brand>> {
    const params : any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    };
    
    return this.http.get<PaginatedResult<Brand>>(`${this.url}/brands`, { params });
  }

  getBrandsCount() : Observable<number>{
    return this.http.get<number>(`${this.url}/${this.brands}/count/`);
  }

  getCategories(pageIndex: number, pageSize: number): Observable<PaginatedResult<Category>> {
    const params : any = {
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
    };
    
    return this.http.get<PaginatedResult<Category>>(`${this.url}/categories`, { params });
  }

  getCategoryCount() : Observable<number>{
    return this.http.get<number>(`${this.url}/${this.categories}/count/`);
  }

  getCategoryById(id: number) : Observable<Category> {
    return this.http.get<Category>(`${this.url}/${this.categories}/${id}`)
  }

  addCategory(category: Category) : Observable<string> {
    return this.http.post<string>(`${this.url}/${this.categories}`, category, {responseType: 'text' as 'json'});
  }

  updateCategory(id: number, category: Category) : Observable<string> {
    return this.http.put<string>(`${this.url}/${this.categories}?id=${id}`, category, {responseType: 'text' as 'json'});
  }

  getProducts(highlighted: boolean, pageIndex: number, pageSize: number, categoriesIds: number[], brandsIds: number[], filterOrder: FilterOrder): Observable<PaginatedResult<Product>> {
    const params : any = {
      ShowOnlyHighlighted: highlighted.toString(),
      PageSize: pageSize.toString(),
      PageIndex: pageIndex.toString(),
      FilterOrder: filterOrder
    };
    
    if (categoriesIds.length > 0) {
      params['CategoriesIds'] = categoriesIds.toString();
    }
    
    if (brandsIds.length > 0) {
      params['BrandsIds'] = brandsIds.toString();
    }
    
    return this.http.get<PaginatedResult<Product>>(`${this.url}/products`, { params });
  }

  getProductCount() : Observable<number>{
    return this.http.get<number>(`${this.url}/${this.products}/count/`);
  }

  getProductById(id: string) : Observable<Product> {
    return this.http.get<Product>(`${this.url}/${this.products}/${id}`)
  }

  getBrandById(id: number) : Observable<Brand> {
    return this.http.get<Brand>(`${this.url}/${this.brands}/${id}`)
  }

  getProductsByName(name: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${this.products}/name/${name}`)
  }

  getCategoriesByName(name: string) : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/${this.categories}/name/${name}`)
  }

  getBrandsByName(name: string) : Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.url}/${this.brands}/name/${name}`)
  }

  addProduct(product: Product) : Observable<string> {
    return this.http.post<string>(`${this.url}/${this.products}`, product, {responseType: 'text' as 'json'});
  }

  addBrand(brand: Brand) : Observable<string> {
    return this.http.post<string>(`${this.url}/${this.brands}`, brand, {responseType: 'text' as 'json'});
  }

  updateProduct(id: string, product: ProductRequest) : Observable<string> {
    return this.http.put<string>(`${this.url}/${this.products}/${id}`,product, {responseType: 'text' as 'json'})
  }

  updateBrand(id: number, brand: Brand) : Observable<number> {
    return this.http.put<number>(`${this.url}/${this.brands}?id=${id}`,brand, {responseType: 'text' as 'json'})
  }

  changeProductState(id: string) : Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${this.products}/${id}`)
  }
}

enum FilterOrder {
  None,
  LowestPrice,
  HighestPrice,
}