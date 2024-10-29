import { Component, OnInit, } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { cpfValidator } from '../signin-page/validators'
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';


@Component({
  selector: 'app-registro-usuarios',
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './signin-page.component.html',
  styleUrl: './signin-page.component.css',
})
export class SigninPageComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        fullname: ['', Validators.required],
        cpf: ['', [Validators.required, cpfValidator()]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        numCasa: ['', Validators.required],
        cep: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  consultCep(): void {
    const cep = this.registrationForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
        next: (data: any) => {
          if (data.erro) {
            this.registrationForm.get('cep')?.setErrors({ invalidCep: true });
          } else {
            this.registrationForm.patchValue({
              address: `${data.logradouro} | ${data.localidade} - ${data.uf}`,
            });
          }
        },
        error: () => {
          this.registrationForm.get('cep')?.setErrors({ invalidCep: true });
        },
      });
    }
  }

  cepValidator(control: any) {
    const cep = control.value;
    if (cep && cep.length === 8) {
      return null;
    }
    return { invalidCep: true };
  }

  signin() {
    if (this.registrationForm.valid) {
      const { fullname, password, email, address, cpf, numCasa } =
        this.registrationForm.value;
      const fullAddress = `${address}, ${numCasa}`;

      this.authService
        .signin(fullname, fullname, password, email, fullAddress, cpf)
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error to register', error);
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}

