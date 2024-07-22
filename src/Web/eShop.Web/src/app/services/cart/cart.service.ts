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

  getCartItems(): Observable<CartItemModel[]> {
    return this.http.get<CartItemModel[]>(`${this.apiUrl}/items`);
  }

  updateCartItem(item: CartItemModel): Observable<void> {
    const url = `${this.apiUrl}/update/${item.productId}`;
    return this.http.put<void>(url, item);
  }

  removeFromCart(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove/${productId}`);
  }
}
