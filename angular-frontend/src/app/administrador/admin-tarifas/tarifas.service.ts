import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarifa } from '../../models/tarifa'; // Asegúrate de que la ruta sea correcta
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TarifasService {
  private apiUrl = 'http://localhost:8080/api/tarifas'; // Cambia según tu API

  constructor(private http: HttpClient) {}

  getTarifas(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(this.apiUrl);
  }

  createTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.apiUrl, tarifa);
  }

  updateTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.put<Tarifa>(`${this.apiUrl}/${tarifa.id}`, tarifa);
  }

  deleteTarifa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
