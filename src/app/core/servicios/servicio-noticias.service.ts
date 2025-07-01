import { Injectable } from '@angular/core';
import { Noticia } from '../modelos/noticia';


//Se encarga del CRUD en memoria o con localStorage

@Injectable({
  providedIn: 'root'
})
export class ServicioNoticiasService {
  private noticiasMock: Noticia[] = [
    { id: 1, titulo: 'Nueva ley de tecnología', contenido: 'Lorem ipsum...', autor: 'María', fecha: new Date('2024-10-01') },
    { id: 2, titulo: 'Angular 17 lanzado oficialmente', contenido: 'Lorem ipsum...', autor: 'Carlos', fecha: new Date('2025-01-15') },
    { id: 3, titulo: 'ChatGPT revoluciona la programación', contenido: 'Lorem ipsum...', autor: 'Lucía', fecha: new Date('2025-06-20') }
  ];

  obtenerNoticias(): Noticia[] {
    return this.noticiasMock;
  }
}
