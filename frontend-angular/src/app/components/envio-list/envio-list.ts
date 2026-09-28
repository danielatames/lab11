import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { EnvioService } from '../../services/envio';
import { AuthService } from '../../services/auth';
import { Envio } from '../../models/envio.model';

@Component({
  selector: 'app-envio-list',
  imports: [],
  templateUrl: './envio-list.html',
  styleUrl: './envio-list.css'
})
export class EnvioList implements OnInit {
  private service = inject(EnvioService);
  private cdr = inject(ChangeDetectorRef);
  auth = inject(AuthService);
  envios: Envio[] = [];
  estados = ['PENDIENTE', 'EN_TRANSITO', 'ENTREGADO', 'CANCELADO'];
  error = '';

  ngOnInit() { this.cargar(); }

  cargar() {
    this.service.obtenerEnvios().subscribe({
      next: data => {
        this.envios = data;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se pudo cargar los envíos. ¿Está corriendo el backend?';
        this.cdr.markForCheck();
      }
    });
  }

  cambiarEstado(envio: Envio, nuevo: string) {
    this.error = '';
    this.service.actualizarEstado(envio.id, nuevo).subscribe({
      next: actualizado => {
        envio.estadoEnvio = actualizado.estadoEnvio;
        this.cdr.markForCheck();
      },
      error: err => {
        this.error = err?.error?.error || 'No se pudo actualizar el estado.';
        this.cargar(); 
      }
    });
  }
}