import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface ClassSlot {
  day: string;
  time: string;
  className: string;
}

@Component({
  selector: 'app-horario',
  standalone: true,
  templateUrl: './horarios.component.html',
  imports: [CommonModule, FormsModule],

})
export class HorarioComponent {
  days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  times = [
    '07:30', '08:30', '09:30', '10:30',
    '11:30', '14:30', '15:30', '16:30',
    '17:30', '18:30', '19:30'
  ];

  classSchedule: ClassSlot[] = [
    { day: 'Lunes', time: '09:30', className: 'BARRE' },
    { day: 'Lunes', time: '10:30', className: 'BARRE SUAVE' },
    { day: 'Lunes', time: '15:30', className: 'BARRE' },
    { day: 'Lunes', time: '16:30', className: 'BARRE EMB' },
    { day: 'Lunes', time: '17:30', className: 'BARRE' },
    { day: 'Lunes', time: '18:30', className: 'BARRE' },
    { day: 'Lunes', time: '19:30', className: 'BARRE PRO' },
    { day: 'Martes', time: '07:30', className: 'BARRE' },
    { day: 'Martes', time: '08:30', className: 'BARRE' },
    { day: 'Martes', time: '14:30', className: 'BARRE' },
    { day: 'Martes', time: '16:30', className: 'BARRE EMB' },
    { day: 'Martes', time: '17:30', className: 'BARRE' },
    { day: 'Martes', time: '18:30', className: 'BARRE' },
    { day: 'Martes', time: '19:30', className: 'BARRE PRO' },
    { day: 'Miércoles', time: '09:30', className: 'BARRE' },
    { day: 'Miércoles', time: '10:30', className: 'BARRE SUAVE' },
    { day: 'Miércoles', time: '15:30', className: 'BARRE' },
    { day: 'Miércoles', time: '17:30', className: 'BARRE ' },
    { day: 'Miércoles', time: '18:30', className: 'BARRE' },
    { day: 'Miércoles', time: '19:30', className: 'BARRE PRO' },
    { day: 'Jueves', time: '07:30', className: 'BARRE' },
    { day: 'Jueves', time: '08:30', className: 'BARRE' },
    { day: 'Jueves', time: '14:30', className: 'BARRE' },
    { day: 'Jueves', time: '16:30', className: 'BARRE EMB' },
    { day: 'Jueves', time: '17:30', className: 'BARRE' },
    { day: 'Jueves', time: '18:30', className: 'BARRE' },
    { day: 'Jueves', time: '19:30', className: 'BARRE PRO' },
    { day: 'Viernes', time: '09:30', className: 'BARRE' },
    { day: 'Viernes', time: '10:30', className: 'BARRE SUAVE' },
    { day: 'Viernes', time: '15:30', className: 'BARRE' },
    { day: 'Viernes', time: '16:30', className: 'BARRE ENG' },
    { day: 'Viernes', time: '17:30', className: 'BARRE' },
    { day: 'Sábado', time: '09:30', className: 'BARRE' },
    { day: 'Sábado', time: '10:30', className: 'BARRE' },
    { day: 'Sábado', time: '11:30', className: 'BARRE ENG' },
    // añade el resto como en la imagen
  ];

  getClassName(day: string, time: string): string {
    return this.classSchedule.find(s => s.day === day && s.time === time)?.className || '';
  }
getCellColor(day: string): string {
  const isLightDay = ['Lunes', 'Miércoles', 'Viernes'].includes(day);
  return isLightDay ? 'bg-[#EACFCE] text-[#333]' : 'bg-[#DCCACE] text-[#333]';
}

}