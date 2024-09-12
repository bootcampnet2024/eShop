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
  userId: string = '3834ab69-3330-4e2b-b4e6-413e7c3ca703';

  constructor(
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getItems(this.userId).subscribe(items => {
      this.products = items;
      this.updateOrderTotal();
    });
  }

  updateOrderTotal(): void {
    this.orderTotal = this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  changeProductQuantity(product: CartItemModel, change: number): void {
    const newQuantity = product.quantity + change;

    console.log('Tentando alterar quantidade:', product, 'Nova quantidade:', newQuantity);

    if (newQuantity >= 1 && (product.availableQuantity == null || newQuantity <= product.availableQuantity)) {
      product.quantity = newQuantity;

      this.cartService.update(this.userId, product).subscribe(
        () => {
          console.log('Quantidade atualizada com sucesso no backend');
          this.updateOrderTotal();
        },
        error => {
          console.error('Erro ao atualizar o item do carrinho', error);
          product.quantity -= change; // Reverte a quantidade em caso de erro
        }
      );
    } else {
      console.warn('Quantidade inválida:', newQuantity);
    }
  }


  removeFromCart(product: CartItemModel): void {
    this.cartService.remove(this.userId, product.productId).subscribe(() => {
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
