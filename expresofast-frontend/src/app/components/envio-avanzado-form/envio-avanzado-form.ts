import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray, FormControl, FormGroup, NonNullableFormBuilder,
  ReactiveFormsModule, Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { EnvioService } from '../../services/envio';
import { EnvioRegistroPayload } from '../../models/envio.model';
import { fechasValidator, trackingDisponibleValidator } from '../../validators/envio.validators';

type PaqueteForm = FormGroup<{
  descripcion: FormControl<string>;
  pesoKg: FormControl<number>;
}>;

@Component({
  selector: 'app-envio-avanzado-form',
  imports: [ReactiveFormsModule],
  templateUrl: './envio-avanzado-form.html',
  styleUrl: './envio-avanzado-form.css'
})
export class EnvioAvanzadoForm {
  private fb = inject(NonNullableFormBuilder);
  private service = inject(EnvioService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  mensaje = '';
  errorServidor = '';
  enviando = false;


  form = this.fb.group(
    {
      numeroTracking: this.fb.control('', {
        validators: [Validators.required, Validators.maxLength(30)],
        asyncValidators: [trackingDisponibleValidator(this.service)],
        updateOn: 'change'
      }),
      destinatario: this.fb.control('', Validators.required),
      direccionDestino: this.fb.control('', Validators.required),
      montoFlete: this.fb.control(0, [Validators.required, Validators.min(0.01)]),
      fechaDespacho: this.fb.control('', Validators.required),
      fechaEntregaEstimada: this.fb.control('', Validators.required),
      vehiculoId: this.fb.control(1, [Validators.required, Validators.min(1)]),
      conductorId: this.fb.control(1, [Validators.required, Validators.min(1)]),
      paquetes: this.fb.array<PaqueteForm>([this.crearPaquete()], Validators.minLength(1))
    },
    { validators: fechasValidator } 
  );

  constructor() {
    
    this.form.statusChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());
  }

  get paquetes(): FormArray<PaqueteForm> {
    return this.form.controls.paquetes;
  }

  private crearPaquete(): PaqueteForm {
    return this.fb.group({
      descripcion: this.fb.control('', [Validators.required, Validators.maxLength(255)]),
      pesoKg: this.fb.control(0, [Validators.required, Validators.min(0.01), Validators.max(999.99)])
    });
  }

  agregarPaquete(): void {
    this.paquetes.push(this.crearPaquete());
  }

  eliminarPaquete(indice: number): void {
    if (this.paquetes.length > 1) {
      this.paquetes.removeAt(indice);
    }
  }

  get pesoTotal(): number {
    return this.paquetes.controls.reduce((suma, p) => suma + (Number(p.controls.pesoKg.value) || 0), 0);
  }

  guardar(): void {
    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.mensaje = '';
    this.errorServidor = '';

    const valor = this.form.getRawValue();
    const payload: EnvioRegistroPayload = {
      ...valor,
      numeroTracking: valor.numeroTracking.trim().toUpperCase()
    };

    this.service.crearEnvioAvanzado(payload).subscribe({
      next: creado => {
        this.enviando = false;
        this.mensaje = `Envío ${creado.codigoRastreo} registrado con ${payload.paquetes.length} paquete(s).`;
        this.cdr.markForCheck();
        setTimeout(() => this.router.navigate(['/envios']), 2000);
      },
      error: err => {
        this.enviando = false;
        const errores = err?.error?.errores;
        this.errorServidor = errores
          ? Object.values(errores).join(' ')
          : (err?.error?.error || 'No se pudo registrar el envío.');
        this.cdr.markForCheck();
      }
    });
  }
}