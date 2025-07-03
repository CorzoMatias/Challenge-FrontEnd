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
    titulo: 'Ritmo sobre ruedas',
    subtitulo: 'Ciclismo',
    descripcion: 'Un pelotón de ciclistas avanza a gran velocidad por una carretera rodeada de naturaleza, demostrando esfuerzo, estrategia y trabajo en equipo en plena competencia.',
    autor: 'Martín Echeverría',
    fecha: new Date('2025-03-10'),
    url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    titulo: 'Dominio en el desierto',
    subtitulo: 'Aventura 4x4',
    descripcion: 'Un robusto vehículo todoterreno se detiene sobre un camino de tierra en plena zona montañosa, listo para enfrentar los desafíos del terreno con estilo y potencia al atardecer.',
    autor: 'Santiago Villar',
    fecha: new Date('2025-01-18'),
    url: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    titulo: 'Camino a la calma',
    subtitulo: 'Paisaje rural',
    descripcion: 'Un serpenteante sendero bordeado de cipreses atraviesa las suaves colinas de la campiña al atardecer, ofreciendo una vista serena y armónica en un rincón de la Toscana.',
    autor: 'Giulia Moretti',
    fecha: new Date('2025-01-18'),
    url: 'https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    titulo: 'El alma de la fotografía',
    subtitulo: 'Cámara vintage',
    descripcion: 'Una cámara Kodak Brownie Flash B se presenta en primer plano, ícono del diseño clásico que marcó una época en la historia de la fotografía analógica.',
    autor: 'Luciano Ferraro',
    fecha: new Date('2025-06-01'),
    url: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    titulo: 'Conexión entre costas',
    subtitulo: 'Golden Gate',
    descripcion: 'El icónico puente Golden Gate se extiende majestuoso sobre las aguas de la bahía de San Francisco, uniendo paisajes, historias y horizontes en una obra de ingeniería legendaria.',
    autor: 'Valentina Cruz',
    fecha: new Date('2025-07-15'),
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    titulo: 'El corazón del silicio',
    subtitulo: 'Tecnología',
    descripcion: 'Una placa madre vista en detalle revela la complejidad del diseño electrónico moderno, donde transistores y microchips trabajan en armonía para dar vida a los dispositivos digitales.',
    autor: 'Emilio Navarro',
    fecha: new Date('2025-05-22'),
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    titulo: 'Pasillos del saber',
    subtitulo: 'Biblioteca',
    descripcion: 'Estanterías curvas repletas de libros dan forma a un corredor de conocimiento en una biblioteca moderna, donde cada título invita a descubrir nuevos mundos y perspectivas.',
    autor: 'Clara Bianchi',
    fecha: new Date('2025-04-10'),
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    titulo: 'Fragilidad cósmica',
    subtitulo: 'Nebulosa espacial',
    descripcion: 'Una impresionante burbuja de gas interestelar flota en el vacío del universo, revelando la inmensidad y belleza etérea de las formaciones celestes captadas por telescopios de alta precisión.',
    autor: 'Elena Duarte',
    fecha: new Date('2025-06-30'),
    url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 9,
    titulo: 'Testigo del tiempo',
    subtitulo: 'Árbol solitario',
    descripcion: 'Un majestuoso árbol se alza en medio de un campo abierto, capturado con la luz suave del atardecer, simbolizando fortaleza, calma y la permanencia de la naturaleza en su estado puro.',
    autor: 'Nicolás Herrera',
    fecha: new Date('2025-07-09'),
    url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 10,
    titulo: 'Bajo la Vía Láctea',
    subtitulo: 'Cielo estrellado',
    descripcion: 'La Vía Láctea se despliega con intensidad sobre un paisaje montañoso, mientras la silueta de un árbol solitario contempla el universo en una noche despejada y mágica.',
    autor: 'Iván López',
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
    this.noticias.unshift(nueva);
    this.guardarEnStorage();
  }

  public actualizarNoticia(actualizada: Noticia): void {
  const idToFind = Number(actualizada.id);
  const index = this.noticias.findIndex(n => Number(n.id) === idToFind);
  if (index !== -1) {
    this.noticias[index] = { ...actualizada };
    this.guardarEnStorage();
  }
}

  public eliminarNoticia(id: number): void {
    this.noticias = this.noticias.filter(n => n.id !== id);
    this.guardarEnStorage();
  }
}
