import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDisplayComponent } from '../product-display/product-display.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-list/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductDisplayComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  private productId?: string;
  public product?: Product;

  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute){}

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
      this.productId = JSON.parse(params.get('id') || '{}') as string;
      this.getProduct(this.productId);
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
