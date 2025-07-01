import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../../../../core/modelos/noticia';
import { ServicioNoticiasService } from '../../../../core/servicios/servicio-noticias.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule  } from '@angular/router';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.scss'],
})
export class DetalleNoticiaComponent implements OnInit {
  noticia!: Noticia | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private servicioNoticias: ServicioNoticiasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noticia = this.servicioNoticias.obtenerNoticiaPorId(id);
  }

  public eliminar(): void {
    if (!this.noticia) return;

    const confirmacion = window.confirm(
      `¿Estás seguro que deseas eliminar la noticia: "${this.noticia.titulo}"?`
    );

    if (confirmacion) {
      this.servicioNoticias.eliminarNoticia(this.noticia.id);
      this.router.navigate(['/noticias']);
    }
  }
}
