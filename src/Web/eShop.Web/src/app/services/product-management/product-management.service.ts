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
  private url: string = "https://localhost:7156";

  constructor(private http: HttpClient) { }

  getBrands() : Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.url}/brand`);
  }

  getCategories() : Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}/category`);
  }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/product`);
  }

  getProductById(id: string) : Observable<Product> {
    return this.http.get<Product>(`${this.url}/product/${id}`)
  }

  getProductsByName(name: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/product/name/${name}`)
  }

  addProduct(product: ProductDTO) : Observable<string> {
    return this.http.post<string>(`${this.url}/product`, product, {responseType: 'text' as 'json'});
  }

  updateProduct(id: string, product: ProductDTO) : Observable<string> {
    return this.http.put<string>(`${this.url}/product/${id}`,product, {responseType: 'text' as 'json'})
  }

  disableProduct(id: string) : Observable<Product> {
    return this.http.delete<Product>(`${this.url}/product/${id}`)
  }
}
