package cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class PaqueteDTO {

    @NotBlank(message = "La descripción del paquete es obligatoria")
    @Size(max = 255, message = "La descripción no puede superar 255 caracteres")
    private String descripcion;

    @NotNull(message = "El peso del paquete es obligatorio")
    @Positive(message = "El peso del paquete debe ser mayor a cero")
    @DecimalMax(value = "999.99", message = "El peso de un paquete no puede superar 999.99 kg")
    private BigDecimal pesoKg;

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public BigDecimal getPesoKg() { return pesoKg; }
    public void setPesoKg(BigDecimal pesoKg) { this.pesoKg = pesoKg; }
}