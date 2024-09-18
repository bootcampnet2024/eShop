import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = 'http://localhost:8070/realms/eshop/users';

  constructor(private http: HttpClient, private authService: AuthService, private jwtHelper : JwtHelperService) {}

  getByCriteria(criteria: any): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { params: criteria });  }

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getProfile(): Observable<any> {
    const token = this.authService.getAccessToken();
    if (token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken?.sub;
      return this.http.get(`${this.baseUrl}/${userId}`);

    }
    else {
      return throwError(() => new Error('Token is missing or invalid'));
    }
  }

  edit(userId: string, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, user);
  }

  add(user: string): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  delete(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);}
  }
