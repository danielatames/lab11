USE ExpresoFastc5k177_II2026;
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.columns
    WHERE object_id = OBJECT_ID('Envio') AND name = 'destinatario'
)
BEGIN
    ALTER TABLE Envio ADD destinatario VARCHAR(100) NULL;
END
GO

CREATE OR ALTER PROCEDURE SP_OBTENER_ENVIOS_POR_ESTADO
    @pEstado VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        envio_id,
        codigo_rastreo,
        direccion_destino,
        destinatario,
        peso_kg,
        costo,
        estado_envio,
        vehiculo_id,
        conductor_id,
        fecha_creacion,
        fecha_modificacion
    FROM Envio
    WHERE estado_envio = @pEstado
    ORDER BY fecha_creacion DESC;
END
GO

CREATE OR ALTER PROCEDURE SP_RESUMEN_METRICAS_ENVIOS
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        estado_envio,
        COUNT(*) AS total_envios,
        SUM(costo) AS suma_flete
    FROM Envio
    GROUP BY estado_envio;
END
GO