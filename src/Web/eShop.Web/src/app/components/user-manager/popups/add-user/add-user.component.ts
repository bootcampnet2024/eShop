import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { User } from "../../../../models/user.model";
import { UserManagementService } from "../../../../services/user-management/user-management.service";

@Component({
  selector: "app-add-user",
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: "./add-user.component.html",
  styleUrl: "../popups.css",
})
export class AddUserComponent implements OnInit {
  fullname: string = "";
  username: string = "";
  email: string = "";
  cpf: string = "";

  constructor(
    private userService: UserManagementService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {}

  closeModal() {
    const date = new Date().toISOString();
    const body = {
      username: this.username,
      enabled: true,
      emailVerified: true,
      email: this.email,
      attributes: {
        full_name: [this.fullname],
        cpf: [this.cpf],
        update_at: [date],
        phone_number: [],
        address: []
      },
      credentials: [
        {
          type: "password",
          value: this.cpf,
          temporary: false,
        },
      ],
      groups: ["user"],
    };

    this.userService.add(body).subscribe({
      next: () => {
        console.log("User added successfully");
        this.dialogRef.close();
      },
      error: (error) => {
        console.error("Error adding user:", error);
      }
    });
  }
}
