import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { ProductManagementService } from '../../services/product-management/product-management.service';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit{

    public products: Product[] = [];
    categoryId: number = 0
    Category: any;

    constructor(private route: ActivatedRoute, private router: Router, private productService : ProductManagementService, private viewportScroller: ViewportScroller){}

    loadItems(): void
    {
      this.productService.getProducts(false, 0, 10, [this.categoryId], [], 0)
      .subscribe({
        next : (response) => {
          this.products = response.items
        }
      })
    }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.categoryId = parseInt(params.get('id') ?? '0');
        this.loadItems();
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    }

    viewProduct(product: Product): void {
      this.router.navigate(['/product', { id: product.id, name: product.name.trim().replaceAll(" ", "-") }]);
    }
}
