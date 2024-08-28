//calculo para validar cpf
import { AbstractControl, ValidatorFn } from '@angular/forms';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const cpf = control.value ? control.value.replace(/[^\d]+/g, '') : ''; 

    if (cpf.length !== 11) 
        return { invalidCpf: true };

    if (/^(\d)\1{10}$/.test(cpf)) 
        return { invalidCpf: true };

    let sum = 0;
    let remainder;

    
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.charAt(i - 1), 10) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9), 10)) return { invalidCpf: true };

    sum = 0;
    
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.charAt(i - 1), 10) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10), 10)) return { invalidCpf: true };

    return null;
  };
}
