import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioNoticiasService } from '../../../../core/servicios/servicio-noticias.service';
import { Noticia } from '../../../../core/modelos/noticia';

@Component({
  selector: 'app-formulario-noticia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-noticia.component.html',
  styleUrls: ['./formulario-noticia.component.scss']
})
export class FormularioNoticiaComponent implements OnInit {
  formulario!: FormGroup;
  modoEdicion = false;
  noticiaExistente!: Noticia | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private servicioNoticias: ServicioNoticiasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.modoEdicion = !!id;

    this.formulario = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      autor: ['', Validators.required],
      fecha: ['', Validators.required]
    });

    if (this.modoEdicion) {
      const noticiaId = Number(id);
      this.noticiaExistente = this.servicioNoticias.obtenerNoticiaPorId(noticiaId);
      if (this.noticiaExistente) {
        this.formulario.patchValue({
          titulo: this.noticiaExistente.titulo,
          contenido: this.noticiaExistente.contenido,
          autor: this.noticiaExistente.autor,
          fecha: this.noticiaExistente.fecha.toISOString().substring(0, 10) // para input tipo date
        });
      }
    }
  }

  guardar(): void {
    if (this.formulario.invalid) return;

    const valores = this.formulario.value;

    if (this.modoEdicion && this.noticiaExistente) {
      this.servicioNoticias.actualizarNoticia({
        ...this.noticiaExistente,
        ...valores,
        fecha: new Date(valores.fecha)
      });
    } else {
      this.servicioNoticias.crearNoticia({
        id: Date.now(), // ID temporal
        ...valores,
        fecha: new Date(valores.fecha)
      });
    }

    this.router.navigate(['/noticias']);
  }
}
