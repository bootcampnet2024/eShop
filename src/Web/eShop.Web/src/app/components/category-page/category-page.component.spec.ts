import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { CategoryPageComponent } from './category-page.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product-list/product.service';
import { of } from 'rxjs';
import { ProductRequest } from '../../models/product-request.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../app.config';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let productService: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FooterComponent, CategoryPageComponent],
      declarations: [],
      providers: [
        ProductService,
        provideHttpClientTesting(),
        ...appConfig.providers,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productService = TestBed.inject(ProductService);
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
          id: 'guid',
          name: 'Product 1',
          description: 'Description',
          price: 10,
          brand: '1',
          category: '1',
        },
        {
          id: 'guid',
          name: 'Product 2',
          description: 'Description',
          price: 10,
          brand: '1',
          category: '1',
        },
      ];
      const productRequest: ProductRequest = {
        pageSize: 10,
        pageIndex: 0,
        count: products.length,
        items: products,
      };
      spyOn(productService, 'getCatalogItems').and.returnValue(
        of(productRequest)
      );

      //Act
      await component.ngOnInit();

      //Assert
      expect(component.products[0]).toEqual(productRequest.items[0]);
    });
  });
});
