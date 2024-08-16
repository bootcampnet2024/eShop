import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-list/product.service';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [NgIf, NgFor, HeaderComponent, RouterLink],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent implements OnInit {
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const keyword = params['keyword'];
      if (keyword) {
        this.productService.searchProducts(keyword).subscribe(data => {
          this.products = data;
        });
      }
    });
  }
}
