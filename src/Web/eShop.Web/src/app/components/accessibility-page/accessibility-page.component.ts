import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
  selector: 'app-accessibility-page',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './accessibility-page.component.html',
  styleUrl: './accessibility-page.component.css'
})
export class AccessibilityPageComponent {

}
