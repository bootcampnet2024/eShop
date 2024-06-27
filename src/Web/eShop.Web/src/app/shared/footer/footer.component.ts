import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquareFacebook, faTwitterSquare, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  faSquareFacebook = faSquareFacebook;
  faTwitterSquare = faTwitterSquare;
  faYoutubeSquare = faYoutubeSquare;
}
