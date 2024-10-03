import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { SearchResultComponent } from "./search-result.component";
import { ProductService } from "../../services/product-list/product.service";
import { HeaderComponent } from "../../shared/header/header.component";
import { Product } from "../../models/product.model";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { appConfig } from "../../app.config";
describe("SearchResultComponent", () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj("ProductService", [
      "searchProducts",
    ]);
    mockActivatedRoute = {
      queryParams: of({ keyword: "test" }),
    };

    await TestBed.configureTestingModule({
      imports: [SearchResultComponent, HeaderComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers,
        { provide: ProductService, useValue: mockProductService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
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
        brand: { id: 1, name: "Marca A" },
        category: { id: 1, name: "Categoria 1" },
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
        brand: { id: 1, name: "Marca B" },
        category: { id: 1, name: "Categoria 2" },
      },
    ];

    mockProductService.searchProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockProductService.searchProducts).toHaveBeenCalledWith("test");
    expect(component.products).toEqual(mockProducts);
  });

  it("não deve chamar searchProducts se a keyword não estiver presente", () => {
    mockActivatedRoute.queryParams = of({});

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockProductService.searchProducts).not.toHaveBeenCalled();
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
        brand: { id: 1, name: "Marca C" },
        category: { id: 1, name: "Categoria 3" },
      },
    ];

    mockActivatedRoute.queryParams = of({ keyword: "new-test" });
    mockProductService.searchProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();
    fixture.detectChanges();

    expect(mockProductService.searchProducts).toHaveBeenCalledWith("new-test");
    expect(component.products).toEqual(mockProducts);
  });

  it("deve lidar com uma resposta vazia do serviço", () => {
    mockProductService.searchProducts.and.returnValue(of([]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.products).toEqual([]);
  });
});
