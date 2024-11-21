import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { UserManagementService } from "../../services/user-management/user-management.service";
import { User } from "../../models/user.model";
import { MatDialog } from "@angular/material/dialog";
import { AddUserComponent } from "./popups/add-user/add-user.component";
import { EditUserComponent } from "./popups/edit-user/edit-user.component";
import { ChangeUserRolesComponent } from "./popups/change-user-roles/change-user-roles.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { AuthService } from "../../core/auth/auth.service";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-management",
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: "./user-management.component.html",
  styleUrls: ["./user-management.component.css"],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  isAdmin: boolean = false;

  constructor(
    private userService: UserManagementService,
    private matDialog: MatDialog,
    private authService: AuthService,
    private router: Router,
  ) {}

  trackById(index: number, user: User): string {
    return user.id;
  }

  @ViewChild("searchInput", { static: true }) searchInputElementRef!: ElementRef;
  
  ngOnInit(): void {
    this.isAdmin = this.authService.checkAdminRole();
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response.filter((user:{username:string}) => !user.username.includes("admin") && !user.username.includes("manager"));
        console.log('loaded');
      },
      error: (err) => {
        console.error("Error loading users", err);
      },
    });
  }

  searchUser(event: KeyboardEvent): void {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value.trim();

    if (event.key !== "Enter") return;

    if (!value) {
      this.loadUsers();
      return;
    }

    this.userService.getByCriteria(value).subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (err) => {
        console.error("Error searching users", err);
      },
    });
  }

  openAddModal(): void {
    const dialogRef = this.matDialog.open(AddUserComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  openEditModal(user: User): void {
    const dialogRef = this.matDialog.open(EditUserComponent, { data: user });
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }

  deleteUser(user: User): void {
    this.userService.delete(user.id).subscribe({
      next: () => {
        this.users = this.users.filter(p => p.id !== user.id);
        console.log("User deleted:", user.id);
      },
      error: (err) => {
        console.error("Error deleting user", err);
      },
    });
  }

  addressPage(user: User): void {
    this.router.navigate(["/addresses"]);
  }

  changeRoles(user: User): void {
    const dialogRef = this.matDialog.open(ChangeUserRolesComponent, { data: { user } });
    dialogRef.afterClosed().subscribe(() => {
      this.loadUsers();
    });
  }
}
