package cr.ac.ucr.paraiso.ie.c5k177.expresofast.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cr.ac.ucr.paraiso.ie.c5k177.expresofast.business.EnvioService;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto.BitacoraResponseDTO;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto.CambioEstadoDTO;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto.EnvioDTO;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto.EnvioRequestDTO;
import cr.ac.ucr.paraiso.ie.c5k177.expresofast.dto.EnvioResponseDTO;
import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
public class EnvioController {

    private final EnvioService envioService;

    public EnvioController(EnvioService envioService) {
        this.envioService = envioService;
    }

    @GetMapping("/api/envios/optimizados")
    public ResponseEntity<List<EnvioResponseDTO>> listarOptimizado() {
        return ResponseEntity.ok(envioService.listarOptimizado());
    }

    @GetMapping("/api/envios/{id}")
    public ResponseEntity<EnvioResponseDTO> obtenerPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(envioService.obtenerPorId(id));
    }

    @PostMapping("/api/envios")
    public ResponseEntity<EnvioResponseDTO> registrarEnvio(@Valid @RequestBody EnvioRequestDTO dto) {
        EnvioResponseDTO guardado = envioService.registrarEnvio(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(guardado);
    }

    @PatchMapping("/api/envios/{id}/estado")
    public ResponseEntity<EnvioResponseDTO> actualizarEstado(@PathVariable Integer id,
            @Valid @RequestBody CambioEstadoDTO dto) {
        EnvioResponseDTO actualizado = envioService.actualizarEstado(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @PatchMapping("/api/envios/{id}/cancelar")
    public ResponseEntity<EnvioResponseDTO> cancelarEnvio(@PathVariable Integer id) {
        return ResponseEntity.ok(envioService.cancelarEnvio(id));
    }

    @GetMapping("/api/envios/{id}/bitacora")
    public ResponseEntity<List<BitacoraResponseDTO>> obtenerBitacora(@PathVariable Integer id) {
        return ResponseEntity.ok(envioService.obtenerBitacora(id));
    }

    @GetMapping("/api/v1/envios")
    public ResponseEntity<Page<EnvioDTO>> obtenerEnviosPaginados(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "ASC") String direction,
            @RequestParam(required = false) String busqueda,
            @RequestParam(required = false) String estado) {

        Page<EnvioDTO> pagina = envioService.listarPaginado(page, size, sortBy, direction, busqueda, estado);
        return ResponseEntity.ok(pagina);
    }

    @GetMapping("/api/v1/envios/procedimiento/{estado}")
    public ResponseEntity<List<EnvioDTO>> obtenerEnviosPorProcedimiento(@PathVariable String estado) {
        return ResponseEntity.ok(envioService.listarViaStoredProcedure(estado));
    }

    @GetMapping("/api/envios/rastreo/{codigo}")
    public ResponseEntity<EnvioResponseDTO> obtenerPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(envioService.obtenerPorCodigo(codigo));
    }
}