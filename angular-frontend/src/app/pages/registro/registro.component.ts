import { Component } from '@angular/core';
import {FormBuilder, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
})
export class RegistroComponent {
  registerForm: ReturnType<FormBuilder['group']>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        politica: [false, Validators.requiredTrue]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // Validador personalizado para comprobar si coinciden las contraseñas
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { nombre, email, password } = this.registerForm.value;

      this.authService
        .registrarUsuario({
          nombre,
          email,
          password,
          rol: 'ROLE_USER' // opcional, si el backend ya asigna ROLE_USER por defecto
        })
        .subscribe({
          next: () => {
            alert('Registro exitoso');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error al registrar usuario:', error);
            alert('Ha ocurrido un error al registrarse.');
          }
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
