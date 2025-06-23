import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../app/pages/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private apiUrl = 'http://localhost:8080/api/reservas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  crearReserva(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data, {
      headers: this.authService.getAuthHeaders() // <- Aquí añades el token
    });
  }

  getReservasDeUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  getReservasSemana(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}/semana`, {
      headers: this.authService.getAuthHeaders()
    });
  }

  eliminarReserva(reservaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reservaId}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
