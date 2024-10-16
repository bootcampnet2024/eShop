import { catchError, Observable, switchMap, tap } from "rxjs";
import { AuthResponse } from "./AuthResponse.model";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const roles = this.authService.getRoles();
  
    if (roles.includes('manager') || roles.includes('admin')) {
      
      return this.authService.getAdminToken().pipe(
        switchMap((token) => {
          console.log('Using admin token:', token);
          
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            }
          });
  
          return next.handle(clonedReq).pipe(
            tap(event => {
              console.log('Response from admin request:', event); 
            })
          );
        }),
        catchError(error => {
          console.error('Error fetching admin token:', error);
          return next.handle(req); 
        })
      );
    } 
  
    console.log('No admin or manager role, forwarding request without auth.');
    return next.handle(req);
  }
  
}
