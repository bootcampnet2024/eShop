import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItemModel } from '../../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5066/api/Basket';

  constructor(private http: HttpClient) {}

  getItems(userId: string): Observable<CartItemModel[]> {
    return this.http.get<CartItemModel[]>(`${this.apiUrl}/${userId}`);
  }

  update(userId: string, item: CartItemModel): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<void>(url, item);
  }

  remove(userId: string, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/${productId}`);
  }
}
