import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';
import { ProductDisplayComponent } from '../product-display/product-display.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductDisplayComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  constructor(private router: Router){}

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
