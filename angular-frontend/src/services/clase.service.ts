import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {
  private apiUrl = 'http://localhost:8080/api/clases'; // Ajusta si tu backend usa otro puerto o ruta

  constructor(private http: HttpClient) {}

  getClases(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getHorarios() {
  return this.http.get<any[]>('http://localhost:8080/api/horarios');
}
}
