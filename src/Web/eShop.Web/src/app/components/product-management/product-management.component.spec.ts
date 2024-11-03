import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProductManagementComponent } from "./product-management.component";
import { appConfig } from "../../app.config";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { ProductManagementService } from "../../services/product-management/product-management.service";
import { HttpClient } from "@angular/common/http";
import { of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";
import { CreateProductModalComponent } from "./popups/create-product-modal/create-product-modal.component";
import { UpdateProductModalComponent } from "./popups/update-product-modal/update-product-modal.component";
import { Product } from "../../models/product.model";
import { ProductDTO } from "../../models/productDTO.model";
import { Toast } from "angular-toastify/lib/toast";

describe("ProductManagementComponent", () => {
  let component: ProductManagementComponent;
  let fixture: ComponentFixture<ProductManagementComponent>;
  let mockProductManagementService: ProductManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManagementComponent],
      providers: [
        ...appConfig.providers,
        provideHttpClientTesting(),
        ProductManagementService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductManagementComponent);
    component = fixture.componentInstance;
    mockProductManagementService = TestBed.inject(ProductManagementService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call getProducts on init", () => {
    const getProductsSpy = spyOn(component, "getProducts");
    component.ngOnInit();
    expect(component.getProducts).toHaveBeenCalled();
  });
  it("should get products", () => {
    const response = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Laptop Pro",
        description: "A high-end laptop with powerful features",
        price: 1500.0,
        quantity: 5,
        brand: {
          id: 1,
          name: "TechBrand",
        },
        category: {
          id: 1,
          name: "Electronics",
        },
        imageURL: "http://example.com/laptop-pro.png",
        isActive: true,
        isHighlighted: false,
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174001",
        name: "Smartphone X",
        description: "Latest generation smartphone with advanced camera",
        price: 999.99,
        quantity: 20,
        brand: {
          id: 2,
          name: "MobileTech",
        },
        category: {
          id: 2,
          name: "Mobile Devices",
        },
        imageURL: "http://example.com/smartphone-x.png",
        isActive: true,
        isHighlighted: false,
      },
    ];
    const getProductsSpy = spyOn(
      mockProductManagementService,
      "getProducts"
    ).and.returnValue(of(response));
    component.getProducts();
    fixture.detectChanges();
    expect(mockProductManagementService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(response);
  });
  it("should return a searched product", () => {
    const response = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Laptop Pro",
        description: "A high-end laptop with powerful features",
        price: 1500.0,
        quantity: 5,
        brand: {
          id: 1,
          name: "TechBrand",
        },
        category: {
          id: 1,
          name: "Electronics",
        },
        imageURL: "http://example.com/laptop-pro.png",
        isActive: true,
        isHighlighted: false,
      },
    ];
    const getProductsSpy = spyOn(
      mockProductManagementService,
      "getProductsByName"
    ).and.returnValue(of(response));
    const searchInput = document.createElement("input");
    searchInput.value = "Laptop";
    const event = new KeyboardEvent("keyup", { key: "Enter" });
    component.searchProduct(searchInput.value, event);
    fixture.detectChanges();
    expect(mockProductManagementService.getProductsByName).toHaveBeenCalledWith(
      searchInput.value
    );
    expect(component.products).toEqual(response);
  });
  it("should return all products when search input is empty", () => {
    const response = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Laptop Pro",
        description: "A high-end laptop with powerful features",
        price: 1500.0,
        quantity: 5,
        brand: {
          id: 1,
          name: "TechBrand",
        },
        category: {
          id: 1,
          name: "Electronics",
        },
        imageURL: "http://example.com/laptop-pro.png",
        isActive: true,
        isHighlighted: false,
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174001",
        name: "Smartphone X",
        description: "Latest generation smartphone with advanced camera",
        price: 999.99,
        quantity: 20,
        brand: {
          id: 2,
          name: "MobileTech",
        },
        category: {
          id: 2,
          name: "Mobile Devices",
        },
        imageURL: "http://example.com/smartphone-x.png",
        isActive: true,
        isHighlighted: false,
      },
    ];
    const getProductsSpy = spyOn(
      mockProductManagementService,
      "getProducts"
    ).and.returnValue(of(response));
    const searchInput = document.createElement("input");
    searchInput.value = "";
    const event = new KeyboardEvent("keyup", { key: "Enter" });
    component.searchProduct(searchInput.value, event);
    fixture.detectChanges();
    expect(mockProductManagementService.getProducts).toHaveBeenCalledWith(false, component.pageIndex, component.pageSize, [], [], 0);
    expect(component.products).toEqual(response);
  });
  it("should disable a product", () => {
    const request = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Laptop Pro",
        description: "A high-end laptop with powerful features",
        price: 1500.0,
        quantity: 5,
        brand: {
          id: 1,
          name: "TechBrand",
        },
        category: {
          id: 1,
          name: "Electronics",
        },
        imageURL: "http://example.com/laptop-pro.png",
        isActive: true,
        isHighlighted: false,
      },
      {
        id: "123e4567-e89b-12d3-a456-426614174001",
        name: "Smartphone X",
        description: "Latest generation smartphone with advanced camera",
        price: 999.99,
        quantity: 20,
        brand: {
          id: 2,
          name: "MobileTech",
        },
        category: {
          id: 2,
          name: "Mobile Devices",
        },
        imageURL: "http://example.com/smartphone-x.png",
        isActive: true,
        isHighlighted: false,
      },
    ];
    const disableProductSpy = spyOn(
      mockProductManagementService,
      "disableProduct"
    ).and.returnValue(of({ ...request[0], isActive: false }));
    component.disableProduct(request[0].id);
    const response = [{ ...request[0], isActive: false }, ...request.slice(1)];
    const getProductsSpy = spyOn(
      mockProductManagementService,
      "getProducts"
    ).and.returnValue(of(response));
    component.getProducts();
    fixture.detectChanges();
    expect(mockProductManagementService.disableProduct).toHaveBeenCalledWith(
      request[0].id
    );
    expect(response[0].isActive).toBeFalse();
    expect(component.products).toEqual(response);
    expect(component.products).toContain(response[0]);
  });
  it("should show alert when disabling a product fails", () => {
    const product = [
      {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Laptop Pro",
        description: "A high-end laptop with powerful features",
        price: 1500.0,
        quantity: 5,
        brand: {
          id: 1,
          name: "TechBrand",
        },
        category: {
          id: 1,
          name: "Electronics",
        },
        imageURL: "http://example.com/laptop-pro.png",
        isActive: true,
        isHighlighted: false,
      },
    ];
    const errorResponse = new Error(`Failed to disable product with ID ${product[0].id}.`);
    const disableProductSpy = spyOn(
      mockProductManagementService,
      "disableProduct"
    ).and.returnValue(throwError(() => errorResponse));
    const toastErrorSpy = spyOn(component._toastService, "error");
    component.disableProduct(product[0].id);
    expect(toastErrorSpy).toHaveBeenCalledWith(
      `Failed to disable product with ID ${product[0].id}.`
    );
  });
  it("should return true when text is null", () => {
    const result = component.isEmpty(null as unknown as string);
    expect(result).toBeTrue();
  });
  it("should return true when text is an empty string", () => {
    const result = component.isEmpty("");
    expect(result).toBeTrue();
  });
  it("should return false when text is a non-empty string", () => {
    const result = component.isEmpty("Laptop Pro");
    expect(result).toBeFalse();
  });
  it("should open create product modal", () => {
    const afterClosedSpy = jasmine.createSpy("afterClosed").and.returnValue({
      subscribe: jasmine.createSpy("subscribe"),
    });
    const openDialogSpy = spyOn(component.dialog, "open").and.returnValue({
      afterClosed: afterClosedSpy,
    } as any);
    component.OpenCreateProductModal();
    expect(openDialogSpy).toHaveBeenCalledWith(CreateProductModalComponent, {
      width: "65%",
      height: "65%",
      maxWidth: "100%",
      maxHeight: "100%",
    });
    expect(afterClosedSpy).toHaveBeenCalled();
  });
  it("should open update product modal", () => {
    const afterClosedSpy = jasmine.createSpy("afterClosed").and.returnValue({
      subscribe: jasmine.createSpy("subscribe"),
    });
    const openDialogSpy = spyOn(component.dialog, "open").and.returnValue({
      afterClosed: afterClosedSpy,
    } as any);
    const productId = "123e4567-e89b-12d3-a456-426614174000";
    component.OpenUpdateProductModal(productId);
    expect(openDialogSpy).toHaveBeenCalledWith(UpdateProductModalComponent, {
      data: {
        id: productId,
      },
      width: "65%",
      height: "65%",
      maxWidth: "100%",
      maxHeight: "100%",
    });
    expect(afterClosedSpy).toHaveBeenCalled();
  });
});