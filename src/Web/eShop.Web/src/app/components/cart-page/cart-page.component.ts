import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})

export class CartPageComponent implements OnInit {

  constructor(private router: Router) {}

  products: any = [
    {
      image: 'assets/products/allure.png',
      name: 'Alure',
      description: 'This contains a very beatiful product',
      price: 129.99,
      quantity: 1,
      availableQuantity: 7,
    },
    {
      image: 'assets/products/xbox-series-controller.jpg',
      name: 'Xbox Series X Controller',
      description: 'This controller supports Windows and Xbox',
      price: 399.99,
      quantity: 1,
      availableQuantity: 6,
    },
    {
      image: 'assets/products/produto-veja-limpeza.png',
      name: 'Veja',
      description: 'Clean fast',
      price: 229.99,
      quantity: 1,
      availableQuantity: 5,
    }
  ];
  orderTotal = this.products.reduce((total: number, product: any) => total + product.price, 0);

  goToPaymentPage() {
    this.router.navigate(['payment']);
  }

  updateOrderTotal() : void {
    this.orderTotal = this.products.reduce((total: number, product: any) => total + (product.price * product.quantity), 0);
  }

  ngOnInit(): void {
    this.products = this.products.filter((p: { availableQuantity: number; }) => p.availableQuantity > 0);
    this.updateOrderTotal()
  }

  changeProductQuantity(product: any, event: Event) : void {
    var value = (event.target as HTMLInputElement).value;

    product.quantity = value

    this.updateOrderTotal()
  }

  removeFromCart(product: any) : void {
    this.products = this.products.filter((p: { name: any; }) => p.name !== product.name);
    this.updateOrderTotal()
  }
}
