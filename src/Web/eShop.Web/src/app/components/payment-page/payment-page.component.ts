import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaymentService } from '../../services/payment/payment.service';
import { UserManagementService } from '../../services/user-management/user-management.service';
import { CartService } from '../../services/cart/cart.service';
import { CartItemModel } from '../../models/cartItem.model';
import { User } from '../../models/user.model';
import { Address } from '../../models/address';
import { Item } from '../../models/item ';


@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  items: CartItemModel[] = [];
  paymentForm: FormGroup;
  totalAmount: number = 0;
  userId: string = '3834ab69-3330-4e2b-b4e6-413e7c3ca703';
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private UserManagementService: UserManagementService,
    private cartService: CartService
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardOwner: ['', Validators.required],
      expirationMonth: ['', Validators.required],
      expirationYear: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      couponCode: [''],
      postalCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.UserManagementService.getProfile().subscribe({
      next: (user: User) => {
        this.loadCartItems();
      },
      error: (err: any) => {
        console.error('Erro ao obter dados do perfil do usuário:', err);
      }
    });
  }

  loadCartItems(): void {
    this.cartService.getItems(this.userId).subscribe(items => {
      this.items = items;
      this.totalAmount = this.calculateTotalAmount();
    });
  }

  calculateTotalAmount(): number {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  completeOrder(): void {
    this.UserManagementService.getProfile().subscribe({
      next: (user: User) => {
        const customerData = this.buildCustomerData(user);
        this.processPayment(customerData);
      },
      error: (err: any) => {
        console.error('Erro ao obter dados do perfil do usuário:', err);
        this.message = 'Falha ao obter dados do usuário. Tente novamente.';
      }
    });
  }

  buildCustomerData(user: User): {
    name: string;
    email: string;
    phoneNumber: string;
    cpf: string;
    paymentMethod: string;
    address: Address;
    items: Item[];
  } {
    return {
      name: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      cpf: user.cpf,
      paymentMethod: this.paymentForm.value.paymentMethod,
      address: {
        street: 'Rua Exemplo',
        number: 123,
        city: 'Cidade Exemplo',
        state: 'Estado Exemplo',
        country: 'Brasil',
        zipCode: this.paymentForm.value.postalCode
      },
      items: this.items.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };
  }

  processPayment(customerData: any): void {
    this.paymentService.processPayment(customerData).subscribe(
      response => {
        console.log('API response:', response);
        this.message = 'Compra realizada com sucesso!';
      },
      error => {
        console.error('API error:', error);
        this.message = 'Falha na compra. Por favor, tente novamente.';
      }
    );
  }
}
