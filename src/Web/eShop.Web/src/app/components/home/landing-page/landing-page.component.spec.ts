import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../../app.config';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
