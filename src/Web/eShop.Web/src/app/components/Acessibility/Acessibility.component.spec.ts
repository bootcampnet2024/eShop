import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule, JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { ActivatedRoute } from "@angular/router";
import { AcessibilityComponent } from "./Acessibility.component";
import { AuthService } from "../../core/auth/auth.service";

const mockActivatedRoute = {
  params: {
    subscribe: (fn: (params: any) => void) => fn({}),
  },
};

describe("AcessibilityComponent", () => {
  let component: AcessibilityComponent;
  let fixture: ComponentFixture<AcessibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({}),
        AcessibilityComponent
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

    fixture = TestBed.createComponent(AcessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display the header title", () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(".header-terms h1")?.textContent).toContain("Acessibility");
  });
});
