import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavbarComponent } from "./navbar.component";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { appConfig } from "../../app.config";
import { Category } from "../../models/category.model";
import { of } from "rxjs";
import { ProductManagementService } from "../../services/product-management/product-management.service";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let productService: ProductManagementService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        ProductManagementService,
        provideHttpClientTesting(),
        ...appConfig.providers,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productService = TestBed.inject(ProductManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", async () => {
    it("should load categories", async () => {
      //Arrange
      const categories: Category[] = [
        {
          id: 1,
          name: "Category 1",
          imageURL: "image",
          description: "description",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1,
          name: "Category 1",
          imageURL: "image",
          description: "description",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      spyOn(productService, "getCategories").and.returnValue(
        of({ pageSize: 50, pageIndex: 0, items: categories, totalItems: 2 })
      );

      //Act
      await component.ngOnInit();

      //Assert
      expect(component.categories[0]).toEqual(categories[0]);
    });
  });
});
