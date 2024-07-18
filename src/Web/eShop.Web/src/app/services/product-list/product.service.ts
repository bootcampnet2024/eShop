import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url: string = "https://localhost:5200/catalog";

  constructor(private http: HttpClient) { }

  getCatalogItems(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/items`)
  }
}
