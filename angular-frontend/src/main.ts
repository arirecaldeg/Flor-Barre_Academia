import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';  // <-- importa el locale español

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 💡 REGISTRA el locale antes de arrancar la app:
registerLocaleData(localeEs, 'es-ES');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
