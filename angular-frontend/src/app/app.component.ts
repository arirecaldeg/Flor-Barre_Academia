import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component'; // Corrección aquí
import { FooterComponent } from './shared/footer/footer.component';
//import { HomeComponent } from "./pages/home/home.component"; // Corrección aquí


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent,], // Asegúrate de que estos componentes estén importados
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-frontend';
}
