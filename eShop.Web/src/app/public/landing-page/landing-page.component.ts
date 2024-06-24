import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { StaticCarouselComponent } from '../static-carousel/static-carousel.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [HeaderComponent, StaticCarouselComponent, ProductDisplayComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
