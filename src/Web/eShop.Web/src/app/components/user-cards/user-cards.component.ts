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
      number: '5502 5678 9012 3456',
      name: 'RODRIGO MENDES',
      type: 'Credit',
      flag: ''
    },
    {
      number: '6884 5432 1098 7654',
      name: 'MARIA APARECIDA',
      type: 'Debit',
      flag: ''
    },
    {
      number: '4002 2222 3333 4444',
      name: 'JOHN DOE',
      type: 'Debit',
      flag: ''
    },

  ];

  constructor() {
    this.setFlags();
  }

  formatNumber(cardNumber: string): string {
    return cardNumber.slice(0,4) + ' **** **** ****';
  }

  baseCardUrl = "assets/user-cards/"
  
  setFlags(): void {
    this.cards = this.cards.map(card => {
      if (card.number.startsWith('4')) {
        card.flag = `${this.baseCardUrl}visa.svg`; 
      } else if (card.number.startsWith('2') || card.number.startsWith('5')) {
        card.flag = `${this.baseCardUrl}mastercard.svg`;
      } else if (card.number.startsWith('6')) {
        card.flag = `${this.baseCardUrl}elo.png`;
      }
      return card;
    })
  }

  

}
