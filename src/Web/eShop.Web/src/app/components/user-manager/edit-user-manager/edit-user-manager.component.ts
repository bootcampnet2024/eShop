import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../../../services/user-management/user-management.service';

@Component({
  selector: 'app-edit-user-manager',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-user-manager.component.html',
  styleUrl: '../user-manager.css'
})
export class EditUserManagerComponent implements OnInit {
  editForm: FormGroup;
  userId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', Validators.required],
      cpf: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';

    this.userManagementService.getByCriteria({ id: this.userId }).subscribe(user => {
      this.editForm.patchValue({
        username: user.username,
        email: user.email,
        cep: user.cep,
        cpf: user.cpf,
        address: user.address
      });
    });
  }
  onSubmit(): void {
    if (this.editForm.valid) {
      this.userManagementService.edit(this.userId, this.editForm.value).subscribe({
        next: () => this.router.navigate(['/user-list']),
        error: (err) => console.error('Erro ao editar usuário:', err)
      });
    }
  }
}