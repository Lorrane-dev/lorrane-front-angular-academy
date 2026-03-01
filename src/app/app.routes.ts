import { Routes } from '@angular/router';
import { AulasComponent } from './pages/aulas/aulas';

export const routes: Routes = [
  { path: '', component: AulasComponent },
  { path: '**', redirectTo: '' },
];
