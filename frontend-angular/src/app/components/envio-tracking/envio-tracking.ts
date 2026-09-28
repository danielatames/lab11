import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnvioService } from '../../services/envio';
import { Envio } from '../../models/envio.model';

@Component({
  selector: 'app-envio-tracking',
  imports: [FormsModule],
  templateUrl: './envio-tracking.html',
  styleUrl: './envio-tracking.css'
})
export class EnvioTracking {
  private service = inject(EnvioService);
  private cdr = inject(ChangeDetectorRef);
  codigo = '';
  envio: Envio | null = null;
  error = '';

  buscar() {
    this.error = '';
    this.envio = null;
    this.service.obtenerPorRastreo(this.codigo.trim()).subscribe({
      next: e => {
        this.envio = e;
        this.cdr.markForCheck();
      },
      error: () => {
        this.error = 'No se encontró ningún envío con ese código.';
        this.cdr.markForCheck();
      }
    });
  }

  get progreso(): number {
    switch (this.envio?.estadoEnvio) {
      case 'PENDIENTE': return 33;
      case 'EN_TRANSITO': return 66;
      case 'ENTREGADO': return 100;
      default: return 0;
    }
  }
}