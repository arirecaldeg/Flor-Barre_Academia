import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioService, Horario } from '../../administrador/admin-horarios/horarios.service';

@Component({
  selector: 'app-horario',
  standalone: true,
  templateUrl: './horarios.component.html',
  imports: [CommonModule, FormsModule],
})
export class HorarioComponent implements OnInit {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  times = [
    '07:30', '08:30', '09:30', '10:30',
    '11:30', '14:30', '15:30', '16:30',
    '17:30', '18:30', '19:30'
  ];

  horarios: Horario[] = [];

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.horarioService.getHorarios().subscribe({
      next: (data) => {
        this.horarios = data;
        // Para depurar, opcional:
        // data.forEach(h => console.log(`${h.fecha} → ${this.getDayNameFromDate(h.fecha)} @ ${h.horario_inicio}`));
      },
      error: (err) => console.error('Error al cargar horarios:', err)
    });
  }

  getClassName(day: string, time: string): string {
    const slot = this.horarios.find(h =>
      this.getDayNameFromDate(h.fecha) === day &&
      h.horario_inicio === time
    );
    return slot?.clase?.nombre || '';
  }

  getCellColor(day: string): string {
    const isLightDay = ['Lunes', 'Miércoles', 'Viernes'].includes(day);
    return isLightDay ? 'bg-[#EACFCE] text-[#333]' : 'bg-[#DCCACE] text-[#333]';
  }

  getDayNameFromDate(dateStr: string): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day); // evitamos zona horaria incorrecta
    return days[date.getDay()];
  }
}
