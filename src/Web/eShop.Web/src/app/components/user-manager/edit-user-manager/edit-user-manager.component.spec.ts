import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserManagerComponent } from './edit-user-manager.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { appConfig } from '../../../app.config';

describe('EditUserManagerComponent', () => {
  let component: EditUserManagerComponent;
  let fixture: ComponentFixture<EditUserManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUserManagerComponent],
      providers: [
        provideHttpClientTesting(),
        ...appConfig.providers
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
