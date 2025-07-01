import { Routes } from '@angular/router';
import { ListaNoticiasComponent } from './caracteristicas/noticias/paginas/lista-noticias/lista-noticias.component';
import { DetalleNoticiaComponent } from './caracteristicas/noticias/paginas/detalle-noticia/detalle-noticia.component';
import { FormularioNoticiaComponent } from './caracteristicas/noticias/paginas/formulario-noticia/formulario-noticia.component';

export const routes: Routes = [
  { path: '', redirectTo: 'noticias', pathMatch: 'full' }, // Redirige la raíz a /noticias
  { path: 'noticias', component: ListaNoticiasComponent },
  { path: 'noticias/crear', component: FormularioNoticiaComponent },
  { path: 'noticias/:id', component: DetalleNoticiaComponent },
  { path: 'noticias/:id/editar', component: FormularioNoticiaComponent },
];