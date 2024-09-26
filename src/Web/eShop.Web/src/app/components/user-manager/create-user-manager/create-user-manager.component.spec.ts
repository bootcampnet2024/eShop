import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserManagerComponent } from './create-user-manager.component';

describe('CreateUserManagerComponent', () => {
  let component: CreateUserManagerComponent;
  let fixture: ComponentFixture<CreateUserManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserManagerComponent]
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
