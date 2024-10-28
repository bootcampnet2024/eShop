import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebookSquare, faSquareXTwitter, faYoutubeSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faSquareXTwitter;
  faYoutubeSquare = faYoutubeSquare;
  faInstagramSquare = faInstagramSquare;

  goToTopOfThePage(): void {
    window.scrollTo(0, 0);
  }
}
