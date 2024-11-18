import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemModel } from '../../models/cartItem.model';
import { CartService } from '../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Product } from '../../models/product.model';
import { ProductManagementService } from '../../services/product-management/product-management.service';

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
    private productService: ProductManagementService,
    private cartService: CartService,
  ) { }


  async ngOnInit(): Promise<void> {
    const accessToken = localStorage.getItem('access_token');
    console.log('Access Token:', accessToken);
    if (!accessToken) {
      this.router.navigate(['/login']);
      return;
    }

    this.userId = this.extractUserIdFromToken(accessToken);
    if (this.userId) {
      localStorage.setItem('user_id', this.userId);
    }

    if (!this.userId) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadCartItems();
    this.updateOrderTotal();
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

    this.cartService.getItems(this.userId).subscribe({
      next: (items) => {
        console.log('Itens do carrinho recebidos:', items);
        this.products = items;
        for (const product of this.products) {
          this.updateProductInfo(product);
        }
        this.updateOrderTotal();
      },
      error: (error) => {
        console.error('Erro ao carregar itens do carrinho:', error);
      }
  });
  }

  updateProductInfo(product: CartItemModel): void {
    if (!product.productId) {
      console.error('Product ID is null or undefined.');
      return;
    }

    this.productService.getProductById(product.productId).subscribe({
      next: (productInfo) => {
        console.log('Informações do produto recebidas:', productInfo);
        product.name = productInfo.name;
        product.price = productInfo.price;
        product.discount = productInfo.discount;
        product.finalPrice = productInfo.finalPrice;
        product.imageURL = productInfo.imageURL;
        product.availableQuantity = productInfo.quantity;
        if (product.quantity > productInfo.quantity) {
          product.quantity = productInfo.quantity;
        }
        this.updateOrderTotal();
      },
      error: (error) => {
        console.error('Erro ao carregar informações do produto:', error);
      }
    });
  }

  trackByProductId(index: number, item: CartItemModel): string {
    return item.productId;
  }

  removeFromCart(product: CartItemModel): void {
    if (!this.userId) {
      console.error('User ID is null or undefined.');
      return;
    }
    this.cartService.remove(this.userId, product.productId).subscribe(() => {
      this.products = this.products.filter(p => p.productId !== product.productId);
      this.updateOrderTotal();
    });
  }

  goToPaymentPage(): void {
    this.router.navigate(['payment']);
  }

  goToShopping(): void {
    this.router.navigate(['']);
  }

  updateOrderTotal(): void {
    this.orderTotal = this.products.reduce((total, product) => total + (product.finalPrice! * product.quantity), 0);
  }

  changeProductQuantity(product: CartItemModel, change: number): void {
    const newQuantity = product.quantity + change;

    if (newQuantity >= 1 && newQuantity <= product.availableQuantity) {
      product.quantity = newQuantity;

      this.cartService.update(this.userId!, product).subscribe({
        next: () => {

          this.updateOrderTotal();
        },
        error: (error) => {
          console.error('Erro ao atualizar o item do carrinho', error);
          product.quantity -= change;
        }
    });
    }
  }
}
