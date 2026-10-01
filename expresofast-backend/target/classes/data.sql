INSERT INTO rol (nombre_rol) VALUES ('ROLE_ADMIN'), ('ROLE_OPERADOR'), ('ROLE_CONDUCTOR');

INSERT INTO usuario (username, password_hash, nombre_completo, email, activo) VALUES
    ('admin', '$2a$10$Sv0nhLV/h1A6vPsFcn/Wy.BB5cEZF2orbNxdhCKCs6X0SHhhlvZw.', 'Administrador Sistema', 'admin@expresofast.cr', true),
    ('operador1', '$2a$10$yd1cLzwgF3hzvI44xT96UOcQcgBlLbd7IA6lurFPM3cqhqOepEHkW', 'Operador de Logistica', 'operador1@expresofast.cr', true),
    ('conductor1', '$2a$10$MIK10RPZwamq9kMkpxvrmOVDUwWXmhBu2ItKDYcqaJAjRkVbtIqvO', 'Conductor Principal', 'conductor1@expresofast.cr', true);

INSERT INTO usuario_rol (usuario_id, rol_id) VALUES
    (1, 1),
    (2, 2),
    (3, 3);

INSERT INTO empresa_logistica (nombre, cedula_juridica, telefono, fecha_registro) VALUES
    ('ExpresoFast Logistica S.A.', '3-101-123456', '2222-3333', CURRENT_TIMESTAMP);

INSERT INTO vehiculo (placa, capacidad_kg, estado, empresa_id) VALUES
    ('SJO-1234', 1000.00, 'DISPONIBLE', 1);

INSERT INTO conductor (nombre, apellidos, licencia, telefono, activo) VALUES
    ('Carlos', 'Rodríguez Mora', 'B-123456', '8888-1111', true);