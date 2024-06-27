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
      image: 'assets/products/allure.png',
      name: 'Alure',
      description: 'This contains a very beatiful product',
      price: 129.99,
    },
    {
      image: 'assets/products/xbox-series-controller.jpg',
      name: 'Xbox Series X Controller',
      description: 'This controller supports Windows and Xbox',
      price: 399.99,
    },
    {
      image: 'assets/products/produto-veja-limpeza.png',
      name: 'Veja',
      description: 'Clean fast',
      price: 9.99,
    },
    {
      image: 'assets/products/echo-dot.jpg',
      name: 'Amazon Echo Dot',
      description: 'Your best assistant',
      price: 199.99,
    },
  ];
}
