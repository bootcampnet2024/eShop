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
  styleUrl: './signin-page.component.css'
})

export class SigninPageComponent implements OnInit{
  registrationForm!: FormGroup;
  
  constructor(private fb: FormBuilder, private http: HttpClient,) {  }
  
  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      cpf: ['',[  Validators.required, cpfValidator()]], 
      email: ['', [Validators.required, Validators.email]],
      adress: ['', Validators.required],
      cep: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

consultCep(): void {
  const cep = this.registrationForm.get('cep')?.value;
  if (cep && cep.length === 8) {
    this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
      if (data.erro) {
        this.registrationForm.get('cep')?.setErrors({ invalidCep: true });
      } else {
        this.registrationForm.patchValue({
          adress: data.logradouro
        });
      }
    }, () => {
      this.registrationForm.get('cep')?.setErrors({ invalidCep: true });
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

  onSubmit(): void {
    if (this.registrationForm.valid){
      console.log(this.registrationForm.value);

    }else{ 
      console.log('Form is invalid');
    }
  }
}

