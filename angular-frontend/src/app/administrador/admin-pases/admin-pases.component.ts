import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-pases',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-pases.component.html',
})
export class AdminPasesComponent implements OnInit {
  usuarios: any[] = [];
  paseInput: { [userId: number]: number } = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  asignarPases(userId: number): void {
    const cantidad = this.paseInput[userId] || 0;
    if (cantidad <= 0) return;

    this.userService.asignarPases(userId, cantidad).subscribe(() => {
      alert('Pases asignados');
      this.paseInput[userId] = 0;
      this.cargarUsuarios();
    });
  }
}
