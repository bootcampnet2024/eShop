import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { StaticCarouselComponent } from '../static-carousel/static-carousel.component';
import { DisplayHighlightedProductComponent } from '../display-highlighted-product/display-highlighted-product.component';
import { FooterComponent } from "../../../shared/footer/footer.component";
import { CategoryDisplayComponent } from '../category-display/category-display.component';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    imports: [HeaderComponent, StaticCarouselComponent, DisplayHighlightedProductComponent, FooterComponent, CategoryDisplayComponent]
})

export class LandingPageComponent implements OnInit {

    constructor(private route: ActivatedRoute, private viewportScroller: ViewportScroller) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.viewportScroller.scrollToPosition([0,0])
        })
    }
}
