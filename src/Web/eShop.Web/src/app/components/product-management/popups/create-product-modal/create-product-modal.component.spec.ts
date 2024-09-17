import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductModalComponent } from './create-product-modal.component';

describe('CreateProductModalComponent', () => {
  let component: CreateProductModalComponent;
  let fixture: ComponentFixture<CreateProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
