import { Component } from '@angular/core';

interface Category {
  name: string;
  description: string;
  image: string;
  href: string;
}

@Component({
  selector: 'app-category-display',
  standalone: true,
  imports: [],
  templateUrl: './category-display.component.html',
  styleUrl: './category-display.component.css',
})
export class CategoryDisplayComponent {
  categories: Category[] = [
    {
      name: 'Electronics',
      description: 'Latest gadgets and tech',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VrVfyn1SFew88VWRg-CGKgHaEo%26pid%3DApi&f=1&ipt=d00c37ea2e3c9fa66011f433586d1e2b88b8c76683b32810f56a765c5b5b6b15&ipo=images',
      href: '/category/electronics',
    },
    {
      name: 'Clothing',
      description: 'Trendy apparel for all',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VrVfyn1SFew88VWRg-CGKgHaEo%26pid%3DApi&f=1&ipt=d00c37ea2e3c9fa66011f433586d1e2b88b8c76683b32810f56a765c5b5b6b15&ipo=images',
      href: '/category/clothing',
    },
    {
      name: 'Home & Living',
      description: 'Decor and essentials',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VrVfyn1SFew88VWRg-CGKgHaEo%26pid%3DApi&f=1&ipt=d00c37ea2e3c9fa66011f433586d1e2b88b8c76683b32810f56a765c5b5b6b15&ipo=images',
      href: '/category/home-living',
    },
    {
      name: 'Books',
      description: 'Bestsellers and new releases',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VrVfyn1SFew88VWRg-CGKgHaEo%26pid%3DApi&f=1&ipt=d00c37ea2e3c9fa66011f433586d1e2b88b8c76683b32810f56a765c5b5b6b15&ipo=images',
      href: '/category/books',
    },
    {
      name: 'Sports & Outdoors',
      description: 'Gear for every adventure',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VrVfyn1SFew88VWRg-CGKgHaEo%26pid%3DApi&f=1&ipt=d00c37ea2e3c9fa66011f433586d1e2b88b8c76683b32810f56a765c5b5b6b15&ipo=images',
      href: '/category/sports-outdoors',
    },
    {
      name: 'Beauty & Personal Care',
      description: 'Self-care essentials',
      image:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.VrVfyn1SFew88VWRg-CGKgHaEo%26pid%3DApi&f=1&ipt=d00c37ea2e3c9fa66011f433586d1e2b88b8c76683b32810f56a765c5b5b6b15&ipo=images',
      href: '/category/beauty-personal-care',
    },
  ];
}
