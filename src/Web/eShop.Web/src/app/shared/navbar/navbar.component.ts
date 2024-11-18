import { Category } from './../../models/category.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductManagementService } from '../../services/product-management/product-management.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

    public categories: Category[] = [];

    constructor(private router: Router, private productService : ProductManagementService) {}

    ngOnInit(): void {
      this.productService.getCategories(0, 50)
        .subscribe({
          next : (response) => {
            this.categories = response.items;
          }
        })
    }

    goToCategoryPage(categoryId: number) : void
    {
      this.router.navigate(['/category', {id: categoryId}])
    }
}
