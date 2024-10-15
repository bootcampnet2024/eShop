import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserManagementService } from '../../../services/user-management/user-management.service';

@Component({
  selector: 'app-create-user-manager',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './create-user-manager.component.html',
  styleUrl: '../user-manager.css'
})
export class CreateUserManagerComponent {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', Validators.required],
      cep: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userManagementService.add(this.userForm.value).subscribe({
        next: () => {
          this.router.navigate(['/view-user-manager']);
        },
        error: (err) => {
          console.error('Erro ao adicionar usuário:', err);
        }
      });
    }
  }
}
