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
    titulo: 'Novak Djokovic presenta acciones legales contra los organismos rectores del tenis',
    subtitulo: 'Tenis',
    descripcion: 'Djokovic inicia una batalla legal histórica contra las principales organizaciones del tenis mundial.',
    autor: 'Atletico Club',
    fecha: new Date('2025-03-10'),
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    titulo: 'Casadó evita el quirófano',
    subtitulo: 'Barcelona',
    descripcion: 'El mediocampista realizará tratamiento conservador y estará alrededor de dos meses de baja.',
    autor: 'C. Navarro',
    fecha: new Date('2025-01-18'),
    url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    titulo: 'El público Barça: Ossama provoca un silencio en el resto de la jornada 29',
    subtitulo: 'Barcelona',
    descripcion: 'La afición del Barça quedó impactada tras la actuación de Ossama en la última jornada.',
    autor: 'Mario Jiménez',
    fecha: new Date('2025-01-18'),
    url: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    titulo: 'El Real Madrid conquista la Champions League',
    subtitulo: 'Fútbol',
    descripcion: 'El Real Madrid logra su decimocuarta Champions tras vencer en una final épica.',
    autor: 'Ana Rivas',
    fecha: new Date('2025-06-01'),
    url: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    titulo: 'Nueva ola de calor afecta al sur de Europa',
    subtitulo: 'Clima',
    descripcion: 'Temperaturas récord se registran en España, Italia y Grecia durante la última semana.',
    autor: 'Luis F. Rojo',
    fecha: new Date('2025-07-15'),
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    titulo: 'Google presenta avances en inteligencia artificial',
    subtitulo: 'Tecnología',
    descripcion: 'La compañía anunció nuevos modelos de IA capaces de generar imágenes y texto en tiempo real.',
    autor: 'Lucía Torres',
    fecha: new Date('2025-05-22'),
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    titulo: 'Protestas en París por reformas laborales',
    subtitulo: 'Política',
    descripcion: 'Miles de personas se manifiestan en las calles de París contra la nueva ley laboral.',
    autor: 'Jean Dupont',
    fecha: new Date('2025-04-10'),
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    titulo: 'Elon Musk lanza nuevo cohete reutilizable',
    subtitulo: 'Espacio',
    descripcion: 'SpaceX logra un hito al recuperar por completo su nuevo cohete tras un lanzamiento exitoso.',
    autor: 'Sara Gómez',
    fecha: new Date('2025-06-30'),
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    titulo: 'Argentina celebra el Día de la Independencia',
    subtitulo: 'Sociedad',
    descripcion: 'Desfiles y actos patrios se realizaron en todo el país para conmemorar la independencia.',
    autor: 'Martín Pérez',
    fecha: new Date('2025-07-09'),
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
    titulo: 'Descubren nueva especie marina en el Atlántico',
    subtitulo: 'Ciencia',
    descripcion: 'Investigadores hallan una especie de medusa bioluminiscente en aguas profundas del Atlántico.',
    autor: 'Elena Ruiz',
    fecha: new Date('2025-03-28'),
    url: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'
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
