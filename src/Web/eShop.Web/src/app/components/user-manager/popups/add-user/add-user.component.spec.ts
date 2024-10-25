import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AddUserComponent } from './add-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  const jwtSpy = jasmine.createSpyObj('JwtHelperService', ['decodeToken']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponent, HttpClientTestingModule],
      providers: [
        { provide: JwtHelperService, useValue: {jwtSpy} }, 
        { provide: MatDialogRef, useValue: {} },
        { provide: ActivatedRoute, useValue: {} },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
