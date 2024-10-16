import { Component, OnInit, Inject} from '@angular/core';
import { UserManagementService } from '../../../../services/user-management/user-management.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import { User } from '../../../../models/user.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: '../popups.css'
})
export class EditUserComponent implements OnInit {

  constructor(private userService: UserManagementService, public dialogRef : MatDialogRef<EditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: User) { }

  ngOnInit(): void {}

  user: User ={
    id:this.data.id,
    username:this.data.username,
    email:this.data.email,
    address:this.data.address,
    cpf:this.data.cpf,
    cep:this.data.cep,
    roles:this.data.roles,
  }

  closeModal() {

    this.userService.edit(this.data.id, this.user).subscribe
    (() =>
      {
        console.log('User edited successfully');
        this.dialogRef.close();
      },
      error => {
        console.error('Error editing user:', error);
      }
    );
  }
}
