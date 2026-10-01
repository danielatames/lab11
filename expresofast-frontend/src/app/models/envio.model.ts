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
export interface PaquetePayload {
  descripcion: string;
  pesoKg: number;
}

export interface EnvioRegistroPayload {
  numeroTracking: string;
  destinatario: string;
  direccionDestino: string;
  montoFlete: number;
  fechaDespacho: string;        
  fechaEntregaEstimada: string;   
  vehiculoId: number;
  conductorId: number;
  paquetes: PaquetePayload[];
}