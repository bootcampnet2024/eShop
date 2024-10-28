import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { UserManagementService } from "../../services/user-management/user-management.service";
import { ProductManagementService } from "../../services/product-management/product-management.service";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: "app-admin-page",
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"],
})
export class AdminPageComponent implements OnInit {
  userCount: number = 0;
  productCount: number = 0;
  categoryCount: number = 0;
  brandCount: number = 0;
  pageCount: number = 0;

  constructor(
    private router: Router,
    private userManagementService: UserManagementService,
    private productService: ProductManagementService
  ) {}

  ngOnInit() {
    this.loadCounts();
  }

  loadCounts() {
    this.userManagementService.getUsersCount().subscribe((usersCount) => {
      this.userCount = usersCount - 3;
    });

    this.productService.getProductCount().subscribe((amount) => {
      this.productCount = amount;
    });

    this.productService.getCategoryCount().subscribe((amount) => {
      this.categoryCount = amount;
    });

    this.productService.getBrandsCount().subscribe((amount) => {
      this.brandCount = amount;
    });

    this.pageCount = this.router.config.length;
  }
}
