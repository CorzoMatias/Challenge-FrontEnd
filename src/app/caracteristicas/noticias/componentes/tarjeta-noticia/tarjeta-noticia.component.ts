import { Component, Input } from '@angular/core';
import { Noticia } from '../../../../core/modelos/noticia';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarjeta-noticia',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tarjeta-noticia.component.html',
  styleUrl: './tarjeta-noticia.component.scss'
})
export class TarjetaNoticiaComponent {
  @Input() noticia!: Noticia;
}
