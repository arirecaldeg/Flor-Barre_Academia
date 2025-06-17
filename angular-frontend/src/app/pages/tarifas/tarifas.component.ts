import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarifasService } from '../../administrador/admin-tarifas/tarifas.service';
import { Tarifa } from '../../models/tarifa';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarifas.component.html',
})
export class TarifasComponent implements OnInit {
  bonosMensuales: Tarifa[] = [];
  bonosAnuales: Tarifa[] = [];

  constructor(private tarifasService: TarifasService) {}

ngOnInit(): void {
    this.tarifasService.getTarifas().subscribe((tarifas) => {
      this.bonosMensuales = tarifas
        .filter(t => t.tipo === 'mensual')
        .sort((a, b) => a.orden - b.orden);

      this.bonosAnuales = tarifas
        .filter(t => t.tipo === 'anual')
        .sort((a, b) => a.orden - b.orden);
    });
  }

  ordenPersonalizado(nombre: string): number {
    const orden = ['1 CLASE', '4 CLASES', '8 CLASES', '12 CLASES', 'ILIMITADO'];
    const index = orden.indexOf(nombre);
    return index === -1 ? orden.length : index; // Si no se encuentra, lo pone al final
  }
}
