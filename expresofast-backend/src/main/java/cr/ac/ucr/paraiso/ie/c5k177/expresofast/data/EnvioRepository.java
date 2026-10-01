package cr.ac.ucr.paraiso.ie.c5k177.expresofast.data;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import cr.ac.ucr.paraiso.ie.c5k177.expresofast.domain.Envio;

public interface EnvioRepository extends JpaRepository<Envio, Integer> {

        @Query("SELECT e FROM Envio e " +
                        "JOIN FETCH e.vehiculo v " +
                        "JOIN FETCH v.empresa " +
                        "JOIN FETCH e.conductor " +
                        "ORDER BY e.id DESC")
        List<Envio> findAllOptimizado();

        @Modifying(clearAutomatically = true)
        @Query("UPDATE Envio e SET e.estadoEnvio = :estado WHERE e.vehiculo.id = :vehiculoId")
        int actualizarEstadoPorVehiculo(@Param("vehiculoId") Integer vehiculoId, @Param("estado") String estado);

        java.util.Optional<Envio> findByCodigoRastreo(String codigoRastreo);
        boolean existsByCodigoRastreo(String codigoRastreo);
        
        @Procedure(procedureName = "SP_OBTENER_ENVIOS_POR_ESTADO")
        List<Envio> obtenerEnviosPorEstado(@Param("pEstado") String pEstado);

        Page<Envio> findByCodigoRastreoContainingIgnoreCaseOrDestinatarioContainingIgnoreCaseAndEstadoEnvio(
                        String codigoRastreo, String destinatario, String estadoEnvio, Pageable pageable);

        Page<Envio> findByCodigoRastreoContainingIgnoreCaseOrDestinatarioContainingIgnoreCase(
                        String codigoRastreo, String destinatario, Pageable pageable);

        Page<Envio> findByEstadoEnvio(String estadoEnvio, Pageable pageable);
}