import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  products: any = [
    {
      name: 'test',
      description: 'this is only a test',
      price: 99,
    },
    {
      name: 'test',
      description: 'this is only a test',
      price: 99,
    },
    {
      name: 'test',
      description: 'this is only a test',
      price: 99,
    },
  ];
}
