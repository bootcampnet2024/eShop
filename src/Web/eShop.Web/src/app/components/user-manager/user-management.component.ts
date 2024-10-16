import { Component, OnInit } from "@angular/core";
import { UserManagementService } from "../../services/user-management/user-management.service";
import { User } from "../../models/user.model";
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
} from "@angular/material/dialog";
import { AddUserComponent } from "./popups/add-user/add-user.component";
import { EditUserComponent } from "./popups/edit-user/edit-user.component";
import { ChangeUserRolesComponent } from "./popups/change-user-roles/change-user-roles.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { HeaderComponent } from "../../shared/header/header.component";
import { AuthService } from "../../core/auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-management",
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: "./user-management.component.html",
  styleUrl: "./user-management.component.css",
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];

  isAdmin: boolean = false;

  dialogAdd = new MatDialogConfig();
  modalAdd: MatDialogRef<AddUserComponent, any> | undefined;

  dialogEdit = new MatDialogConfig();
  modalEdit: MatDialogRef<EditUserComponent, any> | undefined;

  dialogAdmin = new MatDialogConfig();
  modalAdmin: MatDialogRef<ChangeUserRolesComponent, any> | undefined;

  constructor(
    private userService: UserManagementService,
    private matDialog: MatDialog,
    private authService: AuthService
  ) {
    this.loadUsers();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.isAdmin = this.authService.checkAdminRole();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (response) => {
        this.users = response.filter((x: { username: string; }) => !x.username.includes("admin") && !x.username.includes("manager"));
        //this.users = response;
      },
      error: (err) => {
        console.error("Error loading users", err);
      },
    });
  }

  openAddModal(): void {
    this.dialogAdd.id = "projects-modal-component";
    this.modalAdd = this.matDialog.open(AddUserComponent, this.dialogAdd);
  }

  openEditModal(user: User): void {
    this.dialogEdit.id = "projects-modal-component";
    this.modalEdit = this.matDialog.open(EditUserComponent, {
      data: user,
    });
  }

  deleteUser(user: User): void {
    console.log("called");
    this.userService.delete(user.id).subscribe({
      next: () => {
        console.log("deleted");
        this.users = this.users?.filter((p) => p.id !== user.id);
      },
    });
  }

  changeRoles(user: User) {
    this.dialogAdmin.id = "projects-modal-component";
    this.modalAdmin = this.matDialog.open(ChangeUserRolesComponent, {
      data: user,
    });
  }
}
