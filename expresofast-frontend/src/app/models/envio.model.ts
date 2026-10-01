export interface Envio {
  id: number;
  codigoRastreo: string;
  direccionDestino: string;
  pesoKg: number;
  costo: number;
  estadoEnvio: string;
  placaVehiculo: string;
  nombreConductor: string;
  fechaCreacion: string;
  fechaModificacion: string;
}

export interface CrearEnvioPayload {
  codigoRastreo: string;
  direccionDestino: string;
  pesoKg: number;
  costo: number;
  vehiculoId: number;
  conductorId: number;
}