import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPageComponent } from './cart-page.component';
import { CartService } from '../../services/cart/cart.service';
import { of } from 'rxjs';
import { CartItemModel } from '../../models/cartItem.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { appConfig } from '../../app.config';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let mockCartService;

  const mockRouter = {
    root: jasmine.createSpy('root'),
    navigate: jasmine.createSpy('navigate')
  };

  const mockCartItems: CartItemModel[] = [
    {
      productId: 1,
      name: 'Item 1',
      price: 100,
      quantity: 2,
      description: 'Description of Item 1',
      image: 'url-to-image-1',
      availableQuantity: 5,
      userId: 'user123'
    },
    {
      productId: 2,
      name: 'Item 2',
      price: 50,
      quantity: 1,
      description: 'Description of Item 2',
      image: 'url-to-image-2',
      availableQuantity: 10,
      userId: 'user123'
    }
  ];

  beforeEach(async () => {
    mockCartService = {
      getItems: jasmine.createSpy('getItems').and.returnValue(of(mockCartItems)),
      updateCartItem: jasmine.createSpy('updateCartItem').and.returnValue(of(void 0)),
      removeFromCart: jasmine.createSpy('removeFromCart').and.returnValue(of(void 0)),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, CartPageComponent, RouterTestingModule],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers,
        { provide: CartService, useValue: mockCartService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart items on init', () => {
    component.ngOnInit();
    expect(component.products.length).toBe(2);
    expect(component.products).toEqual(mockCartItems);
  });

  it('should calculate the correct order total', () => {
    component.products = mockCartItems;
    component.updateOrderTotal();
    expect(component.orderTotal).toBe(250);
  });
});
