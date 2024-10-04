import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrandModalComponent } from './create-brand-modal.component';

describe('CreateBrandModalComponent', () => {
  let component: CreateBrandModalComponent;
  let fixture: ComponentFixture<CreateBrandModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBrandModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
