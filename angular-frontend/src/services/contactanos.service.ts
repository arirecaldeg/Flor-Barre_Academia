import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactMessage {
  nombre: string;
  email: string;
  mensaje: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactanosService {
  private apiUrl = 'http://localhost:8080/contact'; // Cambia esto cuando subas a producción

  constructor(private http: HttpClient) {}

  enviarMensaje(data: ContactMessage): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
