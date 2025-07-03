import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Noticia } from '../../../../core/modelos/noticia';

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

  constructor(private fb: FormBuilder) {}

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
  }

  public guardar(): void {
    if (this.formulario.invalid) return;
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
      fecha: new Date(valores.fecha),
      id: idReal,
    };
    this.guardarNoticia.emit({
      noticia: noticiaResult,
      esEdicion: this.modoEdicion,
    });
    this.cerrar.emit();
  }
}
