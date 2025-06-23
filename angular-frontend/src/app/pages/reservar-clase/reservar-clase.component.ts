import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { HorarioService, Horario } from '../../administrador/admin-horarios/horarios.service';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservar-clase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservar-clase.component.html',
})
export class ReservarClaseComponent implements OnInit {
  horariosSemana: Horario[] = [];
  mensaje: string = '';
  usuarioId: number | null = null;

  constructor(
    private horarioService: HorarioService, // <-- inyectado aquí
    private reservaService: ReservaService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getUserId();

    this.horarioService.getHorarios().subscribe({
      next: horarios => this.horariosSemana = horarios,
      error: () => this.mensaje = 'Error cargando horarios'
    });
  }

  reservar(claseId: number): void {
    if (!this.usuarioId) {
      this.mensaje = 'Usuario no identificado';
      return;
    }

    const reserva = {
      user_id: this.usuarioId,
      clase_id: claseId
    };

    this.reservaService.crearReserva(reserva).subscribe({
      next: () => this.mensaje = '¡Reserva realizada con éxito!',
      error: err => this.mensaje = err.error?.error || 'Error al reservar'
    });
  }
}
