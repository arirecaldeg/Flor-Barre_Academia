import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

export interface User {
  id: number;
  email: string;
  name: string;
  apellido: string;
  token?: string;
  role: string;
}



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
      console.log('Token decodificado:', decoded);

      localStorage.setItem('userName', decoded.username);
      localStorage.setItem('userId', decoded.id); // ✅ AÑADE ESTA LÍNEA
    })
  );
}

  getToken() {
    return localStorage.getItem('token');

  }

  getUserName(): string | null {
    return localStorage.getItem('userName');
  }

  getUserInfo(id: number) {
  return this.http.get<any>(`http://localhost:8080/api/users/${id}`);
}
  
  getUserId(): number | null {
  const id = localStorage.getItem('userId');
  return id ? parseInt(id, 10) : null;
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
