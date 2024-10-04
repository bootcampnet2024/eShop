import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBrandModalComponent } from './update-brand-modal.component';

describe('UpdateBrandModalComponent', () => {
  let component: UpdateBrandModalComponent;
  let fixture: ComponentFixture<UpdateBrandModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateBrandModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
