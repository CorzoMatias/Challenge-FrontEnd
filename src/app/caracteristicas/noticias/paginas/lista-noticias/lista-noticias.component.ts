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
  styleUrls: ['./lista-noticias.component.scss'],
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  @ViewChild('carruselContainer', { static: false })
  carruselContainer!: ElementRef<HTMLDivElement>;

  // MODAL Crear/Editar
  mostrarModal = false;
  noticiaEnEdicion: Noticia | null = null;
  modoEdicion: boolean = false;

  // MODAL Detalle
  mostrarDetalle = false;
  noticiaDetalle: Noticia | null = null;

  // NOTIFICACION
  mostrarNotificacion = false;
  notificacionTipo = 'creó'; // 'edito', 'elimino'

  // Spinner
  cargando: boolean = false;

  // MODAL CONFIRMACION ELIMINAR
  mostrarConfirmEliminar = false;
  noticiaAEliminar: Noticia | null = null;

  constructor(private servicioNoticias: ServicioNoticiasService) {}

  ngOnInit(): void {
    this.noticias = this.servicioNoticias.obtenerNoticias();
  }

  // Carrusel
  public scrollCarrusel(direccion: 'izq' | 'der'): void {
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
  public abrirModalCrear(): void {
    this.noticiaEnEdicion = null;
    this.modoEdicion = false;
    this.mostrarModal = true;
  }

  // Modal Editar (desde detalle)
  public abrirModalEditar(noticia: Noticia | null): void {
    this.noticiaEnEdicion = noticia;
    this.modoEdicion = true;
    this.mostrarModal = true;
    this.cerrarDetalle();
  }

  public cerrarModal(): void {
    this.mostrarModal = false;
    this.noticiaEnEdicion = null;
    this.modoEdicion = false;
  }

  // Modal Detalle
  public abrirDetalle(noticia: Noticia): void {
    this.noticiaDetalle = noticia;
    this.mostrarDetalle = true;
  }

  public cerrarDetalle(): void {
    this.mostrarDetalle = false;
    this.noticiaDetalle = null;
  }

  public eliminarNoticia(noticia: Noticia | null): void {
    if (noticia) {
      this.noticiaAEliminar = noticia;
      this.mostrarConfirmEliminar = true;
    }
  }

  public cancelarEliminar(): void {
    this.mostrarConfirmEliminar = false;
    this.noticiaAEliminar = null;
  }

  public confirmarEliminar(): void {
    if (this.noticiaAEliminar) {
      this.cargando = true;
      setTimeout(() => {
        this.servicioNoticias.eliminarNoticia(this.noticiaAEliminar!.id);
        this.noticias = this.servicioNoticias.obtenerNoticias();
        this.cerrarDetalle();
        this.notificacionTipo = 'eliminó';
        this.mostrarNotificacion = true;
        this.mostrarConfirmEliminar = false;
        this.noticiaAEliminar = null;
        this.cargando = false;
      }, 1000);
    }
  }

  // Guardar (Crear/Editar)
  public onGuardarNoticia(event: { noticia: Noticia, esEdicion: boolean }): void {
  this.cargando = true;
  setTimeout(() => {
    if (event.esEdicion && event.noticia.id) {
      this.servicioNoticias.actualizarNoticia(event.noticia);
      this.notificacionTipo = 'editó';
    } else {
      this.servicioNoticias.crearNoticia(event.noticia);
      this.notificacionTipo = 'creó';
    }
    this.noticias = this.servicioNoticias.obtenerNoticias();
    this.cerrarModal();
    this.mostrarNotificacion = true;
    this.cargando = false;
  }, 1000);
}

  // Notificacion de exito
  public ocultarNotificacion(): void {
    this.mostrarNotificacion = false;
  }
}
