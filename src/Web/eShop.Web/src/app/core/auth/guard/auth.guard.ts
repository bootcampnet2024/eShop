import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.checkAuth(route);
  }

  private checkAuth(route: ActivatedRouteSnapshot): boolean {
    const targetUrl = `/${route.url.join('/')}`;

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (targetUrl.includes('user-management')) {
      if (
        this.authService
          .getRoles()
          .find((x) => x.includes('user-manager') || x.includes('admin')) ===
        undefined
      ) {
        this.router.navigate(['']);
        return false;
      }
    }

    if (
      targetUrl.includes('product-management') ||
      targetUrl.includes('brand-management') ||
      targetUrl.includes('category-management')
    ) {
      if (
        this.authService
          .getRoles()
          .find((x) => x.includes('product-manager') || x.includes('admin')) ===
        undefined
      ) {
        this.router.navigate(['']);
        return false;
      }
    }
    
    return true;
  }
}
