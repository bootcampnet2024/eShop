import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserManagerComponent } from './view-user-manager.component';

describe('ViewUserManagerComponent', () => {
  let component: ViewUserManagerComponent;
  let fixture: ComponentFixture<ViewUserManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserManagerComponent]
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
