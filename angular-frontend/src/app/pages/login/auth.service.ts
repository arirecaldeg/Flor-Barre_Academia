import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:8080/api/login', { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);

        const decoded: any = jwtDecode(response.token);
        console.log('Token decodificado:', decoded); // 👈 AÑADE ESTA LÍNEA
        console.log('Token decodificado:', decoded); // 👈 AÑADE ESTO
        localStorage.setItem('userName', decoded.nombre);
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');

  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
