import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../models/order.model';
import { OrderSummary } from '../../models/orderSummary.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
private url: string = 'http://localhost:5151/orders'

  constructor(private http: HttpClient) { }

  getAllByUserId(userId: string): Observable<OrderSummary[]>{
    return this.http.get<OrderSummary[]>(`${this.url}/userId/${userId}`)
  }

  getById(orderId: number) : Observable<Order> {
    return this.http.get<Order>(`${this.url}/${orderId}`);
  }
}

