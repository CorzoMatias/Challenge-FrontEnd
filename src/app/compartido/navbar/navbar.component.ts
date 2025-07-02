import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicioNoticiasService } from '../../core/servicios/servicio-noticias.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  formulario: FormGroup;

  constructor(
    private servicioNoticias: ServicioNoticiasService,
    private fb: FormBuilder
  ) {
    this.formulario = this.fb.group({
      url: [''],
      autor: ['', Validators.required],
      titulo: ['', Validators.required],
      subtitulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required]
    });
  }

  public abrirModal(): void {
    (window as any).bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNoticia')).show();
    this.formulario.reset();
  }

  public cerrarModal(): void {
    (window as any).bootstrap.Modal.getOrCreateInstance(document.getElementById('modalNoticia')).hide();
  }

  public guardar(): void {
    if (this.formulario.invalid) return;
    const nueva = this.formulario.value;
    this.servicioNoticias.crearNoticia({
      id: Date.now(),
      ...nueva,
      fecha: new Date(nueva.fecha)
    });
    this.cerrarModal();
    window.location.reload(); // Actualiza la lista principal
  }
}
