import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:3000/payment/process';

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any): Observable<any> {
    return this.http.post(this.apiUrl, paymentData);
  }
}