import { Routes } from '@angular/router';
import { EnvioList } from './components/envio-list/envio-list';
import { EnvioForm } from './components/envio-form/envio-form';
import { EnvioTracking } from './components/envio-tracking/envio-tracking';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'envios', component: EnvioList, canActivate: [authGuard] },
  { path: 'nuevo-envio', component: EnvioForm, canActivate: [authGuard] },
  { path: 'rastreo', component: EnvioTracking }
];