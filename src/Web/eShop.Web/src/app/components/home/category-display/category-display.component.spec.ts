import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoryDisplayComponent } from './category-display.component';
import { appConfig } from '../../../app.config';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CategoryDisplayComponent', () => {
  let component: CategoryDisplayComponent;
  let fixture: ComponentFixture<CategoryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDisplayComponent],
      providers: [...appConfig.providers, provideHttpClientTesting()]
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
