import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule, JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { ActivatedRoute } from "@angular/router";
import { AccessibilityPageComponent } from "./accessibility-page.component";
import { AuthService } from "../../core/auth/auth.service";

const mockActivatedRoute = {
  params: {
    subscribe: (fn: (params: any) => void) => fn({}),
  },
};

describe("AccessibilityPageComponent", () => {
  let component: AccessibilityPageComponent;
  let fixture: ComponentFixture<AccessibilityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({}),
        AccessibilityPageComponent
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

    fixture = TestBed.createComponent(AccessibilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the header title", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".header-terms h1")?.textContent).toContain("Accessibility");
  });
});
