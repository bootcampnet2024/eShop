import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ChangeUserRolesComponent } from "./change-user-roles.component";

describe("ChangeUserRolesComponent", () => {
  let component: ChangeUserRolesComponent;
  let fixture: ComponentFixture<ChangeUserRolesComponent>;
  const jwtSpy = jasmine.createSpyObj("JwtHelperService", ["decodeToken"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeUserRolesComponent, HttpClientTestingModule],
      providers: [
        { provide: JwtHelperService, useValue: {jwtSpy} },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
