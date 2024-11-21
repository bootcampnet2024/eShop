import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavbarComponent } from "./navbar.component";
import { of } from "rxjs";
import { ProductManagementService } from "../../services/product-management/product-management.service";

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockProductService: jasmine.SpyObj<ProductManagementService>;

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductManagementService', ['getCategories']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: ProductManagementService, useValue: mockProductService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('deve carregar categorias no ngOnInit', () => {
    const categories = [
      { id: 1, name: 'Category 1', imageURL: '', description: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'Category 2', imageURL: '', description: '', createdAt: new Date(), updatedAt: new Date() },
    ];
    mockProductService.getCategories.and.returnValue(of({ pageIndex: 0, pageSize: 10, totalItems: 2, items: categories }));

    component.ngOnInit();
    expect(mockProductService.getCategories).toHaveBeenCalledWith(0, 50);
    expect(component.categories).toEqual(categories);
  });
});
