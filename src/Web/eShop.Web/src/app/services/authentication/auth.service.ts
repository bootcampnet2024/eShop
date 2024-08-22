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
  private adminclientId = 'admin';
  private adminclientSecret = 'VCHGIuJyeqfkUpePvoo1Kv1x1296W7MC';
  private userclientId = 'account-user';
  private userclientSecret = '0VWXqqU6JN9VMWIVdLFenHWLBl698D68';

  constructor(private http: HttpClient, private router: Router) {}

  private getToken(client_id : string, grant_type: string, username : string, password : string, client_secret : string, url : string) : Observable<AuthResponse> {
    const body = new URLSearchParams();
    body.set('client_id', client_id);
    body.set('grant_type', grant_type);
    body.set('username', username);
    body.set('password',password);
    body.set('client_secret', client_secret);

    if (client_secret) {
      body.set('client_secret', client_secret);
    }

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

  login(username: string, password: string): Observable<AuthResponse> {
    return this.getToken(this.userclientId, 'password', username, password, this.userclientSecret, this.adminUrl);

  }

  signin(username: string, password: string, email: string, address: string, cep: string, cpf: string): Observable<any> {
    return this.getToken(this.adminclientId, 'password', 'admin', 'admin',this.adminclientSecret, this.adminUrl)
    .pipe(
      switchMap((response: AuthResponse) => {
        const token = response.access_token;

        const body = {
          username: username,
          enabled: true,
          emailVerified: true,
          email: email,
          atributes: {
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
    return !!localStorage.getItem('access_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
