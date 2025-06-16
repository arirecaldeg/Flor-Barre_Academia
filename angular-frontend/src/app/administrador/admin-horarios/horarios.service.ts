import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Clase {
  id: number;
  nombre: string;
}

export interface Horario {
  id?: number;
  fecha: string; // formato YYYY-MM-DD
  horario_inicio: string; // formato HH:mm
  hora_fin: string; // formato HH:mm
  clase_id: number;
  clase?: Clase;
}

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private apiUrl = 'http://localhost:8000/api/horarios';

  constructor(private http: HttpClient) {}

  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl);
  }

  createHorario(horario: Horario): Observable<any> {
    return this.http.post(this.apiUrl, horario);
  }

  updateHorario(horario: Horario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${horario.id}`, horario);
  }

  deleteHorario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
