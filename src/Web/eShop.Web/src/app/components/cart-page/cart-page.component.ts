import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemModel } from '../../models/cartItem.model';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  products: CartItemModel[] = [];
  orderTotal: number = 0;
  userId: string | null = null;

  constructor(
    private router: Router,
    private cartService: CartService,
  ) {}

  async ngOnInit(): Promise<void> {
    const accessToken = localStorage.getItem('access_token');
    console.log('Access Token:', accessToken); 
    if (!accessToken) {
      this.router.navigate(['/login']);
      return;
    }

    this.userId = this.extractUserIdFromToken(accessToken);
    console.log('User ID:', this.userId); 

    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadCartItems();
  }

  extractUserIdFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token decodificado:', payload);       
      return payload.sub || payload.jti || null; 
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }
  
  loadCartItems(): void {
    if (!this.userId) {
      console.error('User ID is null or undefined.');
      return;
    }

    this.cartService.getItems(this.userId).subscribe(
      (items) => {
        console.log('Itens do carrinho recebidos:', items); 
        this.products = items;
        this.updateOrderTotal();
      },
      (error) => {
        console.error('Erro ao carregar itens do carrinho:', error);
      }
    );
  }

  trackByProductId(index: number, item: CartItemModel): string {
    return item.productId; 
  }

  removeFromCart(product: CartItemModel): void {
    if (!this.userId) {
      console.error('User ID is null or undefined.');
      return;
    }
  
    this.cartService.remove(this.userId, Number(product.productId)).subscribe(() => {
      this.products = this.products.filter(p => p.productId !== product.productId);
      this.updateOrderTotal();
    });
  }
  

  goToPaymentPage(): void {
    this.router.navigate(['payment']);
  }

  updateOrderTotal(): void {
    this.orderTotal = this.products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  changeProductQuantity(product: CartItemModel, change: number): void {
    const newQuantity = product.quantity + change;

    if (newQuantity >= 1 && (product.availableQuantity == null || newQuantity <= product.availableQuantity)) {
      product.quantity = newQuantity;

      this.cartService.update(this.userId!, product).subscribe(
        () => {
          this.updateOrderTotal();
        },
        (error) => {
          console.error('Erro ao atualizar o item do carrinho', error);
          product.quantity -= change; 
        }
      );
    }
  }
}
