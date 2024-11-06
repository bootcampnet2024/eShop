import { User } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private baseUrl = 'http://localhost:8070/admin/realms/eshop/users';

  constructor(private http: HttpClient, private authService: AuthService, private jwtHelper : JwtHelperService) {}

  getByCriteria(criteria: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`, { params: criteria });  }

  getAll(): Observable<User[]> {
    console.log('Fetching all users from:', this.baseUrl);
    return this.http.get<User[]>(this.baseUrl).pipe(
    tap(response => {
      console.log('Users fetched:', response);
    }),
    catchError(error => {
      console.error('Error fetching users:', error);
      return throwError(() => error);
    })
    );
  }
    
  getUsersCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/count`);
  }

  getProfile(): Observable<User> {
    const token = this.authService.getAccessToken();
    if (token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const body: User = {
        id: decodedToken.sub,
        username: decodedToken.preferred_username,
        fullname: decodedToken.full_name,
        email: decodedToken.email,
        cpf: decodedToken.cpf,
        phoneNumber: decodedToken.phone_number,
        updateAt: new Date(decodedToken.update_at),
        roles: decodedToken.realm_access?.roles || [],
        address: decodedToken.address || []
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
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

  addToGroup(userId: string, groupId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/groups/${groupId}`, {});
  }

  deleteFromGroup(userId: string, groupId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/groups/${groupId}`);
  }

}
