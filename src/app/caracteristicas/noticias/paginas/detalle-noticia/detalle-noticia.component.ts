import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from '../../../../core/modelos/noticia';
import { ServicioNoticiasService } from '../../../../core/servicios/servicio-noticias.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-noticia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.scss']
})
export class DetalleNoticiaComponent implements OnInit {
  noticia!: Noticia | undefined;

  constructor(
    private route: ActivatedRoute,
    private servicioNoticias: ServicioNoticiasService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.noticia = this.servicioNoticias.obtenerNoticiaPorId(id);
  }
}
