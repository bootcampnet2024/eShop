import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";

import { DisplayProductsComponent } from "./display-products.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { appConfig } from "../../../app.config";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { Product } from "../../../models/product.model";

describe("DisplayProductsComponent", () => {
  let component: DisplayProductsComponent;
  let fixture: ComponentFixture<DisplayProductsComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj("ProductService", [
      "getCatalogItems",
    ]);
    routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

    await TestBed.configureTestingModule({
      imports: [DisplayProductsComponent],
      providers: [
        provideHttpClientTesting,
        ...appConfig.providers,
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayProductsComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getCatalogItems on init", fakeAsync(() => {
    component.displayName = "Test";
    
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Product 1",
        description: "Description 1",
        price: 100,
        quantity: 10,
        brand: { id: 1, name: "Brand 1" },
        category: { id: 1, name: "Category 1" },
        imageURL: "http://example.com/image1.jpg",
        isActive: true,
        isHighlighted: false,
      },
      {
        id: "2",
        name: "Product 2",
        description: "Description 2",
        price: 200,
        quantity: 5,
        brand: { id: 2, name: "Brand 2" },
        category: { id: 2, name: "Category 2" },
        imageURL: "http://example.com/image2.jpg",
        isActive: true,
        isHighlighted: true,
      },
    ];

    const mockProductRequest = {
      items: mockProducts,
      pageSize: 10,
      pageIndex: 0,
      count: mockProducts.length,
    };

    productServiceSpy.getCatalogItems.and.returnValue(of(mockProductRequest));

    fixture.detectChanges();
    tick(550);

    expect(productServiceSpy.getCatalogItems).toHaveBeenCalledWith(
      component.showOnlyHighlighted,
      0,
      component.productQuantity,
      component.categoryId
    );
    expect(component.products).toEqual(mockProducts);
  }));

  it("should navigate to product details when viewProduct is called", () => {
    const mockProduct: Product = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      price: 100,
      quantity: 10,
      brand: { id: 1, name: "Brand 1" },
      category: { id: 1, name: "Category 1" },
      imageURL: "http://example.com/image1.jpg",
      isActive: true,
      isHighlighted: false,
    };
    component.viewProduct(mockProduct);

    expect(routerSpy.navigate).toHaveBeenCalledWith([
      "/product",
      { id: mockProduct.id, name: "Product-1" },
    ]);
  });
});
