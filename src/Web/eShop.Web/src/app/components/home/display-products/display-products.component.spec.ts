import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayProductsComponent } from './display-products.component';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductManagementService } from '../../../services/product-management/product-management.service';

describe('DisplayProductsComponent', () => {
  let component: DisplayProductsComponent;
  let fixture: ComponentFixture<DisplayProductsComponent>;
  let productManagementServiceSpy: jasmine.SpyObj<ProductManagementService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductManagementService', ['getProducts']);
    
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        { provide: ProductManagementService, useValue: spy }
      ]
    });

    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
    productManagementServiceSpy = TestBed.inject(ProductManagementService) as jasmine.SpyObj<ProductManagementService>;
  });

  it('should call getCatalogItems on init', () => {
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

    productManagementServiceSpy.getProducts.and.returnValue(of(mockProductRequest));

    fixture.detectChanges();

    expect(productManagementServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });
});
