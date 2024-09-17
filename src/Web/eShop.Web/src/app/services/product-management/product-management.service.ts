import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { Brand } from '../../models/brand.model';
import { Category } from '../../models/category.model';
import { ProductDTO } from '../../models/productDTO.model';

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

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/${this.categories}`);
  }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${this.products}`);
  }

  getProductById(id: string) : Observable<Product> {
    return this.http.get<Product>(`${this.url}/${this.products}/${id}`)
  }

  getProductsByName(name: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/${this.products}/name/${name}`)
  }

  addProduct(product: ProductDTO) : Observable<string> {
    return this.http.post<string>(`${this.url}/${this.products}`, product, {responseType: 'text' as 'json'});
  }

  updateProduct(id: string, product: ProductDTO) : Observable<string> {
    return this.http.put<string>(`${this.url}/${this.products}/${id}`,product, {responseType: 'text' as 'json'})
  }

  disableProduct(id: string) : Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${this.products}/${id}`)
  }
}
