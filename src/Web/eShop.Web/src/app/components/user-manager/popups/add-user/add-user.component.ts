import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog'
import { User } from '../../../../models/user.model';
import { UserManagementService } from '../../../../services/user-management/user-management.service';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: '../popups.css'
})
export class AddUserComponent implements OnInit{

  user: User ={
    id:'',
    username:'',
    email:'',
    address:'',
    cpf:'',
    cep:'',
    roles:[''],
  }

  constructor(private userService: UserManagementService, public dialogRef : MatDialogRef<AddUserComponent>) { }

  ngOnInit(): void {}

  closeModal() {

    this.userService.add(this.user).subscribe
    (() =>
      {
        console.log('User added successfully');
        this.dialogRef.close();
      },
      error => {
        console.error('Error adding user:', error);
      }
    );
  }
}
