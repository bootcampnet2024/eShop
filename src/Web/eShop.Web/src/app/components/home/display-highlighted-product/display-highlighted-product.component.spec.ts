import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHighlightedProductComponent } from './display-highlighted-product.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../../app.config';

describe('DisplayHighlightedProductComponent', () => {
  let component: DisplayHighlightedProductComponent;
  let fixture: ComponentFixture<DisplayHighlightedProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayHighlightedProductComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers
      ]
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
