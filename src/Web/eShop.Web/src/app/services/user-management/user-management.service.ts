import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl: string = 'http://localhost:8070/realms/eshop/users';

  constructor(private http: HttpClient, private router: Router) {}

  getByCriteria(criteria: any): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { params: criteria });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  edit(userId: string, user: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, user);
  }

  add(user: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  delete(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }
}


