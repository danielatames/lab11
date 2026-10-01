import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { EnvioService } from '../services/envio';


export const fechasValidator: ValidatorFn = (grupo: AbstractControl): ValidationErrors | null => {
  const despacho = grupo.get('fechaDespacho')?.value as string;
  const entrega = grupo.get('fechaEntregaEstimada')?.value as string;

  if (!despacho || !entrega) {
    return null; 
  }

  return new Date(entrega).getTime() > new Date(despacho).getTime()
    ? null
    : { fechasInvalidas: true };
};


export function trackingDisponibleValidator(service: EnvioService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const valor = (control.value as string ?? '').trim().toUpperCase();
    if (!valor) {
      return of(null);
    }

    return timer(400).pipe(
      switchMap(() => service.checkTracking(valor)),
      map(resp => (resp.existe ? { trackingTomado: true } : null)),
      catchError(() => of(null)) 
    );
  };
}