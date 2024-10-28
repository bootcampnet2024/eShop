import { Observable } from "rxjs";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getAccessToken();

      const clonedReq = req.clone({
        headers: req.headers.set("Authorization", `Bearer ${token}`),
      });

      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
