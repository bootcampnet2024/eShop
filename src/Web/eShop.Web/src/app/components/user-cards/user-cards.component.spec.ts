import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardsComponent } from './user-cards.component';
import { MatCardModule } from '@angular/material/card';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { By } from '@angular/platform-browser';

describe('UserCardsComponent', () => {
  let component: UserCardsComponent;
  let fixture: ComponentFixture<UserCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, FooterComponent, HeaderComponent, UserCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 cards', () => {
    const cardElements = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(cardElements.length).toBe(3);
  });

  it('should display correct card information', () => {
    const cardElements = fixture.debugElement.queryAll(By.css('mat-card'));
    
    expect(cardElements[0].nativeElement.textContent).toContain('1234 5678 9012 3456');
    expect(cardElements[0].nativeElement.textContent).toContain('RODRIGO MENDES');
    expect(cardElements[0].nativeElement.textContent).toContain('10/26');
    expect(cardElements[0].nativeElement.textContent).toContain('Credit');

    expect(cardElements[1].nativeElement.textContent).toContain('9876 5432 1098 7654');
    expect(cardElements[1].nativeElement.textContent).toContain('MARIA APARECIDA');
    expect(cardElements[1].nativeElement.textContent).toContain('05/26');
    expect(cardElements[1].nativeElement.textContent).toContain('Debit');

    expect(cardElements[2].nativeElement.textContent).toContain('1111 2222 3333 4444');
    expect(cardElements[2].nativeElement.textContent).toContain('JOHN DOE');
    expect(cardElements[2].nativeElement.textContent).toContain('01/28');
    expect(cardElements[2].nativeElement.textContent).toContain('Debit');
  });
});
