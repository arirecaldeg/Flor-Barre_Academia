import { Routes } from '@angular/router';
// import { ClasesComponent } from './pages/clases/clases.component';
// import { ContactanosComponent } from './pages/contactanos/contactanos.component';
//import { HorariosComponent } from './pages/horarios/horarios.component';
import { LoginComponent } from './pages/login/login.component';
//import { RegistroComponent } from './pages/registro/registro.component';
//import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
//import { TarifasComponent } from './pages/tarifas/tarifas.component';
//import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';


export const routes: Routes = [
  { path: 'footer', component: FooterComponent },
  { path: 'login', component: LoginComponent }
];
 