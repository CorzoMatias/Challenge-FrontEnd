import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaNoticiaComponent } from '../../componentes/tarjeta-noticia/tarjeta-noticia.component';
import { ServicioNoticiasService } from '../../../../core/servicios/servicio-noticias.service';
import { Noticia } from '../../../../core/modelos/noticia';

@Component({
  selector: 'app-lista-noticias',
  standalone: true,
  imports: [CommonModule, TarjetaNoticiaComponent],
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.scss']
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(private servicioNoticias: ServicioNoticiasService) {}

  ngOnInit(): void {
    this.noticias = this.servicioNoticias.obtenerNoticias();
  }
}
