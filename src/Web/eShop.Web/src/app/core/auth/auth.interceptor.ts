import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/realms/eshop/users')) {
      return this.authService.getToken('admin-cli', 'password', 'admin', 'admin', 'http://localhost:8070/realms/eshop/protocol/openid-connect/token').pipe(
        switchMap(tokenResponse => {
          const token = tokenResponse.access_token;
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            }
          });
          return next.handle(clonedReq);
        })
      );
    }

    return next.handle(req);
  }
}

