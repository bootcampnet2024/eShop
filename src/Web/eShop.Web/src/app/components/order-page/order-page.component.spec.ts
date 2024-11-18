import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderPageComponent } from './order-page.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../app.config';

describe('OrderPageComponent', () => {
  let component: OrderPageComponent;
  let fixture: ComponentFixture<OrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPageComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
