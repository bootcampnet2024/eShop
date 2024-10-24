import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { JwtModule, JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { of } from "rxjs";
import { HistoryPageComponent } from "../history-page/history-page.component";

const mockActivatedRoute = {
  params: of({}), 
};

describe("HistoryPageComponent", () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({}),
        HistoryPageComponent,
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

    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
