import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CategoryPageComponent } from './category-page.component';
import { Product } from '../../models/product.model';
import { of } from 'rxjs';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../app.config';
import { PaginatedResult } from '../../models/paginated-result.model';
import { ProductManagementService } from '../../services/product-management/product-management.service';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let productService: ProductManagementService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FooterComponent, CategoryPageComponent],
      declarations: [],
      providers: [
        ProductManagementService,
        provideHttpClientTesting(),
        ...appConfig.providers,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productService = TestBed.inject(ProductManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', async () => {
    it('should load products', async () => {
      //Arrange
      const products: Product[] = [
        {
          id: 'guid1',
          imageURL: "",
          name: 'Product 1',
          description: 'Description',
          isActive: true,
          isHighlighted: false,
          price: 10,
          quantity: 1,
          brand: "brand",
          category: "category",
          discount: 10, 
          createdAt: new Date(),
          updatedAt: new Date(),
          finalPrice: 10
        },
        {
          id: 'guid2',
          imageURL: "",
          name: 'Product 2',
          description: 'Description',
          isActive: true,
          isHighlighted: false,
          price: 10,
          quantity: 1,
          brand: "brand",
          category: "category",
          discount: 10, 
          createdAt: new Date(),
          updatedAt: new Date(),
          finalPrice: 10
        },
      ];
      const productRequest: PaginatedResult<Product>= {
        pageSize: 10,
        pageIndex: 0,
        totalItems: products.length,
        items: products,
      };
      spyOn(productService, 'getProducts').and.returnValue(
        of(productRequest)
      );

      //Act
      await component.ngOnInit();

      //Assert
      expect(component.products[0]).toEqual(productRequest.items[0]);
    });
  });
});
