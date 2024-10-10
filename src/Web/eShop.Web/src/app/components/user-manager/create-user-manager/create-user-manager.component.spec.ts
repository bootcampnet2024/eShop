import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserManagerComponent } from './create-user-manager.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../../app.config';

describe('CreateUserManagerComponent', () => {
  let component: CreateUserManagerComponent;
  let fixture: ComponentFixture<CreateUserManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserManagerComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
