import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioForm } from './envio-form';

describe('EnvioForm', () => {
  let component: EnvioForm;
  let fixture: ComponentFixture<EnvioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EnvioForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
