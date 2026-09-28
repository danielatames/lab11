import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Envio, CrearEnvioPayload } from '../models/envio.model';

@Injectable({ providedIn: 'root' })
export class EnvioService {
  private http = inject(HttpClient);
  private base = `${environment.API_URL}/envios`;

  obtenerEnvios() {
    return this.http.get<Envio[]>(`${this.base}/optimizados`);
  }
  obtenerPorRastreo(codigo: string) {
    return this.http.get<Envio>(`${this.base}/rastreo/${codigo}`);
  }
  crearEnvio(payload: CrearEnvioPayload) {
    return this.http.post<Envio>(this.base, payload);
  }
  actualizarEstado(id: number, nuevoEstado: string) {
    return this.http.patch<Envio>(`${this.base}/${id}/estado`, { nuevoEstado });
  }
}