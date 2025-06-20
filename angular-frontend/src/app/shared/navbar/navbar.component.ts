import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../pages/login/auth.service'; // ajusta la ruta si es distinta
import { User } from '../../pages/login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterModule, CommonModule],
  standalone: true
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  userName: string | null = null;
  isLoggedIn = false;

  

  constructor(public authService: AuthService, private router: Router) { 
    this.userName = this.authService.getUserName();
  }

  ngOnInit(): void {
     const user = this.authService.getUserName();
    if (user) {
      this.userName = user;
      this.isLoggedIn = true;
    }
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}