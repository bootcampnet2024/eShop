import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private jwtHelper : JwtHelperService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getAccessToken();

      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);

        const roles = decodedToken?.realm_access?.roles || [];

        if (roles.includes('user-manager')) {
          this.router.navigate(['/user-management']);
        } else if (roles.includes('product-manager')) {
          this.router.navigate(['/product-management']);
        } else if (roles.includes('user')) {
          this.router.navigate(['/user-profile']);
        } else if (roles.includes('admin')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
        return false
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
