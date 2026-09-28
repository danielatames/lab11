import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvioService } from '../../services/envio';
import { CrearEnvioPayload } from '../../models/envio.model';

@Component({
  selector: 'app-envio-form',
  imports: [FormsModule],
  templateUrl: './envio-form.html',
  styleUrl: './envio-form.css'
})
export class EnvioForm {
  private service = inject(EnvioService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  payload: CrearEnvioPayload = {
    codigoRastreo: '', direccionDestino: '', pesoKg: 0, costo: 0,
    vehiculoId: 1, conductorId: 1
  };
  mensaje = '';
  error = '';

  guardar() {
    this.mensaje = '';
    this.error = '';
    this.service.crearEnvio(this.payload).subscribe({
      next: creado => {
        this.mensaje = `Envío registrado con código ${creado.codigoRastreo}`;
        this.cdr.markForCheck();
        setTimeout(() => this.router.navigate(['/envios']), 1500);
      },
      error: err => {
        this.error = err?.error?.error || 'No se pudo registrar el envío.';
        this.cdr.markForCheck();
      }
    });
  }
}