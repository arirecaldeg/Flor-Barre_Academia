import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../../services/reserva.service';
import { HorarioService, Horario } from '../../administrador/admin-horarios/horarios.service';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';

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
  pases: number | null = null;
  reservasSemana: any[] = [];

  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horasDisponibles = ['07:30', '08:30', '09:30', '10:30', '11:30', '14:30', '15:30', '16:30', '17:30', '18:30', '19:30'];

  constructor(
    private horarioService: HorarioService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.usuarioId = this.authService.getUserId();
    this.horarioService.getHorarios().subscribe(horarios => {
      this.horariosSemana = horarios;
    });

    if (this.usuarioId) {
      this.obtenerPases();
      this.cargarReservasSemana();
    }
  }

  obtenerPases() {
    if (!this.usuarioId) return;
    this.authService.getUserInfo(this.usuarioId).subscribe({
      next: user => this.pases = user.pases,
      error: () => this.pases = null
    });
  }

  cargarReservasSemana() {
  if (!this.usuarioId) return;
  this.reservaService.getReservasSemana(this.usuarioId).subscribe({
    next: reservas => {
      this.reservasSemana = reservas;
      console.log('Reservas de la semana:', reservas); // <-- AQUÍ VES LOS CAMPOS
    },
    error: () => this.reservasSemana = []
  });
}

  claseEnHorario(dia: string, hora: string): Horario | null {
    return (
      this.horariosSemana.find(
        h =>
          h.dia_semana === dia &&
          h.horario_inicio === hora &&
          h.clase
      ) || null
    );
  }

  reservar(claseId: number, dia: string, hora: string): void {
    if (!claseId || !this.usuarioId) return;

    // Calcula la próxima fecha de ese día+hora
    const fechaClase = this.getProximaFecha(dia, hora);

    const reserva = {
      user_id: this.usuarioId,
      clase_id: claseId,
      fecha_reserva: fechaClase // <-- ENVÍA la fecha real de la clase
    };

    this.reservaService.crearReserva(reserva).subscribe({
      next: res => {
        this.mensaje = '¡Reserva realizada con éxito!';
        if (this.pases !== null) this.pases = this.pases - 1;
        this.cargarReservasSemana();
      },
      error: err => this.mensaje = err.error?.error || 'Error al reservar'
    });
  }

  // Función para calcular la próxima fecha de un día y hora de la semana
  getProximaFecha(dia: string, hora: string): string {
    const diasMap: any = {
      'Lunes': 1, 'Martes': 2, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sábado': 6
    };
    const hoy = new Date();
    let fecha = new Date(hoy);
    fecha.setHours(Number(hora.split(':')[0]), Number(hora.split(':')[1]), 0, 0);
    let day = diasMap[dia];
    let currentDay = hoy.getDay() === 0 ? 7 : hoy.getDay(); // Ajuste para que lunes sea 1
    let diasHastaClase = day - currentDay;
    if (diasHastaClase < 0) diasHastaClase += 7;
    fecha.setDate(hoy.getDate() + diasHastaClase);
    // Devuelve en formato 'YYYY-MM-DD HH:mm:ss'
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')} ${hora}:00`;
  }


  cancelarReserva(reservaId: number): void {
    this.reservaService.eliminarReserva(reservaId).subscribe({
      next: () => {
        this.mensaje = 'Reserva cancelada';
        if (this.pases !== null) this.pases = this.pases + 1;
        this.cargarReservasSemana();
      },
      error: () => this.mensaje = 'No se pudo cancelar la reserva'
    });
  }

  getDiaLabelYFecha(fechaReservaStr: string): string {
    const fechaReserva = new Date(fechaReservaStr);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaReservaNormalized = new Date(fechaReserva);
    fechaReservaNormalized.setHours(0, 0, 0, 0);

    const diasSemana = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
    ];
    const diferenciaMs = fechaReservaNormalized.getTime() - hoy.getTime();
    const diferenciaDias = Math.round(diferenciaMs / (1000 * 60 * 60 * 24));

    let labelDia = '';
    if (diferenciaDias === 0) {
      labelDia = 'Hoy';
    } else if (diferenciaDias === 1) {
      labelDia = 'Mañana';
    } else if (diferenciaDias === -1) {
      labelDia = 'Ayer';
    } else {
      labelDia = diasSemana[fechaReserva.getDay()];
    }

    const fechaFormateada = formatDate(fechaReserva, 'EEEE, d \'de\' MMMM \'de\' y', 'es-ES');
    return `${labelDia} (${fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1)})`;
  }
}
