import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { StaticCarouselComponent } from '../static-carousel/static-carousel.component';
import { ProductDisplayComponent } from '../product-display/product-display.component';
import { FooterComponent } from "../../shared/footer/footer.component";
import { CategoryDisplayComponent } from '../category-display/category-display.component';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    imports: [HeaderComponent, StaticCarouselComponent, ProductDisplayComponent, FooterComponent, CategoryDisplayComponent]
})
export class LandingPageComponent {

}
