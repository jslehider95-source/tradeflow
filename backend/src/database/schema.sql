-- TradeFlow database schema
-- Creates all tables required by the application if they don't already exist.

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    estado INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS carga (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT,
    peso_kg DECIMAL(10, 2) NOT NULL,
    volumen_m3 DECIMAL(10, 2),
    tipo_empaque VARCHAR(100),
    usuario_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_carga_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    placa VARCHAR(20) NOT NULL UNIQUE,
    capacidad_kg DECIMAL(10, 2),
    estado VARCHAR(50) NOT NULL DEFAULT 'Disponible',
    usuario_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vehiculos_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS envios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carga_id INT,
    vehiculo_id INT,
    origen VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'En Tránsito',
    usuario_id INT,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_envios_carga FOREIGN KEY (carga_id) REFERENCES carga(id) ON DELETE SET NULL,
    CONSTRAINT fk_envios_vehiculo FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id) ON DELETE SET NULL,
    CONSTRAINT fk_envios_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS cotizaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carga_id INT,
    origen VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    distancia_km DECIMAL(10, 2) NOT NULL,
    costo_estimado DECIMAL(10, 2) NOT NULL,
    usuario_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_cotizaciones_carga FOREIGN KEY (carga_id) REFERENCES carga(id) ON DELETE SET NULL,
    CONSTRAINT fk_cotizaciones_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);
