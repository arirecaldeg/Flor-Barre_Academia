import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioService, Horario, Clase } from './horarios.service';

@Component({
  selector: 'app-admin-horarios',
  standalone: true,
  templateUrl: './admin-horarios.component.html',
  imports: [CommonModule, FormsModule],
})
export class AdminHorariosComponent implements OnInit {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  times = [
    '07:30', '08:30', '09:30', '10:30',
    '11:30', '14:30', '15:30', '16:30',
    '17:30', '18:30', '19:30'
  ];

  clases: Clase[] = [];
  horarios: Horario[] = [];

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.loadClases();
    this.loadHorarios();
  }

  loadClases(): void {
    this.horarioService.getClases().subscribe({
      next: (data) => this.clases = data,
      error: (err) => console.error('Error al cargar clases:', err)
    });
  }

  loadHorarios(): void {
    this.horarioService.getHorarios().subscribe({
      next: (data) => this.horarios = data,
      error: (err) => console.error('Error al cargar horarios:', err)
    });
  }

  getCellColor(day: string): string {
    const isLightDay = ['Lunes', 'Miércoles', 'Viernes'].includes(day);
    return isLightDay ? 'bg-[#EACFCE] text-[#333]' : 'bg-[#DCCACE] text-[#333]';
  }

  getClassName(day: string, time: string): string {
    const slot = this.horarios.find(h =>
      this.getDayNameFromDate(h.fecha) === day &&
      h.horario_inicio === time
    );
    return slot?.clase?.nombre || '';
  }

  updateClass(day: string, time: string, newClassId: string): void {
    const claseId = parseInt(newClassId, 10);
    if (isNaN(claseId)) return;

    const selectedClase = this.clases.find(c => c.id === claseId);
    const fecha = this.getDateForDay(day);

    const existing = this.horarios.find(h =>
      this.getDayNameFromDate(h.fecha) === day &&
      h.horario_inicio === time
    );

    if (!claseId && existing?.id) {
      this.horarioService.deleteHorario(existing.id).subscribe(() => {
        this.horarios = this.horarios.filter(h => h.id !== existing.id);
      });
      return;
    }

    const payload: Horario = {
      fecha,
      horario_inicio: time,
      hora_fin: this.getHoraFinFromInicio(time),
      clase_id: claseId
    };

    if (existing) {
      payload.id = existing.id;
      this.horarioService.updateHorario(payload).subscribe(() => {
        existing.clase = selectedClase;
      });
    } else {
      this.horarioService.createHorario(payload).subscribe((created) => {
        this.horarios.push({
          ...payload,
          id: created.id,
          clase: selectedClase
        });
      });
    }
  }

  getDayNameFromDate(dateStr: string): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[new Date(dateStr).getDay()];
  }
getDateForDay(day: string): string {
  const dayMap: { [key: string]: number } = {
    'Lunes': 1,
    'Martes': 2,
    'Miércoles': 3,
    'Jueves': 4,
    'Viernes': 5,
    'Sábado': 6
  };

  const base = new Date('2025-06-16'); // lunes de una semana de ejemplo
  const dayOffset = dayMap[day] ?? 1;
  const result = new Date(base);
  result.setDate(base.getDate() + (dayOffset - 1));
  return result.toISOString().split('T')[0];
}

  getHoraFinFromInicio(inicio: string): string {
    const [h, m] = inicio.split(':').map(Number);
    const end = new Date();
    end.setHours(h);
    end.setMinutes(m + 60);
    return end.toTimeString().slice(0, 5);
  }
}
