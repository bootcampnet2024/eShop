import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AngularToastifyModule],
  providers: [ToastService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'eShop.Web';
}
