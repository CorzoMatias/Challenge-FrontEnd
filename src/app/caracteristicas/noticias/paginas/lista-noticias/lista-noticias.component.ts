import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaNoticiaComponent } from '../../componentes/tarjeta-noticia/tarjeta-noticia.component';
import { FormularioNoticiaComponent } from '../formulario-noticia/formulario-noticia.component';
import { ServicioNoticiasService } from '../../../../core/servicios/servicio-noticias.service';
import { Noticia } from '../../../../core/modelos/noticia';

@Component({
  selector: 'app-lista-noticias',
  standalone: true,
  imports: [CommonModule, TarjetaNoticiaComponent, FormularioNoticiaComponent],
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.scss']
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  @ViewChild('carruselContainer', { static: false }) carruselContainer!: ElementRef<HTMLDivElement>;

  // MODAL Crear/Editar
  mostrarModal = false;
  noticiaEnEdicion: Noticia | null = null;
  modoEdicion: boolean = false;

  // MODAL Detalle
  mostrarDetalle = false;
  noticiaDetalle: Noticia | null = null;

  // NOTIFICACIÓN
  mostrarNotificacion = false;
  notificacionTipo = 'creó'; // 'editó', 'eliminó'

  constructor(private servicioNoticias: ServicioNoticiasService) {}

  ngOnInit(): void {
    this.noticias = this.servicioNoticias.obtenerNoticias();
  }

  // Carrusel
  scrollCarrusel(direccion: 'izq' | 'der') {
    const container = this.carruselContainer?.nativeElement;
    if (container) {
      const scrollAmount = 250;
      if (direccion === 'izq') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  // Modal Crear
  abrirModalCrear() {
    this.noticiaEnEdicion = null;
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  // Modal Editar (desde detalle)
  abrirModalEditar(noticia: Noticia | null) {
    this.noticiaEnEdicion = noticia;
    this.modoEdicion = true;
    this.mostrarModal = true;
    this.cerrarDetalle();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.noticiaEnEdicion = null;
    this.modoEdicion = false;
  }

  // Modal Detalle
  abrirDetalle(noticia: Noticia) {
    this.noticiaDetalle = noticia;
    this.mostrarDetalle = true;
  }

  cerrarDetalle() {
    this.mostrarDetalle = false;
    this.noticiaDetalle = null;
  }

  eliminarNoticia(noticia: Noticia | null) {
    if (noticia && confirm('¿Eliminar esta noticia?')) {
      this.servicioNoticias.eliminarNoticia(noticia.id);
      this.noticias = this.servicioNoticias.obtenerNoticias();
      this.cerrarDetalle();
      this.notificacionTipo = 'eliminó';
      this.mostrarNotificacion = true;
    }
  }

  // Guardar (Crear/Editar)
  onGuardarNoticia(noticia: Noticia) {
    if (this.modoEdicion && noticia.id) {
      this.servicioNoticias.actualizarNoticia(noticia);
      this.notificacionTipo = 'editó';
    } else {
      this.servicioNoticias.crearNoticia(noticia);
      this.notificacionTipo = 'creó';
    }
    this.noticias = this.servicioNoticias.obtenerNoticias();
    this.cerrarModal();
    this.mostrarNotificacion = true;
  }

  // Notificación de éxito
  ocultarNotificacion() {
    this.mostrarNotificacion = false;
  }
}
