import { Component } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';



@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
  ],
  templateUrl: './user-cards.component.html',
  styleUrl: './user-cards.component.css'
})

export class UserCardsComponent {

      cards = [
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
    },

  ]
}
