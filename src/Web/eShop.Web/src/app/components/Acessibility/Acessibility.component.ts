import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-terms-of-service',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './Acessibility.component.html',
  styleUrl: './Acessibility.component.css'
})
export class AcessibilityComponent {

}
