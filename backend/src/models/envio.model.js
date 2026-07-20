import pool from "../config/database.js";

// Registrar un nuevo envío (Asignar carga a vehículo y ruta)
export const crearEnvioDB = async ({ carga_id, vehiculo_id, origen, destino, estado, usuario_id }) => {
    const [result] = await pool.query(
        "INSERT INTO envios (carga_id, vehiculo_id, origen, destino, estado, usuario_id) VALUES (?, ?, ?, ?, ?, ?)",
        [carga_id, vehiculo_id, origen, destino, estado || 'En Tránsito', usuario_id]
    );
    return result.insertId;
};

// Obtener todos los envíos con sus detalles cruzados (Carga, Vehículo y Propietario)
export const obtenerEnviosDB = async () => {
    const [rows] = await pool.query(`
        SELECT 
            e.id, 
            e.origen, 
            e.destino, 
            e.estado, 
            e.fecha_envio,
            c.descripcion AS carga_descripcion,
            c.peso_kg,
            v.tipo AS vehiculo_tipo,
            v.placa AS vehiculo_placa,
            CONCAT(u.nombres, ' ', u.apellidos) AS registrado_por
        FROM envios e
        LEFT JOIN carga c ON e.carga_id = c.id
        LEFT JOIN vehiculos v ON e.vehiculo_id = v.id
        LEFT JOIN usuarios u ON e.usuario_id = u.id
    `);
    return rows;
};