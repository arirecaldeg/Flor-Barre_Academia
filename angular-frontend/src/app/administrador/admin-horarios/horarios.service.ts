import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../pages/login/auth.service';

export interface Clase {
  id: number;
  nombre: string;
}

export interface Horario {
  id?: number;
  dia_semana: string;
  horario_inicio: string;
  hora_fin: string;
  clase_id: number;
  clase?: Clase;
}

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private apiUrl = 'http://localhost:8080/api/horarios';
  private clasesUrl = 'http://localhost:8080/api/clases';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // ✅ Ruta pública (sin token)
  getHorarios(): Observable<Horario[]> {
    return this.http.get<Horario[]>(this.apiUrl);
  }

  // ✅ Ruta pública (sin token)
  getClases(): Observable<Clase[]> {
    return this.http.get<Clase[]>(this.clasesUrl);
  }

  // 🔐 Ruta protegida (requiere token)
  createHorario(horario: Horario): Observable<any> {
    return this.http.post(this.apiUrl, horario, {
      headers: this.authService.getAuthHeaders()
    });
  }

  updateHorario(horario: Horario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${horario.id}`, horario, {
      headers: this.authService.getAuthHeaders()
    });
  }

  deleteHorario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    });
  }
}
