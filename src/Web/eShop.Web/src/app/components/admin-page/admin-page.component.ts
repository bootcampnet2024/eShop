import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../../services/user-management/user-management.service';
import { ProductManagementService } from '../../services/product-management/product-management.service';
import { AuthService } from '../../core/auth/auth.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  userCount: number = 0;
  productCount: number = 0;
  categoryCount: number = 0;
  brandCount: number = 0;
  pageCount: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userManagementService: UserManagementService,
    private productService: ProductManagementService,
  ) {
    
  }

  ngOnInit() {
    this.loadCounts();
  }

  loadCounts() {
    this.userManagementService.getUsersCount().subscribe(usersCount => {
      this.userCount = usersCount ;
    });

    this.productService.getProducts().subscribe(products => {
      this.productCount = products.length;
    });

    this.productService.getCategories().subscribe(categories => {
      this.categoryCount = categories.length;
    });

    this.productService.getBrands().subscribe(brands => {
      this.brandCount = brands.length;
    });

    this.pageCount= this.router.config.length;
  }

  userManagement() {
    this.router.navigate(['/user-management']);
  }

  productManagement() {
    this.router.navigate(['/product-management']);
  }

  categoryManagement() {
    this.router.navigate(['/category-management']);
  }

  brandManagement() {
    this.router.navigate(['/brand-management']);
  }

  goToHome(){
    this.router.navigate(['/'])
  }

  logout(){
    this.authService.logout();
  }
}
