import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { UserProfileComponent } from "./user-profile.component";
import { of, throwError } from "rxjs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { RouterTestingModule } from "@angular/router/testing";
import { UserManagementService } from "../../services/user-management/user-management.service";
import { provideHttpClient } from "@angular/common/http";
import { appConfig } from "../../app.config";

describe("UserProfileComponent", () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: jasmine.SpyObj<UserManagementService>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj("AuthService", [
      "getAccessToken",
    ]);
    const jwtHelperSpy = jasmine.createSpyObj("JwtHelperService", [
      "decodeToken",
    ]);

    authServiceSpy.getAccessToken.and.returnValue("mockedToken");
    jwtHelperSpy.decodeToken.and.returnValue({ sub: "12345" });

    const userServiceSpy = jasmine.createSpyObj("UserManagementService", {
      getProfile: of({ id: "12345", name: "Test User", number: "123456789" }),
      edit: of({ success: true }),
      loadUserData: of({}),
    });

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        HeaderComponent,
        FooterComponent,
        RouterTestingModule,
        UserProfileComponent,
      ],
      providers: [
        provideHttpClient(),
        ...appConfig.providers,
        { provide: UserManagementService, useValue: userServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(
      UserManagementService
    ) as jasmine.SpyObj<UserManagementService>;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should load user data", () => {
    const mockUserData = {
      username: "testuser",
      number: "1234567890",
      address: "1234567890",
      cpf: "12345678901",
      cep: "12345-678",
      email: "test@example.com",
      sub: "user123",
    };
    userService.getProfile.and.returnValue(of(mockUserData));

    component.ngOnInit();

    fixture.detectChanges();

    expect(userService.getProfile).toHaveBeenCalled();
    expect(component.perfilForm.getRawValue()).toEqual({
      username: "testuser",
      number: "1234567890",
      address: "1234567890",
      email: "test@example.com",
      cpf: "12345678901",
      cep: "12345-678",
    });
    expect(component.userId).toBe("user123");
  });

  it("should handle error when loading user data", () => {
    userService.getProfile.and.returnValue(
      throwError(() => new Error("Error loading user data"))
    );

    component.ngOnInit();

    fixture.detectChanges();

    expect(userService.getProfile).toHaveBeenCalled();
  });

  it("should update user profile", () => {
    component.userId = "user123";

    component.perfilForm.setValue({
      username: "updateduser",
      number: "1234567890",
      address: "0987654321",
      email: "updated@example.com",
      cpf: "10987654321",
      cep: "87654-321",
    });

    userService.edit.and.returnValue(of({}));

    component.updateProfile();

    expect(userService.edit).toHaveBeenCalledWith("user123", {
      username: "updateduser",
      email: "updated@example.com",
      attributes: {
        number: "1234567890",
        cpf: "10987654321",
        address: "0987654321",
        cep: "87654-321",
      },
    });
  });

  it("should handle error when updating profile", () => {
    component.userId = "user123";

    component.perfilForm.setValue({
      username: "updateduser",
      number: "1234567890",
      address: "0987654321",
      email: "updated@example.com",
      cpf: "10987654321",
      cep: "87654-321",
    });

    userService.edit.and.returnValue(
      throwError(() => new Error("Error updating profile"))
    );

    component.updateProfile();

    expect(userService.edit).toHaveBeenCalled();
  });
});
