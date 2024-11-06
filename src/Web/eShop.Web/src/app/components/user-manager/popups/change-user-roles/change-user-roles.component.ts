import { Component } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { UserManagementService } from "../../../../services/user-management/user-management.service";
import { NgFor } from "@angular/common";

@Component({
  selector: "app-change-user-roles",
  standalone: true,
  imports: [RouterLink, FormsModule, NgFor, ReactiveFormsModule],
  templateUrl: "./change-user-roles.component.html",
  styleUrl: "../popups.css",
})
export class ChangeUserRolesComponent {
  constructor(private userService: UserManagementService) {}

  selectedRole: string = "";
  userRoles: string[] = [];
  userId: string = "";

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {

        this.userRoles = data.roles;
      },
      error: (err) => {
        console.error("Error fetching profile:", err);
      },
    });
  }

  onSubmit(): void {
    if (this.selectedRole) {
      console.log(`Selected Role: ${this.selectedRole}`);
      this.userService.addToGroup(this.userId, this.selectedRole).subscribe({
        next: () => {
          console.log(`Role ${this.selectedRole} added to user ${this.userId}`);
          this.userRoles.push(this.selectedRole);
        },
        error: (err) => {
          console.error("Error adding role:", err);
        },
      });
    } else {
      console.log("Please select a role");
    }
  }

  onDeleteRole(role: string): void {
    this.userService.deleteFromGroup(this.userId, role).subscribe({
      next: () => {
        console.log(`Role ${role} removed from user ${this.userId}`);
        this.userRoles = this.userRoles.filter((r) => r !== role);
      },
      error: (err) => {
        console.error("Error removing role:", err);
      },
    });
  }
}
