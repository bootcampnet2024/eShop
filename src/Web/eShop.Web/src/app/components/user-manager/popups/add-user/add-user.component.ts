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
  phoneNumber: string = "";
  
  constructor(
    private userService: UserManagementService,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {}

  closeModal() {
    const date: Date = new Date();
    const body = {
      username : this.username,
      enabled: true,
      emailVerified: true,
      email: this.email,
      attributes: {
        full_name: this.fullname,
        cpf: this.cpf,
        update_at: date,
        phone_number: this.phoneNumber,
      },
      credentials: [
        {
          type: "password",
          value: this.cpf,
          temporary: true,
        },
      ],
      groups: ["user"],
    };
    this.userService.add(body).subscribe(
      () => {
        console.log("User added successfully");
        this.dialogRef.close();
      },
      (error) => {
        console.error("Error adding user:", error);
      }
    );
  }
}
