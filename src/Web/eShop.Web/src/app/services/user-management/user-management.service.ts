import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { throwError, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = 'http://localhost:8070/admin/realms/eshop/users';

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
      const body = {
        username: decodedToken.preferred_username,
        email: decodedToken.email,
        cep: decodedToken.cep,
        cpf: decodedToken.cpf,
        address: decodedToken.address,
        };

      return of(body);

    }
    else {
      return throwError(() => new Error('Token is missing or invalid'));
    }
  }

  edit(userId: string, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, user);
  }

  add(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  delete(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);}
  }
