import { appConfig } from './../../../app.config';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DisplayProductsComponent } from './display-products.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductManagementService } from '../../../services/product-management/product-management.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DisplayProductsComponent', () => {
  let component: DisplayProductsComponent;
  let fixture: ComponentFixture<DisplayProductsComponent>;
  let productManagementService: ProductManagementService;

  beforeEach(() => {    
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        ...appConfig.providers,
        provideHttpClientTesting(),
        ProductManagementService
      ]
    });

    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
    productManagementService = TestBed.inject(ProductManagementService);
    fixture.detectChanges();
  });

  it('should call getCatalogItems on init', fakeAsync(() => {
    const mockProducts = [
      {
        id: "1",
        name: "Product 1",
        description: "Description 1",
        price: 100,
        quantity: 10,
        brand: "Brand",
        category: "Category",
        imageURL: "http://example.com/image1.jpg",
        isActive: true,
        isHighlighted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        discount: 10,
        finalPrice: 100
      },
      {
        id: "2",
        name: "Product 2",
        description: "Description 2",
        price: 200,
        quantity: 5,
        brand: "Brand",
        category: "Category",
        imageURL: "http://example.com/image1.jpg",
        isActive: true,
        isHighlighted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        discount: 10,
        finalPrice: 100
      },
    ];

    const mockProductRequest = {
      items: mockProducts,
      pageSize: 10,
      pageIndex: 1,
      totalItems: mockProducts.length,
    };

    const spy = spyOn(productManagementService, "getProducts").and.returnValue(of(mockProductRequest));
    component.ngOnInit();
    tick(550);
    fixture.detectChanges();

    expect(productManagementService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  }));
});
