import { Injectable } from '@angular/core';
import { Noticia } from '../modelos/noticia';

//Se encarga del CRUD en memoria o con localStorage

@Injectable({
  providedIn: 'root',
})
export class ServicioNoticiasService {
  private noticiasMock: Noticia[] = [
    {
      id: 1,
      titulo: 'Nueva ley de tecnología',
      contenido: 'TEST NUMERO 1',
      autor: 'María',
      fecha: new Date('2024-10-01'),
    },
    {
      id: 2,
      titulo: 'Angular 17 lanzado oficialmente',
      contenido: 'TEST NUMERO 2',
      autor: 'Carlos',
      fecha: new Date('2025-01-15'),
    },
    {
      id: 3,
      titulo: 'ChatGPT revoluciona la programación',
      contenido: 'TEST NUMERO 3',
      autor: 'Lucía',
      fecha: new Date('2025-06-20'),
    },
  ];

  public obtenerNoticias(): Noticia[] {
    return this.noticiasMock;
  }

  public obtenerNoticiaPorId(id: number): Noticia | undefined {
    return this.noticiasMock.find((noticia) => noticia.id === id);
  }

  public crearNoticia(nueva: Noticia): void {
    this.noticiasMock.push(nueva);
  }

  public actualizarNoticia(actualizada: Noticia): void {
    const index = this.noticiasMock.findIndex((n) => n.id === actualizada.id);
    if (index !== -1) {
      this.noticiasMock[index] = actualizada;
    }
  }

  public eliminarNoticia(id: number): void {
    this.noticiasMock = this.noticiasMock.filter((n) => n.id !== id);
  }
}
