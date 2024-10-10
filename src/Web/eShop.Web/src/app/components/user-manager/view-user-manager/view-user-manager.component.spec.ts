import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserManagerComponent } from './view-user-manager.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../../app.config';

describe('ViewUserManagerComponent', () => {
  let component: ViewUserManagerComponent;
  let fixture: ComponentFixture<ViewUserManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserManagerComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
