import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { ProductManagementService } from '../../services/product-management/product-management.service';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [NgIf, NgFor, HeaderComponent, RouterLink],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductManagementService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const keyword = params['keyword'];
      if (keyword) {
        this.productService.getProductsByName(keyword).subscribe(data => {
          this.products = data;
        });
      }
    });
  }

  viewProduct(product: Product): void {
    this.router.navigate([
      "/product",
      { id: product.id, name: product.name.trim().replaceAll(" ", "-") },
    ]);
  }
}
