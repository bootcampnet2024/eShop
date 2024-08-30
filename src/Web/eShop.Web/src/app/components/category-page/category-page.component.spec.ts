import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageComponent } from './category-page.component';

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
