import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Brand } from '../../models/brand.model';
import { Category } from '../../models/category.model';
import { ProductDTO } from '../../models/productDTO.model';
import { CategoryDTO } from '../../models/categoryDTO.model';
import { BrandDTO } from '../../models/brandDTO.model';
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

  getBrands() : Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.url}/${this.brands}`);
  }

  getBrandsCount() : Observable<number>{
    return this.http.get<number>(`${this.url}/${this.brands}/count/`);
  }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/${this.categories}`);
  }

  getCategoryCount() : Observable<number>{
    return this.http.get<number>(`${this.url}/${this.categories}/count/`);
  }

  getCategoryById(id: number) : Observable<Category> {
    return this.http.get<Category>(`${this.url}/${this.categories}/${id}`)
  }

  addCategory(category: CategoryDTO) : Observable<string> {
    return this.http.post<string>(`${this.url}/${this.categories}`, category, {responseType: 'text' as 'json'});
  }

  updateCategory(id: number, category: CategoryDTO) : Observable<string> {
    return this.http.put<string>(`${this.url}/${this.categories}?id=${id}`, category, {responseType: 'text' as 'json'});
  }

  getProducts(highlighted: boolean, pageIndex: number, pageSize: number, categoriesIds: number[], brandsIds: [], filterOrder: FilterOrder): Observable<ProductRequest> {
    return this.http.get<ProductRequest>(`${this.url}/items?ShowOnlyHighlighted=${highlighted}&PageSize=${pageSize}&PageIndex=${pageIndex}&CategoriesIds=${categoriesIds}&BrandsIds${brandsIds}&FilterOrder=${filterOrder}`);
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

  addProduct(product: ProductDTO) : Observable<string> {
    return this.http.post<string>(`${this.url}/${this.products}`, product, {responseType: 'text' as 'json'});
  }

  addBrand(brand: BrandDTO) : Observable<string> {
    return this.http.post<string>(`${this.url}/${this.brands}`, brand, {responseType: 'text' as 'json'});
  }

  updateProduct(id: string, product: ProductDTO) : Observable<string> {
    return this.http.put<string>(`${this.url}/${this.products}/${id}`,product, {responseType: 'text' as 'json'})
  }

  updateBrand(id: number, brand: BrandDTO) : Observable<number> {
    return this.http.put<number>(`${this.url}/${this.brands}?id=${id}`,brand, {responseType: 'text' as 'json'})
  }

  disableProduct(id: string) : Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${this.products}/${id}`)
  }
}

enum FilterOrder {
  None,
  LowestPrice,
  HighestPrice,
}