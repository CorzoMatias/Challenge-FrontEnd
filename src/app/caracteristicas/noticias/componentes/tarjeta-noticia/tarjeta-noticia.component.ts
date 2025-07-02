import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() tipo: 'principal' | 'secundaria' | 'carrusel' = 'principal';

  @Output() verDetalle = new EventEmitter<void>();

  public abrirDetalle(): void {
    this.verDetalle.emit();
  }
}
