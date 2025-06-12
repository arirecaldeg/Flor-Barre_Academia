import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contactanos.component.html'
})
export class ContactanosComponent {
  contactForm;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Mensaje enviado:', this.contactForm.value);
      // Aquí podrías enviar el formulario a un servicio
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
