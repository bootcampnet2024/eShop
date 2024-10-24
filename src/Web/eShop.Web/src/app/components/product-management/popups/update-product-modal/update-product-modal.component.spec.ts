import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UpdateProductModalComponent } from './update-product-modal.component';
import { appConfig } from '../../../../app.config';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductDTO } from '../../../../models/productDTO.model';
import { of, throwError } from 'rxjs';
import { ProductManagementService } from '../../../../services/product-management/product-management.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../../../models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('UpdateProductModalComponent', () => {
  let component: UpdateProductModalComponent;
  let fixture: ComponentFixture<UpdateProductModalComponent>;
  let productManagementService: ProductManagementService;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UpdateProductModalComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [UpdateProductModalComponent, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule],
      providers: [...appConfig.providers, provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: dialogRefSpy }, { provide: MAT_DIALOG_DATA, useValue: {id: '3fa85f64-5717-4562-b3fc-2c963f66afa6'} }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    productManagementService = TestBed.inject(ProductManagementService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getProduct on init', () => {
    spyOn(component, 'getBrands');
    spyOn(component, 'getCategories');
    const getProductSpy = spyOn(component, 'getProduct');
    component.ngOnInit();
    expect(getProductSpy).toHaveBeenCalledWith('3fa85f64-5717-4562-b3fc-2c963f66afa6');
  });
  it('should toast invalid id when data.id is invalid on init', () => {
    const toastErrorSpy = spyOn(component._toastService, "error");
    component.data.id =  '';
    component.ngOnInit();
    expect(toastErrorSpy).toHaveBeenCalledWith("This product does not exist in the API!");
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
  it('should call convertToProduct and updateProduct successfully', () => {
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
    const id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    spyOn(component, 'convertToProduct').and.returnValue(product);
    spyOn(productManagementService, 'updateProduct').and.returnValue(of('Product updated successfully!'));
    spyOn(component, 'close');
    component.updateProduct();
    expect(productManagementService.updateProduct).toHaveBeenCalledWith(id, product);
    expect(component.close).toHaveBeenCalled();
  });
  it('should call updateProduct and handle error', fakeAsync(() => {
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
    const id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
    spyOn(component, 'convertToProduct').and.returnValue(product);
    const errorResponse = new Error("Values provided wasn't accepted by the API!");
    spyOn(productManagementService, 'updateProduct').and.returnValue(throwError(() => errorResponse));
    const toastErrorSpy = spyOn(component._toastService, "error");
    component.updateProduct();
    tick();
    expect(toastErrorSpy).toHaveBeenCalledWith("Values provided wasn't accepted by the API!");
  }));
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
    expect(productManagementService.getBrands).toHaveBeenCalled();
  });
  it('should get categories', () => {
    const response = [
      {
        id: 1,
        name: 'Tech'
      },
      {
        id: 2,
        name: 'Fashion'
      }
    ]
    spyOn(productManagementService, 'getCategories').and.returnValue(of(response));
    component.getCategories();
    expect(productManagementService.getCategories).toHaveBeenCalled();
  });
  it('should get product by id', () => {
    const response: Product = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      name: 'Product',
      description: 'Product description',
      price: 100.00,
      quantity: 10,
      brand: { id: 1, name: 'TechBrand' },
      category: { id: 1, name: 'Tech' },
      imageURL: 'http://example.com/product.png',
      isActive: true,
      isHighlighted: false
    };
    spyOn(productManagementService, 'getProductById').and.returnValue(of(response));
    component.getProduct('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    expect(productManagementService.getProductById).toHaveBeenCalledWith('3fa85f64-5717-4562-b3fc-2c963f66afa6');
    expect(component.productForm.value).toEqual({
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
  it('should show error message when product id is invalid', () => {
    spyOn(productManagementService, 'getProductById').and.returnValue(throwError(() => new Error('Invalid product id')));
    spyOn(console, 'log');
    const toastErrorSpy = spyOn(component._toastService, "error");
    component.getProduct('invalid-id');
    expect(toastErrorSpy).toHaveBeenCalledWith('This product does not exist in the API!');
  });
  it('should close modal', () => {
    component.close();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});