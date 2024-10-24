import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { CreateProductModalComponent } from './create-product-modal.component';
import { appConfig } from '../../../../app.config';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import { of, throwError } from 'rxjs';
import { ProductDTO } from '../../../../models/productDTO.model';

describe('CreateProductModalComponent', () => {
  let component: CreateProductModalComponent;
  let fixture: ComponentFixture<CreateProductModalComponent>;
  let productManagementService: ProductManagementService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductModalComponent],
      providers: [...appConfig.providers, provideHttpClientTesting(), { provide: MatDialogRef, useValue: {} }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productManagementService = TestBed.inject(ProductManagementService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getBrands and getCategories onInit', () => {
    const getBrandsSpy = spyOn(component, 'getBrands');
    const getCategoriesSpy = spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(getBrandsSpy).toHaveBeenCalled();
    expect(getCategoriesSpy).toHaveBeenCalled();
  });
  it('should get brands', () => {
    const response = [
      {
        id: 1,
        name: 'TechBrand'
      },
      {
        id: 2,
        name: 'FashionBrand'
      }
    ];
    spyOn(productManagementService, 'getBrands').and.returnValue(of(response));
    component.getBrands();
    expect(component.brands).toEqual(response);
  });
  it('should get categories', () => {
    const response = [
      {
        id: 1,
        name: 'Electronics'
      },
      {
        id: 2,
        name: 'Fashion'
      }
    ];
    spyOn(productManagementService, 'getCategories').and.returnValue(of(response));
    component.getCategories();
    expect(component.categories).toEqual(response);
  });
  it('should convert form to product', () => {
    component.productForm.setValue({
      name: 'Product',
      description: 'Product description',
      price: 100.00,
      quantity: 10,
      categoryId: 1,
      brandId: 1,
      imageURL: 'http://example.com/product.png',
      isActive: true,
      isHighlighted: false
    });
    const product = component.convertToProduct();
    expect(product).toEqual({
      name: 'Product',
      description: 'Product description',
      price: 100.00,
      quantity: 10,
      categoryId: 1,
      brandId: 1,
      imageURL: 'http://example.com/product.png',
      isActive: true,
      isHighlighted: false
    });
  });
  it('should call convertToProduct and addProduct successfully', () => {
    const product: ProductDTO = {
      name: 'Product',
      description: 'Product description',
      price: 100.00,
      quantity: 10,
      categoryId: 1,
      brandId: 1,
      imageURL: 'http://example.com/product.png',
      isActive: true,
      isHighlighted: false
    };
    spyOn(component, 'convertToProduct').and.returnValue(product);
    spyOn(productManagementService, 'addProduct').and.returnValue(of('Product added successfully!'));
    spyOn(component, 'close');
    component.addProduct();
    expect(component.convertToProduct).toHaveBeenCalled();
    expect(productManagementService.addProduct).toHaveBeenCalledWith(product);
    expect(component.close).toHaveBeenCalled();
  });
  it('should handle error when addProduct fails', fakeAsync(() => {
    const product: ProductDTO = {
      imageURL: 'invalid-url',
      name: '',
      description: '',
      price: 0,
      quantity: 0,
      brandId: 0,
      categoryId: 0,
      isActive: false,
      isHighlighted: false
    };
    spyOn(component, 'convertToProduct').and.returnValue(product);
    const errorResponse = new Error('Invalid product data');
    spyOn(productManagementService, 'addProduct').and.returnValue(throwError(() => errorResponse));
    const toastErrorSpy = spyOn(component._toastService, 'error');
    component.addProduct();
    tick();
    expect(component.convertToProduct).toHaveBeenCalled();
    expect(productManagementService.addProduct).toHaveBeenCalledWith(product);
    expect(toastErrorSpy).toHaveBeenCalledWith('You provided values that will not be accepted by the API!');
  }));
  it('should close modal', () => {
    const closeSpy = spyOn(component, 'close');
    component.close();
    expect(closeSpy).toHaveBeenCalled();
  });
});