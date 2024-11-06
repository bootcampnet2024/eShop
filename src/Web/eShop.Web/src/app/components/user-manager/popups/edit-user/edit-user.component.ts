import { Component, OnInit, Inject } from "@angular/core";
import { UserManagementService } from "../../../../services/user-management/user-management.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { User } from "../../../../models/user.model";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";


@Component({
  selector: "app-edit-user",
  standalone: true,
  imports: [
    ReactiveFormsModule],
  templateUrl: "./edit-user.component.html",
  styleUrl: "../popups.css",
})
export class EditUserComponent implements OnInit {
  perfilForm: FormGroup;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserManagementService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.perfilForm = this.fb.group({
      username: [''],
      email: [''],
      phoneNumber: [''],
      cpf: [''],
      fullname: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.perfilForm.patchValue({
      username: this.data.username,
      fullname: this.data.fullname,
      email: this.data.email,
      cpf: this.data.cpf,
      phoneNumber: this.data.phoneNumber,
    });
    this.userId = this.data.id;
    console.log(this.userId);
  }

  closeModal(): void {
    if (this.perfilForm.valid) {
      const body = {
        username : this.perfilForm.get('username')?.value,
        email: this.perfilForm.get('email')?.value,
        attributes: {
          full_name: this.perfilForm.get('fullname')?.value,
          cpf: this.perfilForm.get('cpf')?.value,
          phone_number: this.perfilForm.get('phoneNumber')?.value,
          update_at: new Date(),
        },
      };
      this.userService.edit(this.userId, body).subscribe({
        next: () => {
          console.log('Profile updated successfully');
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });

    } else {
      console.warn('Form is invalid or update time is not valid');
    }
  }
}
