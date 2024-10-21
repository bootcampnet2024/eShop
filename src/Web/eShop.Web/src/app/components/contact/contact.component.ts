import { Component } from "@angular/core";
import { HeaderComponent } from "../../shared/header/header.component";
import { EditUserManagerComponent } from "../user-manager/edit-user-manager/edit-user-manager.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { faFacebookSquare, faInstagramSquare, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faP } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [HeaderComponent, EditUserManagerComponent, FooterComponent, FontAwesomeModule],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})

export class ContactComponent {
  faInstagramSquare = faInstagramSquare;
  faLinkedin = faLinkedin;
  faFacebookSquare = faFacebookSquare;
  faP = faP;
}
