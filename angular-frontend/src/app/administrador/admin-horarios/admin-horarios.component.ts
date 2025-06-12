import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ClassSlot {
  day: string;
  time: string;
  className: string;
}

@Component({
  selector: 'app-admin-horarios',
  standalone: true,
  templateUrl: './admin-horarios.component.html',
  imports: [CommonModule, FormsModule],
})
export class AdminHorariosComponent {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  times = [
    '07:30', '08:30', '09:30', '10:30',
    '11:30', '14:30', '15:30', '16:30',
    '17:30', '18:30', '19:30'
  ];

  availableClasses = ['BARRE', 'BARRE SUAVE', 'BARRE EMB', 'BARRE PRO', 'BARRE ENG', '']; // '' para eliminar

  classSchedule: ClassSlot[] = [
    { day: 'Lunes', time: '09:30', className: 'BARRE' },
    { day: 'Martes', time: '08:30', className: 'BARRE PRO' },
    // Añade más clases aquí como desees
  ];

  getCellColor(day: string): string {
    const isLightDay = ['Lunes', 'Miércoles', 'Viernes'].includes(day);
    return isLightDay ? 'bg-[#EACFCE] text-[#333]' : 'bg-[#DCCACE] text-[#333]';
  }

  getClassName(day: string, time: string): string {
    return this.classSchedule.find(s => s.day === day && s.time === time)?.className || '';
  }

  updateClass(day: string, time: string, newClass: string) {
    const slot = this.classSchedule.find(s => s.day === day && s.time === time);
    if (slot) {
      slot.className = newClass;
    } else {
      this.classSchedule.push({ day, time, className: newClass });
    }
  }
}