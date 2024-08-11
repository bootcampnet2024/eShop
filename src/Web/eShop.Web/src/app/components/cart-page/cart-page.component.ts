import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemModel } from '../../models/cartItem.model';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  products: CartItemModel[] = [];
  orderTotal: number = 0;

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.products = items;
      this.updateOrderTotal();
    });
  }

  updateOrderTotal(): void {
    this.orderTotal = this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  changeProductQuantity(product: CartItemModel, change: number): void {
    const newQuantity = product.quantity + change;

    if (newQuantity >= 1 && (product.availableQuantity == null || newQuantity <= product.availableQuantity)) {
      product.quantity = newQuantity;

      this.cartService.updateCartItem(product).subscribe(
        () => {
          this.updateOrderTotal();
        },
        error => {
          console.error('Error updating cart item', error);
          product.quantity -= change;
        }
      );
    } else {
      console.warn('Invalid quantity:', newQuantity);
    }
  }

  removeFromCart(product: CartItemModel): void {
    this.cartService.removeFromCart(product.productId).subscribe(() => {
      this.products = this.products.filter(p => p.productId !== product.productId);
      this.updateOrderTotal();
    });
  }

  goToPaymentPage(): void {
    this.router.navigate(['payment']);
  }

  trackByProductId(index: number, item: CartItemModel): number {
    return item.productId;
  }
}
