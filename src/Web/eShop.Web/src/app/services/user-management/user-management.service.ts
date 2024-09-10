import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl: string = 'http://localhost:8070/realms/eshop/users';
  private adminUrl = 'http://localhost:8070/realms/eshop/protocol/openid-connect/token';


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  private getAuthorization(): HttpHeaders {
    const token = this.authService.getToken('admin-cli', 'password', 'admin', 'admin', this.adminUrl);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getByCriteria(criteria: any): Observable<any> {
    const headers = this.getAuthorization();
    return this.http.get(`${this.baseUrl}`, { headers, params: criteria });  }

  getAll(): Observable<any> {
    const headers = this.getAuthorization();
    return this.http.get(this.baseUrl, { headers });
  }

  edit(userId: string, user: string): Observable<any> {
    const headers = this.getAuthorization();
    return this.http.put(`${this.baseUrl}/${userId}`, user, { headers });
  }

  add(user: string): Observable<any> {
    const headers = this.getAuthorization();
    return this.http.post(this.baseUrl, user, { headers });
  }

  delete(userId: string): Observable<any> {
    const headers = this.getAuthorization();
    return this.http.delete(`${this.baseUrl}/${userId}`, { headers });
  }
}


