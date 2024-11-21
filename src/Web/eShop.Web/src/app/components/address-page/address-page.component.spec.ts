import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddressPageComponent } from './address-page.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { appConfig } from '../../app.config';

describe('AddressPageComponent', () => {
  let component: AddressPageComponent;
  let fixture: ComponentFixture<AddressPageComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    const activatedRouteSpy = {
      paramMap: of({
        get: (key: string) => key === 'id' ? '123' : null
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        AddressPageComponent
      ],
      providers: [
        ...appConfig.providers,
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddressPageComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify(); 
  });
});
