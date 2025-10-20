import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactanosService, ContactMessage } from '../../../services/contactanos.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contactanos.component.html'
})
export class ContactanosComponent {
  contactForm; // Declaramos la propiedad sin inicializar

  constructor(
    private fb: FormBuilder,
    private contactService: ContactanosService
  ) {
    // Inicializamos el formulario dentro del constructor
    this.contactForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (!this.contactForm.valid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    // Garantizamos que siempre sean strings
    const payload: ContactMessage = {
      nombre: this.contactForm.get('nombre')?.value || '',
      email: this.contactForm.get('email')?.value || '',
      mensaje: this.contactForm.get('mensaje')?.value || ''
    };

    this.contactService.enviarMensaje(payload).subscribe({
      next: () => {
        alert('¡Mensaje enviado correctamente!');
        this.contactForm.reset(); // Resetea el formulario después de enviar
      },
      error: (err: any) => {
        console.error('Error al enviar mensaje:', err);
        alert('Hubo un error al enviar el mensaje.');
      }
    });
  }
}
