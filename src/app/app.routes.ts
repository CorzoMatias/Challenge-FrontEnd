import { Routes } from '@angular/router';
import { ListaNoticiasComponent } from './caracteristicas/noticias/paginas/lista-noticias/lista-noticias.component';

export const routes: Routes = [
  { path: '', redirectTo: 'noticias', pathMatch: 'full' }, // Redirige la raíz a /noticias
  { path: 'noticias', component: ListaNoticiasComponent },
];