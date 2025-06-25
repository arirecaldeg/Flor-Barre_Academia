import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users'; // Tu backend Symfony

  constructor(private http: HttpClient) {}

  // ✅ Obtener todos los usuarios desde /api/users/users
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // ✅ Asignar pases a un usuario en /api/users/{id}/pases
  asignarPases(userId: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/pases`, {
      pases: cantidad
    });
  }
}
    