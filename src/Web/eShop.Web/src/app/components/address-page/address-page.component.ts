import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-address-page',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    HttpClientModule,
    RouterModule, CommonModule],
  templateUrl: './address-page.component.html',
  styleUrl: './address-page.component.css'
})
export class AddressPageComponent {
  userId?: string;
  addressForm: FormGroup;
  zipInvalid: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.addressForm = this.fb.group({
      zip: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
      name: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      complement: [''],
      reference: ['']
    });
    
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id') || '' as string;
      this.getUserAddresses();
    });
  }

  getUserAddresses() {

  }

  lookupZIP() {
    const zip = this.addressForm.get('zip')?.value;

    if (zip.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${zip}/json/`)
        .subscribe((data: any) => {
          if (data.erro) {
            this.zipInvalid = true;
            this.addressForm.patchValue({ street: '' });
          } else {
            this.zipInvalid = false;
            this.addressForm.patchValue({
              street: data.logradouro,
              city: data.localidade,
              state: data.uf
            });
          }
        });
    } else {
      this.zipInvalid = true;
    }
  }
}
