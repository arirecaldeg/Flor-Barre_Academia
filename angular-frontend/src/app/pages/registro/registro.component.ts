import { Component } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {

  registerForm: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      politica: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Registro exitoso:', this.registerForm.value);
      // Aquí podrías llamar a un servicio o navegar
    } else {
      this.registerForm.markAllAsTouched(); // Muestra errores si los hay
    }
  }

  goToLogin() {
    // Aquí puedes navegar al login (ej: usando router.navigate)
    console.log('Ir a inicio de sesión');
  }
}
