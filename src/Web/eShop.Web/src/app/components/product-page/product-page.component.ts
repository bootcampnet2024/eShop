import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayHighlightedProductComponent } from '../home/display-highlighted-product/display-highlighted-product.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-list/product.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DisplayHighlightedProductComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  private productId?: string;
  public product?: Product;

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute, private viewportScroller: ViewportScroller){}

  getProduct(id: string): void {
    this.productService.getCalalogItem(id).subscribe({
      next: (response) => {
        this.product = response
      },
      error: () => {
        console.log(`Could not get the product with the id: ${this.productId}`);
      }
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '' as string;
      this.getProduct(this.productId);
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  goToCart(){
    this.router.navigate(['cart'])
  }

  options: any = [
    {
      name: 'Black'
    },
    {
      name: 'White'
    },
    {
      name: 'Pink'
    },
    {
      name: 'Purple'
    },
    {
      name: 'Green'
    },
    {
      name: 'Yellow'
    },
    {
      name: 'Blue'
    },
    {
      name: 'Camo'
    },
    {
      name: 'Brown'
    },
    {
      name: 'Orange'
    },
    {
      name: 'Grey'
    },
    {
      name: 'Red'
    },

  ]
}
