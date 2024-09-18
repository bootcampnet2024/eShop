import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, switchMap} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isInRole() == 'user-manager') {
      return this.authService.getAdminToken().pipe(
        switchMap(token => {
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

