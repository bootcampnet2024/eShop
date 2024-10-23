import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../core/auth/auth.service';
@Component({
  selector: 'app-recover-password-modal',
  standalone: true,
  imports: [
    FormsModule,
    MatDialogModule,
    MatInputModule,  
    MatButtonModule,  
    MatIconModule
  ],
  templateUrl: './recover-password-modal.component.html',
  styleUrls: ['./recover-password-modal.component.css'], 
})
export class RecoverPasswordModalComponent {
  resetEmail: string = '';
  userId: string | null = null; 
  constructor(private dialogRef: MatDialogRef<RecoverPasswordModalComponent>, private authService: AuthService) {}
  recoverPassword() {
    this.authService.getUserIdByEmail(this.resetEmail).subscribe({
      next: (id) => {
        this.userId = id;
        if (this.userId) {
          this.authService.recoverPassword(this.userId).subscribe({
            next: () => {
              this.dialogRef.close();
            },
            error: (error) => {
              console.error('Error to recover password', error);
            },
          });
        } else {
          console.error('User not found.'); 
        }
      },
      error: (error) => {
        console.error('Error fetching user ID', error);
      },
    });
  }
  
  close() {
    this.dialogRef.close();
  }
}