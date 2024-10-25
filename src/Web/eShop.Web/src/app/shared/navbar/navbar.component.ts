import { Category } from "./../../models/category.model";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../services/category-service/category.service";
import { CommonModule } from "@angular/common";

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
    private categoryService: CategoryService
  ) {}

  showCategories() {
    this.categoriesVisible = true;
  }

  hideCategories() {
    this.categoriesVisible = false;
  }
  
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: (response) => {
        this.categories = response;
      },
    });
  }

  goToCategoryPage(categoryId: number): void {
    this.router.navigate(["/category", { id: categoryId }]);
  }
}
