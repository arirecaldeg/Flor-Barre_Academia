import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Tarifa {
  nombre: string;
  precio: string;
}

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarifas.component.html',
})
export class TarifasComponent {
  bonosMensuales: Tarifa[] = [
    { nombre: '4 CLASES', precio: '65€' },
    { nombre: '8 CLASES', precio: '85€' },
    { nombre: '12 CLASES', precio: '115€' },
    { nombre: 'ILIMITADO', precio: '135€' },
  ];

  bonosAnuales: Tarifa[] = [
    { nombre: '1 CLASE', precio: '25€' },
    { nombre: '4 CLASES', precio: '85€' },
    { nombre: '8 CLASES', precio: '115€' },
    { nombre: '12 CLASES', precio: '165€' },
  ];
}
