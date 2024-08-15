import { Category } from '../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-list/product.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit{

    products? : Product[]
    categoryId?: number

    constructor(private router: Router, private route: ActivatedRoute, private productService : ProductService, private viewportScroller: ViewportScroller){}

    loadItems(): void
    {
      this.productService.getCatalogItems(false, 0, 10, this.categoryId!)
      .subscribe({
        next : (response) => {
          this.products = response.items
        }
      })
    }

    ngOnInit(): void {

      this.route.paramMap.subscribe(params => {
        this.categoryId = parseInt(params.get('id')!);
        this.loadItems();
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    }


}
