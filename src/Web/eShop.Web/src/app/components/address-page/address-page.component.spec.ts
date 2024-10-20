import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressPageComponent } from './address-page.component';

describe('AddressPageComponent', () => {
  let component: AddressPageComponent;
  let fixture: ComponentFixture<AddressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
