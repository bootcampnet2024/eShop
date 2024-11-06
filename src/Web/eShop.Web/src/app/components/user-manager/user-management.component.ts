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
  styleUrl: "./user-management.component.css",
})
export class UserManagementComponent implements OnInit {
  users?: User[];
  isAdmin: boolean = false;

  constructor(
    private userService: UserManagementService,
    private matDialog: MatDialog,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loadUsers();
  }

  @ViewChild('searchInput', { static: true }) searchInputElementRef!: ElementRef;
  searchInputElement!: HTMLInputElement;

  ngOnInit(): void {
    this.isAdmin = this.authService.checkAdminRole();
  }

  isEmpty = (text: string): boolean => {
    return text === null || text.match(/^ *$/) !== null;
  };

  searchUser = (event: KeyboardEvent): void => {
    const element = event.currentTarget as HTMLInputElement
    const value = element.value

    if (event.key !== 'Enter') return;

    if (this.isEmpty(value)) {
      this.userService.getAll()
        .subscribe({
          next: (response) => {
            this.users = response
          }
        });
      return;
    }
    this.userService.getByCriteria(value)
      .subscribe((response) => {
        this.users = response
      })
  };

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (response) => {
        if (this.isAdmin) {
          this.users = response;
          console.log('Usuários carregados:', response);
        } else {
          this.users = response.filter((x: { username:string}) => 
            !x.username.includes("admin") && !x.username.includes("manager")       
        );
        }
      },
      error: (err) => {
        console.error("Error loading users", err);
      },
    });
  }

  openAddModal(): void {
    const dialogRef = this.matDialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.loadUsers();
    });
  }

  openEditModal(user: User): void {
    const dialogRef = this.matDialog.open(EditUserComponent, {
      data: {
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadUsers();
    });
  }

  deleteUser(user: User): void {
    console.log("called");
    this.userService.delete(user.id).subscribe({
      next: () => {
        console.log("deleted");
        this.users = this.users?.filter((p) => p.id !== user.id);
      },
      error: (err) => {
        console.error("Error deleting user", err);
      }
    });
  }

  addressPage(user: User): void{
    this.router.navigate(['/addresses']);
  }

  changeRoles(user: User):void {
    const dialogRef = this.matDialog.open(ChangeUserRolesComponent, {
      data: {
        user: user,
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadUsers();
    });
  }
}
