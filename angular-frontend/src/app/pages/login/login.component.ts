import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // Asegúrate de que la ruta sea correcta
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: () => {
          console.log('Login correcto');
          window.location.href = '/'; // o donde quieras redirigir
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Email o contraseña incorrectos');
        }
      });
    }
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
