import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    MatMenuModule,
  ],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  searchKeyword: string = "";
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userId?: string;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkLoginStatus();
    this.isAdmin = this.authService.checkAdminRole();
  }

  search() {
    if (this.searchKeyword.trim()) {
      this.router.navigate(["/search"], {
        queryParams: { keyword: this.searchKeyword },
      });
    }
  }

  goToPageIfLoggedIn(page: string) {
    if (this.isLoggedIn) {
      this.router.navigate([page]);
    } else {
      const accessToken = localStorage.getItem("access_token") ?? undefined;
      this.userId = this.extractUserIdFromToken(accessToken);

      if (!accessToken) {
        console.log(
          "Você precisa estar logado para adicionar itens ao carrinho."
        );
      }

      if (!this.userId) {
        console.log("Erro ao identificar o usuário.");
        localStorage.setItem("redirectUrl", page);
        this.router.navigate(["login"]);
        return;
      }
    }
  }
  checkLoginStatus() {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  profile() {
    this.router.navigate([this.authService.getRoleUrl()]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  extractUserIdFromToken(token?: string): string | undefined {
    try {
      if (!token) {
        return undefined;
      }
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Token decodificado:", payload);
      return payload.sub || payload.jti || undefined;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return undefined;
    }
  }
}
