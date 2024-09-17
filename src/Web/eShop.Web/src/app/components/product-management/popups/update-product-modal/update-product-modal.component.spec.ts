import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductModalComponent } from './update-product-modal.component';

describe('UpdateProductModalComponent', () => {
  let component: UpdateProductModalComponent;
  let fixture: ComponentFixture<UpdateProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProductModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
