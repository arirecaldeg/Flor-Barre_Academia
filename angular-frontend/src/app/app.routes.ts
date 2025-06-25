import { Routes } from '@angular/router';
import { ClasesComponent } from './pages/clases/clases.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { HorarioComponent } from './pages/horarios/horarios.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { TarifasComponent } from './pages/tarifas/tarifas.component';
//import { NavbarComponent } from './shared/navbar/navbar.component';
//import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AdminHorariosComponent } from './administrador/admin-horarios/admin-horarios.component';
import { AdminTarifasComponent } from './administrador/admin-tarifas/admin-tarifas.component';
import { AdminPasesComponent } from './administrador/admin-pases/admin-pases.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'clases', component: ClasesComponent },
  { path: 'horarios', component: HorarioComponent },
  { path: 'tarifas', component: TarifasComponent },
  { path: 'contactanos', component: ContactanosComponent },
  { path: 'registro', component: RegistroComponent },

 // Rutas para el administrador
  { path: 'admin/horarios', component: AdminHorariosComponent },
  { path: 'admin/tarifas', component: AdminTarifasComponent },
  { path: 'admin/pases', component: AdminPasesComponent },


 // Rutas para el usuario
  { path: 'reservar-clase', loadComponent: () => import('./pages/reservar-clase/reservar-clase.component').then(m => m.ReservarClaseComponent) }
];