import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { SearchResultComponent } from "./search-result.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { Product } from "../../models/product.model";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { appConfig } from "../../app.config";
import { ProductManagementService } from "../../services/product-management/product-management.service";
import { PaginatedResult } from "../../models/paginated-result.model";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { Category } from "../../models/category.model";

describe("SearchResultComponent", () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockProductService: jasmine.SpyObj<ProductManagementService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj("ProductManagementService", [
      "getProductsByName", "getCategories"
    ]);
    mockActivatedRoute = {
      queryParams: of({ keyword: "test" }),
    };

    await TestBed.configureTestingModule({
      imports: [SearchResultComponent, HeaderComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers,
        { provide: ProductManagementService, useValue: mockProductService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    const categories = [
      {
        id: 1,
        name: "Category 1",
        imageURL: "image",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Category 2",
        imageURL: "image",
        description: "description",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const paginetedResult: PaginatedResult<Category> = {
      pageIndex: 0,
      pageSize: 10,
      totalItems: categories.length,
      items: categories,
    };
    mockProductService.getCategories.and.returnValue(of(paginetedResult));
  });

  it("deve criar o componente", () => {
    expect(component).toBeTruthy();
  });

  it("deve chamar searchProducts com a keyword correta e definir os produtos", () => {
    const mockProducts: Product[] = [
      {
        id: "guid1",
        imageURL: "",
        name: "Produto 1",
        description: "Descrição 1",
        isActive: true,
        isHighlighted: false,
        price: 10,
        quantity: 1,
        brand: "Brand",
        category: "Category",
        createdAt: new Date(),
        updatedAt: new Date(),
        discount: 10,
        finalPrice: 100,
      },
      {
        id: "guid2",
        imageURL: "",
        name: "Produto 2",
        description: "Descrição 2",
        isActive: true,
        isHighlighted: false,
        price: 10,
        quantity: 1,
        brand: "Brand",
        category: "Category",
        createdAt: new Date(),
        updatedAt: new Date(),
        discount: 10,
        finalPrice: 100,
      },
    ];

    const mockResponse: PaginatedResult<Product> = {
      pageSize: 10,
      pageIndex: 0,
      totalItems: mockProducts.length,
      items: mockProducts
    }

    mockProductService.getProductsByName.and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockProductService.getProductsByName).toHaveBeenCalledWith("test");
    expect(component.products).toEqual(mockProducts);
  });

  it("não deve chamar searchProducts se a keyword não estiver presente", () => {
    mockActivatedRoute.queryParams = of({});

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockProductService.getProductsByName).not.toHaveBeenCalled();
    expect(component.products.length).toBe(0);
  });

  it("deve chamar searchProducts com uma nova keyword e definir os produtos corretamente", () => {
    const mockProducts: Product[] = [
      {
        id: "guid3",
        imageURL: "",
        name: "Produto 3",
        description: "Descrição 3",
        isActive: true,
        isHighlighted: false,
        price: 10,
        quantity: 1,
        brand: "Brand",
        category: "Category",
        createdAt: new Date(),
        updatedAt: new Date(),
        discount: 10,
        finalPrice: 100,
      },
    ];

    const mockResponse: PaginatedResult<Product> = {
      pageSize: 10,
      pageIndex: 0,
      totalItems: mockProducts.length,
      items: mockProducts
    }

    mockActivatedRoute.queryParams = of({ keyword: "new-test" });
    mockProductService.getProductsByName.and.returnValue(of(mockResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockProductService.getProductsByName).toHaveBeenCalledWith("new-test");
    expect(component.products).toEqual(mockProducts);
  });

  it("deve lidar com uma resposta vazia do serviço", () => {
    const emptyResponse: PaginatedResult<Product> = {
      pageSize: 10,
      pageIndex: 0,
      totalItems: 0,
      items: []
    }

    mockProductService.getProductsByName.and.returnValue(of(emptyResponse));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.products).toEqual(emptyResponse.items);
  });
});
