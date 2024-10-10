import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginPageComponent } from "./login-page.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { appConfig } from "../../../app.config";

describe("LoginPageComponent", () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [provideHttpClientTesting(), ...appConfig.providers],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
