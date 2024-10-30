import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPageComponent } from './cart-page.component';
import { CartService } from '../../services/cart/cart.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartItemModel } from '../../models/cartItem.model';

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let cartServiceMock: jasmine.SpyObj<CartService>;
  const mockCartItems: CartItemModel[] = [];

  beforeEach(async () => {
    cartServiceMock = jasmine.createSpyObj('CartService', ['getItems']);
    const activatedRouteMock = {
      snapshot: {
        params: {},
        queryParams: {}
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HeaderComponent,
        FooterComponent,
        HttpClientModule,
        RouterTestingModule,
        CartPageComponent
      ],
      providers: [
        { provide: CartService, useValue: cartServiceMock },
        { provide: JWT_OPTIONS, useValue: {} },
        JwtHelperService,
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;

    cartServiceMock.getItems.and.returnValue(of(mockCartItems));
  });

  it('should load cart items on init', () => {
    component.ngOnInit();
    expect(component.products.length).toBe(mockCartItems.length);
    expect(component.products).toEqual(mockCartItems);
  });
});
