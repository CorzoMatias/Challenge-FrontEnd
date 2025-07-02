import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../../../core/modelos/noticia';

@Component({
  selector: 'app-formulario-noticia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-noticia.component.html',
  styleUrls: ['./formulario-noticia.component.scss']
})
export class FormularioNoticiaComponent implements OnInit {
  @Input() noticia?: Noticia | null = null;
  @Input() visible: boolean = false;
  @Input() modoEdicion: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardarNoticia = new EventEmitter<Noticia>();

  formulario!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['noticia']) {
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
          ? (typeof this.noticia.fecha === 'string'
              ? this.noticia.fecha
              : this.noticia.fecha.toISOString().substring(0, 10))
          : '',
        Validators.required
      ]
    });
  }

  public guardar(): void {
    if (this.formulario.invalid) return;
    const valores = this.formulario.value;
    const noticiaResult: Noticia = {
      ...this.noticia,
      ...valores,
      fecha: new Date(valores.fecha),
      id: this.noticia?.id ?? Date.now()
    };
    this.guardarNoticia.emit(noticiaResult);
    this.cerrar.emit();
  }
}