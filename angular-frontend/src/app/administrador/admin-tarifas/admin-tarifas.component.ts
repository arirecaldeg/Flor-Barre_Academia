import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tarifa } from '../../models/tarifa';
import { TarifasService } from './tarifas.service';

@Component({
  selector: 'app-admin-tarifas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-tarifas.component.html',
})
export class AdminTarifasComponent implements OnInit {
  tarifas: Tarifa[] = [];
  tarifasMensuales: Tarifa[] = [];
  tarifasAnuales: Tarifa[] = [];

  nuevaTarifa: Tarifa = {
    id: 0,
    nombre: '',
    precio: 0,
    tipo: 'mensual',
    descripcion: '',
    orden: 0
  };

  constructor(private tarifasService: TarifasService) { }

  ngOnInit(): void {
    this.cargarTarifas();
  }

  cargarTarifas(): void {
  this.tarifasService.getTarifas().subscribe(data => {
    this.tarifasMensuales = data
      .filter(t => t.tipo === 'mensual')
      .sort((a, b) => a.orden - b.orden);

    this.tarifasAnuales = data
      .filter(t => t.tipo === 'anual')
      .sort((a, b) => a.orden - b.orden);
  });
  }

  ordenPersonalizado(nombre: string): number {
    const orden = ['1 CLASE', '4 CLASES', '8 CLASES', '12 CLASES', 'ILIMITADO'];
    return orden.indexOf(nombre);
  }


  guardarCambios(): void {
    const todas = [...this.tarifasMensuales, ...this.tarifasAnuales];
    todas.forEach(t => {
      this.tarifasService.updateTarifa(t).subscribe();
    });
  }

  guardarNuevaTarifa(): void {
    if (!this.nuevaTarifa.nombre || !this.nuevaTarifa.precio) return;

    this.tarifasService.createTarifa(this.nuevaTarifa).subscribe(() => {
      this.nuevaTarifa = { id: 0, nombre: '', precio: 0, tipo: 'mensual', descripcion: '', orden: 0 };
      this.cargarTarifas();
    });
  }

  eliminar(id: number): void {
    this.tarifasService.deleteTarifa(id).subscribe(() => {
      this.cargarTarifas();
    });
  }
}
