package cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.Valid;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class EnvioRegistroDTO {

    @NotBlank(message = "El número de tracking es obligatorio")
    @Size(max = 30, message = "El número de tracking no puede superar 30 caracteres")
    private String numeroTracking;

    @NotBlank(message = "El destinatario es obligatorio")
    private String destinatario;

    @NotBlank(message = "La dirección destino es obligatoria")
    private String direccionDestino;

    @NotNull(message = "El monto de flete es obligatorio")
    @Positive(message = "El monto de flete debe ser mayor a cero")
    private BigDecimal montoFlete;

    @NotNull(message = "La fecha de despacho es obligatoria")
    private LocalDate fechaDespacho;

    @NotNull(message = "La fecha de entrega estimada es obligatoria")
    private LocalDate fechaEntregaEstimada;

    @NotNull(message = "El ID del vehículo es obligatorio")
    private Integer vehiculoId;

    @NotNull(message = "El ID del conductor es obligatorio")
    private Integer conductorId;

    @Valid   
    @NotEmpty(message = "El envío debe tener al menos un paquete")
    private List<PaqueteDTO> paquetes = new ArrayList<>();

    
    @JsonIgnore
    @AssertTrue(message = "La fecha de entrega estimada debe ser posterior a la fecha de despacho")
    public boolean isRangoFechasValido() {
        if (fechaDespacho == null || fechaEntregaEstimada == null) return true;
        return fechaEntregaEstimada.isAfter(fechaDespacho);
    }

    public String getNumeroTracking() { return numeroTracking; }
    public void setNumeroTracking(String numeroTracking) { this.numeroTracking = numeroTracking; }

    public String getDestinatario() { return destinatario; }
    public void setDestinatario(String destinatario) { this.destinatario = destinatario; }

    public String getDireccionDestino() { return direccionDestino; }
    public void setDireccionDestino(String direccionDestino) { this.direccionDestino = direccionDestino; }

    public BigDecimal getMontoFlete() { return montoFlete; }
    public void setMontoFlete(BigDecimal montoFlete) { this.montoFlete = montoFlete; }

    public LocalDate getFechaDespacho() { return fechaDespacho; }
    public void setFechaDespacho(LocalDate fechaDespacho) { this.fechaDespacho = fechaDespacho; }

    public LocalDate getFechaEntregaEstimada() { return fechaEntregaEstimada; }
    public void setFechaEntregaEstimada(LocalDate fechaEntregaEstimada) { this.fechaEntregaEstimada = fechaEntregaEstimada; }

    public Integer getVehiculoId() { return vehiculoId; }
    public void setVehiculoId(Integer vehiculoId) { this.vehiculoId = vehiculoId; }

    public Integer getConductorId() { return conductorId; }
    public void setConductorId(Integer conductorId) { this.conductorId = conductorId; }

    public List<PaqueteDTO> getPaquetes() { return paquetes; }
    public void setPaquetes(List<PaqueteDTO> paquetes) { this.paquetes = paquetes; }
}