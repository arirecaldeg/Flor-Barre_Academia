import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      // Aquí iría la lógica de autenticación
      console.log('Login info:', email, password);
      this.router.navigate(['/dashboard']); // Cambia por tu ruta deseada
    }
  }

  goToRegister() {
    this.router.navigate(['/registro']);
  }
}
