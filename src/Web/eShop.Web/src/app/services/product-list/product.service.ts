import { HttpClient, HttpParams } from '@angular/common/http';
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

  getCatalogItems(highlighted: boolean, pageIndex: number, pageSize: number, categoryId: number): Observable<ProductRequest> {
    return this.http.get<ProductRequest>(`${this.url}/items?ShowOnlyHighlighted=${highlighted}&PageSize=${pageSize}&PageIndex=${pageIndex}&CategoryId=${categoryId}`)
  }

  getCalalogItem(id: string) : Observable<Product> {
    return this.http.get<Product>(`${this.url}/items/${id}`)
  }

  searchProducts(keyword: string) : Observable<Product[]> {
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get<Product[]>(`${this.url}/search`, { params })
  }
}
