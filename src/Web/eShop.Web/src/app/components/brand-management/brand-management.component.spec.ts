import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandManagementComponent } from './brand-management.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../app.config';

describe('BrandManagementComponent', () => {
  let component: BrandManagementComponent;
  let fixture: ComponentFixture<BrandManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandManagementComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
