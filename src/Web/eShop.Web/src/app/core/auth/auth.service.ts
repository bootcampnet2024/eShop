import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private adminUrl = 'http://localhost:8070/realms/eshop/protocol/openid-connect/token';
  private registerUrl = 'http://localhost:8070/admin/realms/eshop/users';
  private loginclientId = 'account-user';
  private adminclientId = 'admin-cli';

  constructor(private http: HttpClient, private router: Router, private jtwHelper : JwtHelperService) {}

  getToken(client_id : string, grant_type: string, username : string, password : string, url : string) : Observable<AuthResponse> {
    const body = new URLSearchParams();
    body.set('client_id', client_id);
    body.set('grant_type', grant_type);
    body.set('username', username);
    body.set('password',password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<AuthResponse>(url, body.toString(), { headers })
    .pipe(
      tap((response: AuthResponse) => {
        this.storeTokens(response);
      })
    );
  }

  login(username: string, password: string): Observable<AuthResponse>{
    return this.getToken(this.loginclientId, 'password', username, password, this.adminUrl);
  }

  signin(username: string, password: string, email: string, address: string, cep: string, cpf: string): Observable<any> {
    return this.getToken(this.adminclientId, 'password', 'admin', 'admin', this.adminUrl)
    .pipe(
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
          credentials: [{
            type: 'password',
            value: password,
            temporary: false
          }]
        };

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });

        return this.http.post(this.registerUrl, body, { headers });
      }));

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

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private isTokenExpired(token: string): boolean {
    return this.jtwHelper.isTokenExpired(token);
  }
}
