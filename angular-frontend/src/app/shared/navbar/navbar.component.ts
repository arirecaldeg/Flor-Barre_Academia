import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../pages/login/auth.service'; // ajusta la ruta si es distinta

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule, CommonModule],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  userName: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}