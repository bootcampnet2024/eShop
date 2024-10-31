import { Category } from "./../../models/category.model";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../services/category-service/category.service";
import { CommonModule } from "@angular/common";
import { ProductManagementComponent } from "../../components/product-management/product-management.component";
import { ProductManagementService } from "../../services/product-management/product-management.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent implements OnInit {
  public categories: Category[] = [];
  categoriesVisible = false;

  constructor(
    private router: Router,
    private categoryService: ProductManagementService
  ) {}

  showCategories() {
    this.categoriesVisible = true;
  }

  hideCategories() {
    this.categoriesVisible = false;
  }
  
  ngOnInit(): void {
    this.categoryService.getCategories(0, 50).subscribe({
      next: (response) => {
        this.categories = response.items;
      },
    });
  }

  goToCategoryPage(categoryId: number): void {
    this.router.navigate(['/products'], {
      queryParams: { categoryId: categoryId }
    }).then(() => {
      window.location.reload();
    });
  }
}
