import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginPageComponent } from "./login-page.component";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { MatDialog } from "@angular/material/dialog";
import { appConfig } from "../../../app.config";
import { RecoverPasswordModalComponent } from "../popups/recover-password-modal/recover-password-modal.component";
import { of } from "rxjs";

describe("LoginPageComponent", () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    dialogMock.open.and.returnValue({ afterClosed: () => of({}) });

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: MatDialog, useValue: dialogMock },
        ...appConfig.providers,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should open the RecoverPasswordModalComponent when openResetPasswordDialog is called", () => {
    component.openResetPasswordDialog();

    expect(dialogSpy.open).toHaveBeenCalledWith(RecoverPasswordModalComponent, {
      width: '300px',
    });
  });
});