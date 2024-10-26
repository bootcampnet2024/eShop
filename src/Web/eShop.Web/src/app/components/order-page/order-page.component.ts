import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Order } from '../../models/order.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { OrderSummary } from '../../models/orderSummary';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, NavbarComponent],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
public order: Order = {
  id: 0,
  city: 'guariroba',
  street: 'general osorio',
  state: '',
  country: 'brasil',
  zipCode: '',
  cardNumber: '',
  cardHolderName: '',
  cardExpiration: '',
  cardSecurityNumber: '',
  cardTypeId: 0,
  items: [{
    id: '',
    productId: 0,
    productName: 'Cabo sem fio xbox 360',
    unitPrice: 0,
    oldUnitPrice: 0,
    quantity: 0,
    pictureUrl: 'assets/products/xbox-series-controller.jpg'
  },
  {
    id: '',
    productId: 0,
    productName: 'Cabo sem fio xbox 360',
    unitPrice: 0,
    oldUnitPrice: 0,
    quantity: 0,
    pictureUrl: 'assets/products/xbox-series-controller.jpg'
  }]
};

constructor(private router: Router) {
  
  
}

viewProduct(product: any): void {
  this.router.navigate([
    "/product",
    { id: product.id, name: product.name.trim().replaceAll(" ", "-") },
  ]);
}


}
