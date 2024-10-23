import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, switchMap, catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminUrl =
    'http://localhost:8070/realms/eshop/protocol/openid-connect/token';
  private registerUrl = 'http://localhost:8070/admin/realms/eshop/users';
  private loginClientId = 'account-user';
  private adminClientId = 'admin-cli';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jtwHelper: JwtHelperService
  ) {}

  private getToken(
    client_id: string,
    username: string,
    password: string
  ): Observable<AuthResponse> {
    const body = new URLSearchParams();
    body.set('client_id', client_id);
    body.set('grant_type', 'password');
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http
      .post<AuthResponse>(this.adminUrl, body.toString(), { headers })
      .pipe(
        tap((response: AuthResponse) => {
          this.storeTokens(response);
        })
      );
  }

  getAdminToken(): Observable<AuthResponse> {
    return this.getToken(this.adminClientId, 'admin', 'admin');
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.getToken(this.loginClientId, username, password);
  }

  signin(
    username: string,
    password: string,
    email: string,
    address: string,
    cep: string,
    cpf: string
  ): Observable<any> {
    return this.getAdminToken().pipe(
      switchMap((response: AuthResponse) => {
        const token = response.access_token;

        const body = {
          username: username,
          enabled: true,
          emailVerified: true,
          email: email,
          attributes: {
            cep: cep,
            cpf: cpf,
            address: address,
          },
          credentials: [
            {
              type: 'password',
              value: password,
              temporary: false,
            },
          ],
          groups: ['user'],
        };

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });

        return this.http.post(this.registerUrl, body, { headers });
      })
    );
  }

  private storeTokens(tokens: AuthResponse): void {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
    localStorage.setItem('expires_in', tokens.expires_in.toString());
    localStorage.setItem('token_type', tokens.token_type);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }

  private isTokenExpired(token: string): boolean {
    return this.jtwHelper.isTokenExpired(token);
  }

  private refreshToken(): Observable<AuthResponse> {
    const accessToken = this.getAccessToken() ?? '';

    if (this.isTokenExpired(accessToken)) {
      const refreshToken = localStorage.getItem('refresh_token') ?? '';
      if (!refreshToken) {
        this.logout();
      }

      const body = new URLSearchParams();
      body.set('client_id', this.loginClientId);
      body.set('grant_type', 'refresh_token');
      body.set('refresh_token', refreshToken);

      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });

      return this.http
        .post<AuthResponse>(this.adminUrl, body.toString(), { headers })
        .pipe(
          tap((response: AuthResponse) => {
            this.storeTokens(response);
          }),
          catchError((error) => {
            this.logout();
            return throwError(() => error);
          })
        );
    } else {
      return new Observable<AuthResponse>((observer) => {
        observer.next({
          access_token: accessToken,
          refresh_token: localStorage.getItem('refresh_token')!,
          expires_in: Number(localStorage.getItem('expires_in')),
          refresh_expires_in: 0,
          token_type: localStorage.getItem('token_type')!,
          'not-before-policy': 0,
          session_state: '',
          scope: '',
        });
        observer.complete();
      });
    }
  }

  getRoles(): string[] {
    if (this.isAuthenticated()) {
      const token = this.getAccessToken();
      const decodedToken = this.jtwHelper.decodeToken(token);
      const roles = decodedToken?.realm_access?.roles;

      return roles;
    }
    return [];
  }

  getRoleUrl(): string {
    if (this.isAuthenticated()) {
      const roles = this.getRoles();

      if (roles.includes('user-manager')) return '/view-user-management';
      if (roles.includes('user')) return '/user-profile';
      //if (roles.includes('admin')) return '/admin';

      const managerType = roles.find(x => x.includes("manager"));

      if (managerType === undefined) return ""

      return managerType.replace("manager", "management")
    }
    return '';
  }

  getUserIdByEmail(email: string): Observable<string> {
    return this.getAdminToken().pipe(
      switchMap((response: AuthResponse) => {
        const token = response.access_token;
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<User[]>(`http://localhost:8070/admin/realms/eshop/users?email=${email}`, { headers }).pipe(
          map(users => {
            if (users.length > 0) {
              return users[0].id; 
            } else {
              throw new Error('User not found');
            }
          }),
          catchError((error) => {
            console.error('Error fetching user ID:', error);
            return throwError(() => error);
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching admin token:', error);
        return throwError(() => error);
      })
    );
  }

  recoverPassword(userId: string): Observable<any> {
    return this.getAdminToken().pipe(
      switchMap((response: AuthResponse) => {
        const token = response.access_token;
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        });
  
        const params = new HttpParams()
          .set('client_id', this.loginClientId)
          .set('redirect_uri', 'http://localhost:4200/login');
  
        return this.http.put(
          `http://localhost:8070/admin/realms/eshop/users/${userId}/reset-password-email`,
          {},
          { headers, params }
        ).pipe(
          catchError((error) => {
            console.error('Error trying to send verification email:', error);
            return throwError(() => error);
          })
        );
      }),
      catchError((error) => {
        console.error('Error fetching admin token:', error);
        return throwError(() => error);
      })
    );
  }

}
