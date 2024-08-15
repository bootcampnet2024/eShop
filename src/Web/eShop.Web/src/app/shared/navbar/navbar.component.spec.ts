import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { CategoryService } from '../../services/category-filter/category.service';
import { appConfig } from '../../app.config';
import { Category } from '../../models/category.model';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        CategoryService,
        provideHttpClientTesting(),
        ...appConfig.providers,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    categoryService = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', async () => {
    it('should load categories', async () => {
      //Arrange
      const categories: Category[] = [
        {
          id: 1,
          name: 'Category 1',
        },
        {
          id: 1,
          name: 'Category 1',
        },
      ];
      spyOn(categoryService, 'getCatalogCategories').and.returnValue(
        of(categories)
      );

      //Act
      await component.ngOnInit();

      //Assert
      expect(component.categories[0]).toEqual(categories[0]);
    });
  });
});
