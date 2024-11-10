import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule, JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { ActivatedRoute } from "@angular/router";
import { PrivacyPolicyComponent } from "./privacy-policy.component";
import { AuthService } from "../../core/auth/auth.service";

const mockActivatedRoute = {
  params: {
    subscribe: (fn: (params: any) => void) => fn({}),
  },
};

describe("PrivacyPolicyComponent", () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({}),
        PrivacyPolicyComponent 
      ],
      providers: [
        AuthService,
        JwtHelperService,
        {
          provide: JWT_OPTIONS,
          useValue: {},
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the header title", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".header-policy h1")?.textContent).toContain("Privacy Policy");
  });
});
