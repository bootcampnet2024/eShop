import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItemModel } from '../../models/cartItem.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:5066/api/Basket';

  constructor(private http: HttpClient) {}

  getCartItems(userId: string): Observable<CartItemModel[]> {
    return this.http.get<CartItemModel[]>(`${this.apiUrl}/items/${userId}`);
  }

  updateCartItem(userId: string, item: CartItemModel): Observable<void> {
    const url = `${this.apiUrl}/update`;
    const params = new HttpParams().set('userId', userId);
    return this.http.put<void>(url, item, { params });
  }

  removeFromCart(userId: string, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${userId}/${productId}`);
  }
}
