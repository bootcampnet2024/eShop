import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticCarouselComponent } from './static-carousel.component';

describe('StaticCarouselComponent', () => {
  let component: StaticCarouselComponent;
  let fixture: ComponentFixture<StaticCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaticCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaticCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
