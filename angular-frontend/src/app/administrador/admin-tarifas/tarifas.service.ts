import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarifa } from '../../models/tarifa';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/login/auth.service'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class TarifasService {
  private apiUrl = 'http://localhost:8080/api/tarifas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTarifas(): Observable<Tarifa[]> {
    return this.http.get<Tarifa[]>(this.apiUrl); // pública
  }

  createTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.post<Tarifa>(this.apiUrl, tarifa, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateTarifa(tarifa: Tarifa): Observable<Tarifa> {
    return this.http.put<Tarifa>(`${this.apiUrl}/${tarifa.id}`, tarifa, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteTarifa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
