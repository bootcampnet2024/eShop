import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardsComponent } from './user-cards.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { of } from 'rxjs';
import { UserManagementService } from "../../services/user-management/user-management.service";
import { appConfig } from "../../app.config";

describe('UserCardsComponent', () => {
  let component: UserCardsComponent;
  let fixture: ComponentFixture<UserCardsComponent>;
  let userService: jasmine.SpyObj<UserManagementService>;




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
        HeaderComponent,
        FooterComponent,
        UserCardsComponent,
      ],
      providers: [
        provideHttpClient(),
        ...appConfig.providers,
        { provide: UserManagementService, useValue: userServiceSpy },
      ],
    }).compileComponents();
    

    fixture = TestBed.createComponent(UserCardsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(
      UserManagementService
    ) as jasmine.SpyObj<UserManagementService>;

    component.cards = [
      {
        number: '1234 5678 9012 3456',
        name: 'RODRIGO MENDES',
        validity: '10/26',
        type: 'Credit',
      },
      {
        number: '9876 5432 1098 7654',
        name: 'MARIA APARECIDA',
        validity: '05/26',
        type: 'Debit',
      },
      {
        number: '1111 2222 3333 4444',
        name: 'JOHN DOE',
        validity: '01/28',
        type: 'Debit',
      }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 cards', () => {
    expect(component.cards.length).toBe(3);
  });

  it('should display correct card information', () => {
    
    expect(component.cards[0].number).toContain('1234 5678 9012 3456');
    expect(component.cards[0].name).toContain('RODRIGO MENDES');
    expect(component.cards[0].validity).toContain('10/26');
    expect(component.cards[0].type).toContain('Credit');

    expect(component.cards[1].number).toContain('9876 5432 1098 7654');
    expect(component.cards[1].name).toContain('MARIA APARECIDA');
    expect(component.cards[1].validity).toContain('05/26');
    expect(component.cards[1].type).toContain('Debit');

    expect(component.cards[2].number).toContain('1111 2222 3333 4444');
    expect(component.cards[2].name).toContain('JOHN DOE');
    expect(component.cards[2].validity).toContain('01/28');
    expect(component.cards[2].type).toContain('Debit');
  });
});
