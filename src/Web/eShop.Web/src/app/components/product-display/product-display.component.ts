import { Component } from '@angular/core';

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.css',
})
export class ProductDisplayComponent {
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
