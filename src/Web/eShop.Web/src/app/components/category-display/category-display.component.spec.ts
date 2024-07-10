import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDisplayComponent } from './category-display.component';

describe('CategoryDisplayComponent', () => {
  let component: CategoryDisplayComponent;
  let fixture: ComponentFixture<CategoryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
