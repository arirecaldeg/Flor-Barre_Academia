import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Update the path below if your horario.service.ts is in a different location
import { HorarioService, Horario } from './horarios.service'; // Adjust the import path as necessary

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

  availableClasses = ['BARRE', 'BARRE SUAVE', 'BARRE EMB', 'BARRE PRO', 'BARRE ENG', '']; // '' = eliminar

  horarios: Horario[] = [];

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.loadHorarios();
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

  updateClass(day: string, time: string, newClassName: string): void {
    const existing = this.horarios.find(h =>
      this.getDayNameFromDate(h.fecha) === day &&
      h.horario_inicio === time
    );

    if (newClassName === '') {
      if (existing?.id) {
        this.horarioService.deleteHorario(existing.id).subscribe(() => {
          this.horarios = this.horarios.filter(h => h.id !== existing.id);
        });
      }
      return;
    }

    const claseId = this.getClaseIdByNombre(newClassName);
    const fecha = this.getDateForDay(day);

    const payload: Horario = {
      fecha,
      horario_inicio: time,
      hora_fin: this.getHoraFinFromInicio(time),
      clase_id: claseId
    };

    if (existing) {
      payload.id = existing.id;
      this.horarioService.updateHorario(payload).subscribe(() => {
        existing.clase = { id: claseId, nombre: newClassName };
      });
    } else {
      this.horarioService.createHorario(payload).subscribe((created) => {
        this.horarios.push({
          ...payload,
          id: created.id,
          clase: { id: claseId, nombre: newClassName }
        });
      });
    }
  }

  getClaseIdByNombre(nombre: string): number {
 const clases: { [key: string]: number } = {
      'BARRE': 1,
      'BARRE SUAVE': 2,
      'BARRE EMB': 3,
      'BARRE PRO': 4,
      'BARRE ENG': 5
    };
    return clases[nombre] ?? 1;
  }

  getDayNameFromDate(dateStr: string): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[new Date(dateStr).getDay()];
  }

  getDateForDay(day: string): string {
    const today = new Date();
    const targetIndex = this.days.indexOf(day);
    const currentIndex = today.getDay() === 0 ? 6 : today.getDay() - 1; // Lunes = 0

    const diff = targetIndex - currentIndex;
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + diff);

    return targetDate.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  getHoraFinFromInicio(inicio: string): string {
    const [h, m] = inicio.split(':').map(Number);
    const end = new Date();
    end.setHours(h);
    end.setMinutes(m + 60); // +1 hora
    return end.toTimeString().slice(0, 5); // HH:mm
  }
}
