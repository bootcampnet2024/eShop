import { User, UserAttributes } from './../../models/user.model';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private baseUrl = 'http://localhost:8070/admin/realms/eshop/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private jwtHelper: JwtHelperService
  ) {}

  getByCriteria(criteria: any): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`, { params: criteria });
  }

  getAll(): Observable<User[]> {
    console.log('Fetching all users from:', this.baseUrl);
    return this.http.get<User[]>(this.baseUrl).pipe(
      tap(response => console.log('Users fetched:', response)),
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
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);

      const attributes: UserAttributes = {
        full_name: decodedToken.full_name ? [decodedToken.full_name] : [],
        update_at: decodedToken.update_at ? [decodedToken.update_at] : [],
        cpf: decodedToken.cpf ? [decodedToken.cpf] : [],
        phone_number: decodedToken.phone_number ? [decodedToken.phone_number] : [],
        address: decodedToken.address ? [decodedToken.address] : []
      };

      const user: User = {
        id: decodedToken.sub,
        username: decodedToken.preferred_username,
        email: decodedToken.email,
        roles: decodedToken.realm_access?.roles || [],
        attributes: attributes
      };
      console.log('User profile:', user);
      return of(user);
    } else {
      return throwError(() => new Error('Token is missing or invalid'));
    }
  }

  edit(userId: string, user: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, user).pipe(
      tap(() => console.log(`User with ID ${userId} updated.`)),
      catchError(error => {
        console.error(`Error updating user with ID ${userId}:`, error);
        return throwError(() => error);
      })
    );
  }

  add(user: Partial<User>): Observable<any> {
    return this.http.post(this.baseUrl, user).pipe(
      tap(() => console.log('User added:', user)),
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(() => error);
      })
    );
  }

  delete(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`).pipe(
      tap(() => console.log(`User with ID ${userId} deleted.`)),
      catchError(error => {
        console.error(`Error deleting user with ID ${userId}:`, error);
        return throwError(() => error);
      })
    );
  }

  addToGroup(userId: string, groupId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}/groups/${groupId}`, {}).pipe(
      tap(() => console.log(`User ${userId} added to group ${groupId}.`)),
      catchError(error => {
        console.error(`Error adding user ${userId} to group ${groupId}:`, error);
        return throwError(() => error);
      })
    );
  }

  deleteFromGroup(userId: string, groupId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/groups/${groupId}`).pipe(
      tap(() => console.log(`User ${userId} removed from group ${groupId}.`)),
      catchError(error => {
        console.error(`Error removing user ${userId} from group ${groupId}:`, error);
        return throwError(() => error);
      })
    );
  }
}
