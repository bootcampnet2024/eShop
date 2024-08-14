import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserProfile } from '../../models/user-profile.model';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    HeaderComponent,
    FooterComponent,
    MatListModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  perfilForm: FormGroup;
  userProfile: UserProfile = {
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    cpf: ''
  };
  isLoading = true;

  constructor(private fb: FormBuilder) {
    this.perfilForm = this.fb.group({
      nome: ['', Validators.required],
      telefone: ['', Validators.required],
      email: [{ value: '', disabled: true }],
      dataNascimento: [''],
      cpf: [{ value: '', disabled: true }]
    });
  }

  ngOnInit() {
    this.carregarDadosUsuario().then(() => {
      this.isLoading = false;
    });
  }

  async carregarDadosUsuario(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    this.userProfile = {
      nome: 'Nome Completo',
      telefone: '(11) 98765-4321',
      email: 'usuario@exemplo.com',
      dataNascimento: '2000-01-01',
      cpf: '12345678901'
    };
    this.perfilForm.patchValue(this.userProfile);
  }

  onSubmit(): void {
    if (this.perfilForm.valid) {
      this.userProfile = { ...this.userProfile, ...this.perfilForm.value };
      console.log('Updated Data:', this.userProfile);
    }
  }
}
