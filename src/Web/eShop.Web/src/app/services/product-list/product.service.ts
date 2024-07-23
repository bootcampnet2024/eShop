import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductRequest } from '../../models/product-request.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = "http://localhost:5200/catalog";

  constructor(private http: HttpClient) { }

  getCatalogItems(): Observable<ProductRequest> {
    return this.http.get<ProductRequest>(`${this.url}/items`)
  }

  getCalalogItem(id: string) : Observable<Product> {
    return this.http.get<Product>(`${this.url}/items/${id}`)
  }
}
