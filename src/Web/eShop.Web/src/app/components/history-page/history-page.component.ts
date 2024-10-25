import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-history-page',
  standalone: true,
  imports: [HeaderComponent, NavbarComponent, FooterComponent],
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {

}
