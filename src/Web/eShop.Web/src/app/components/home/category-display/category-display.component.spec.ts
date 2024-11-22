import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoryDisplayComponent } from './category-display.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importação necessária

describe('CategoryDisplayComponent', () => {
  let component: CategoryDisplayComponent;
  let fixture: ComponentFixture<CategoryDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryDisplayComponent, HttpClientTestingModule], // Importe o componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
