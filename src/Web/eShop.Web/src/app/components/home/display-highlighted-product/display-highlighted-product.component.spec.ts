import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHighlightedProductComponent } from './display-highlighted-product.component';

describe('DisplayHighlightedProductComponent', () => {
  let component: DisplayHighlightedProductComponent;
  let fixture: ComponentFixture<DisplayHighlightedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayHighlightedProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayHighlightedProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
