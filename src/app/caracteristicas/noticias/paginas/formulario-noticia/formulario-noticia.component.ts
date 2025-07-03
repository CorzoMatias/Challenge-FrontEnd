import {Component, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule,} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {Noticia} from '../../../../core/modelos/noticia';

@Component({
  selector: 'app-formulario-noticia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-noticia.component.html',
  styleUrls: ['./formulario-noticia.component.scss'],
})
export class FormularioNoticiaComponent implements OnChanges {
  @Input() noticia?: Noticia | null = null;
  @Input() visible: boolean = false;
  @Input() modoEdicion: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardarNoticia = new EventEmitter<{
    noticia: Noticia;
    esEdicion: boolean;
  }>();

  formulario!: FormGroup;
  hoy: string = '';
  fechaFuturaInvalida = false;

  constructor(private fb: FormBuilder) {
    const fechaHoy = new Date();
    const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
    const dia = fechaHoy.getDate().toString().padStart(2, '0');
    this.hoy = `${fechaHoy.getFullYear()}-${mes}-${dia}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['noticia'] || changes['visible']) {
      this.inicializarFormulario();
    }
  }

  public inicializarFormulario(): void {
    this.formulario = this.fb.group({
      url: [this.noticia?.url ?? '', Validators.required],
      autor: [this.noticia?.autor ?? '', Validators.required],
      titulo: [this.noticia?.titulo ?? '', Validators.required],
      subtitulo: [this.noticia?.subtitulo ?? '', Validators.required],
      descripcion: [this.noticia?.descripcion ?? '', Validators.required],
      fecha: [
        this.noticia?.fecha
          ? typeof this.noticia.fecha === 'string'
            ? this.noticia.fecha
            : this.noticia.fecha.toISOString().substring(0, 10)
          : '',
        Validators.required,
      ],
    });
    this.fechaFuturaInvalida = false;
  }

  public validarFechaFutura(): void {
    const valor = this.formulario.get('fecha')?.value;
    if (valor) {
      const fechaIngresada = new Date(valor + 'T00:00:00');
      const hoy = new Date(this.hoy + 'T00:00:00');
      this.fechaFuturaInvalida = fechaIngresada > hoy;
    } else {
      this.fechaFuturaInvalida = false;
    }
  }

  public guardar(): void {
    this.validarFechaFutura();
    if (this.formulario.invalid || this.fechaFuturaInvalida) return;
    const valores = this.formulario.value;
    let idReal: number;
    if (this.modoEdicion && this.noticia?.id) {
      idReal = this.noticia.id;
    } else {
      idReal = Date.now();
    }

    const noticiaResult: Noticia = {
      ...this.noticia,
      ...valores,
      fecha: new Date(valores.fecha + 'T00:00:00'),
      id: idReal,
    };
    this.guardarNoticia.emit({
      noticia: noticiaResult,
      esEdicion: this.modoEdicion,
    });
    this.cerrar.emit();
  }
}
