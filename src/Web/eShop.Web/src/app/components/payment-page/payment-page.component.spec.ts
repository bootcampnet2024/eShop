import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PaymentPageComponent } from './payment-page.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../app.config';
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { UserManagementService } from '../../services/user-management/user-management.service';
import { PaymentService } from '../../services/payment/payment.service';
import { CartItemModel } from '../../models/cartItem.model';
import { User } from '../../models/user.model';

const mockUser: User = {
  id: '1',
  fullname: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  cpf: '123.456.789-00',
  phoneNumber: '123456789',
  updateAt: new Date(),
  addresss: ['Rua Exemplo, 123, Cidade, Estado'],
  roles: ['admin']
};

const mockItems: CartItemModel[] = [
  {
    productId: '1',
    name: 'Item 1',
    price: 100,
    quantity: 2,
    description: 'Description of Item 1',
    imageURL: 'url-to-image-1',
    availableQuantity: 5,
    userId: 'user123',
  }
];

describe('PaymentPageComponent', () => {
  let component: PaymentPageComponent;
  let fixture: ComponentFixture<PaymentPageComponent>;
  let httpMock: HttpTestingController;
  let cartService: jasmine.SpyObj<CartService>;
  let userManagementService: jasmine.SpyObj<UserManagementService>;
  let paymentService: jasmine.SpyObj<PaymentService>;
  let jwtHelperSpy: jasmine.SpyObj<JwtHelperService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['getItems']);
    const userManagementServiceSpy = jasmine.createSpyObj('UserManagementService', ['getProfile']);
    const paymentServiceSpy = jasmine.createSpyObj('PaymentService', ['processPayment']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        PaymentPageComponent
      ],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers,
        { provide: CartService, useValue: cartServiceSpy },
        { provide: UserManagementService, useValue: userManagementServiceSpy },
        { provide: PaymentService, useValue: paymentServiceSpy },
        { provide: JwtHelperService, useValue: jwtHelperSpy }
      ]
    })
      .compileComponents();


    fixture = TestBed.createComponent(PaymentPageComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    userManagementService = TestBed.inject(UserManagementService) as jasmine.SpyObj<UserManagementService>;
    paymentService = TestBed.inject(PaymentService) as jasmine.SpyObj<PaymentService>;
    jwtHelperSpy = TestBed.inject(JwtHelperService) as jasmine.SpyObj<JwtHelperService>;

    userManagementService.getProfile.and.returnValue(of(mockUser));
    cartService.getItems.and.returnValue(of(mockItems));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile and call loadCartItems on init', fakeAsync(() => {
    const mockUserId = '12345';
    const mockUser: User = {
      id: '1',
      fullname: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      cpf: '123.456.789-00',
      phoneNumber: '123456789',
      updateAt: new Date(),
      addresss: ['Rua Exemplo, 123, Cidade, Estado'],
      roles: ['admin']
    };
  
    userManagementService.getProfile.and.returnValue(of(mockUser));
  
    spyOn(localStorage, 'getItem').and.returnValue(mockUserId);
  
    spyOn(component, 'loadCartItems');
  
    component.ngOnInit();
    fixture.detectChanges(); 
    tick(); 
  
    expect(localStorage.getItem).toHaveBeenCalledWith('user_id');
    expect(userManagementService.getProfile).toHaveBeenCalled();
    expect(component.loadCartItems).toHaveBeenCalled();
  }));

  it('should load cart items', () => {
    component.userId = 'user123';
  
    const mockItems: CartItemModel[] = [
      {
        productId: '1',
        name: 'Item 1',
        price: 100,
        quantity: 2,
        description: 'Description of Item 1',
        imageURL: 'url-to-image-1',
        availableQuantity: 5,
        userId: 'user123',
      }
    ];
  
    cartService.getItems.and.returnValue(of(mockItems));
  
    component.loadCartItems();
  
    expect(cartService.getItems).toHaveBeenCalledWith('user123');
  
    expect(component.items).toEqual(mockItems);
  
    expect(component.totalAmount).toBe(200);
  });

  it('should calculate total amount correctly', () => {
    component.items = [
      { productId: '1', name: 'Product 1', price: 100, quantity: 2, description: '', imageURL: '', availableQuantity: 0, userId: '' },
      { productId: '2', name: 'Product 2', price: 50, quantity: 1, description: '', imageURL: '', availableQuantity: 0, userId: '' }
    ];
    const total = component.calculateTotalAmount();
    expect(total).toBe(250);
  });

  it('should complete order successfully', () => {
    const mockUser: User = {
      id: '1',
      fullname: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      cpf: '123.456.789-00',
      phoneNumber: '123456789',
      updateAt: new Date(),
      addresss: ['Rua Exemplo, 123, Cidade, Estado'],
      roles: ['admin']
    };
    const mockItems: CartItemModel[] = [
      {
        productId: '1',
        name: 'Item 1',
        price: 100,
        quantity: 2,
        description: 'Description of Item 1',
        imageURL: 'url-to-image-1',
        availableQuantity: 5,
        userId: 'user123',
      }
    ];
  
    component.paymentForm.setValue({
      cardNumber: '1234567812345678',
      cardOwner: 'John Doe',
      expirationMonth: '12',
      expirationYear: '2025',
      cvv: '123',
      paymentMethod: 'creditCard',
      postalCode: '12345-678',
      couponCode: 'SAVE20'
    });
  
    userManagementService.getProfile.and.returnValue(of(mockUser));
    cartService.getItems.and.returnValue(of(mockItems));
    paymentService.processPayment.and.returnValue(of({ status: 'success' }));
  
    component.completeOrder();
  
    expect(userManagementService.getProfile).toHaveBeenCalled();
    expect(paymentService.processPayment).toHaveBeenCalled();
    expect(component.message).toBe('Compra realizada com sucesso!');
  });

  it('should handle error when completing order', () => {
    userManagementService.getProfile.and.returnValue(throwError('Error'));
    component.completeOrder();

    expect(component.message).toBe('Falha ao obter dados do usuário. Tente novamente.');
  });

  it('should handle payment service error', () => {
    const mockUser: User = {
      id: '1',
      fullname: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      cpf: '123.456.789-00',
      phoneNumber: '123456789',
      updateAt: new Date(),
      addresss: ['Rua Exemplo, 123, Cidade, Estado'],
      roles: ['admin']
    };
    const mockItems: CartItemModel[] = [
      {
        productId: '1',
        name: 'Item 1',
        price: 100,
        quantity: 2,
        description: 'Description of Item 1',
        imageURL: 'url-to-image-1',
        availableQuantity: 5,
        userId: 'user123',
      }
    ];

    userManagementService.getProfile.and.returnValue(of(mockUser));
    cartService.getItems.and.returnValue(of(mockItems));
    paymentService.processPayment.and.returnValue(throwError('Payment Error'));

    component.completeOrder();

    expect(component.message).toBe('Falha na compra. Por favor, tente novamente.');
  });

  afterEach(() => {
    httpMock.verify();
  });
});