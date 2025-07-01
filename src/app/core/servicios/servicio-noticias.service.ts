import { Injectable } from '@angular/core';
import { Noticia } from '../modelos/noticia';

const STORAGE_KEY = 'noticias';

@Injectable({
  providedIn: 'root'
})
export class ServicioNoticiasService {
  private noticias: Noticia[] = [];

  constructor() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const rawNoticias = JSON.parse(data);
      this.noticias = rawNoticias.map((n: any) => ({
        ...n,
        fecha: new Date(n.fecha)
      }));
    } else {
      this.noticias = [
        {
          id: 1,
          titulo: 'Nueva ley de tecnología',
          contenido: 'Lorem ipsum...',
          autor: 'María',
          fecha: new Date('2024-10-01')
        },
        {
          id: 2,
          titulo: 'Angular 17 lanzado oficialmente',
          contenido: 'Lorem ipsum...',
          autor: 'Carlos',
          fecha: new Date('2025-01-15')
        },
        {
          id: 3,
          titulo: 'ChatGPT revoluciona la programación',
          contenido: 'Lorem ipsum...',
          autor: 'Lucía',
          fecha: new Date('2025-06-20')
        }
      ];
      this.guardarEnStorage();
    }
  }

  private guardarEnStorage(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.noticias));
  }

  public obtenerNoticias(): Noticia[] {
    return this.noticias;
  }

  public obtenerNoticiaPorId(id: number): Noticia | undefined {
    return this.noticias.find(n => n.id === id);
  }

  public crearNoticia(nueva: Noticia): void {
    this.noticias.push(nueva);
    this.guardarEnStorage();
  }

  public actualizarNoticia(actualizada: Noticia): void {
    const index = this.noticias.findIndex(n => n.id === actualizada.id);
    if (index !== -1) {
      this.noticias[index] = actualizada;
      this.guardarEnStorage();
    }
  }

  public eliminarNoticia(id: number): void {
    this.noticias = this.noticias.filter(n => n.id !== id);
    this.guardarEnStorage();
  }
}
