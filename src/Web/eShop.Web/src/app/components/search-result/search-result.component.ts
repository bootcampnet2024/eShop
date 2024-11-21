import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { ProductManagementService } from '../../services/product-management/product-management.service';
import { FooterComponent } from "../../shared/footer/footer.component";
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [NgIf, HeaderComponent, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {
  products: Product[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductManagementService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const keyword = params['keyword'];
      if (keyword) {
        this.productService.getProductsByName(keyword).subscribe({
          next: (data) => {
          this.products = data.items;
          }
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
