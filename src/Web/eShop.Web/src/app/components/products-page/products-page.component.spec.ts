import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpTestingController } from "@angular/common/http/testing";
import { ProductsPageComponent } from "./products-page.component";
import { Product } from "../../models/product.model";
import { of } from "rxjs";
import { ProductRequest } from "../../models/product-request.model";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { appConfig } from "../../app.config";
import { ProductManagementService } from "../../services/product-management/product-management.service";
import { PaginatedResult } from "../../models/paginated-result.model";

describe("ProductsPageComponent", () => {
  let component: ProductsPageComponent;
  let fixture: ComponentFixture<ProductsPageComponent>;
  let productService: ProductManagementService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, FooterComponent, ProductsPageComponent],
      declarations: [],
      providers: [
        ...appConfig.providers,
        provideHttpClientTesting(),
        ProductManagementService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPageComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductManagementService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should load products", () => {
      //Arrange
      const products: Product[] = [
        {
          id: "guid1",
          imageURL: "",
          name: "Product 1",
          description: "Description",
          isActive: true,
          isHighlighted: false,
          price: 10,
          quantity: 1,
          brand: "Brand 1",
          category: "Category 1",
          discount: 0,
          finalPrice: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "guid2",
          imageURL: "",
          name: "Product 2",
          description: "Description",
          isActive: true,
          isHighlighted: false,
          price: 10,
          quantity: 1,
          brand: "Brand 1",
          category: "Category 1",
          discount: 0,
          finalPrice: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      const productRequest: PaginatedResult<Product> = {
        pageSize: 10,
        pageIndex: 0,
        totalItems: products.length,
        items: products,
      };

      spyOn(productService, "getProducts").and.returnValue(of(productRequest));

      //Act
      component.ngOnInit();

      //Assert
      expect(component.products[0]).toEqual(productRequest.items[0]);
    });
  });
});
