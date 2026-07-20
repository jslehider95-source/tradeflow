import pool from "../config/database.js";

// Registrar un nuevo vehículo
export const crearVehiculoDB = async ({ tipo, placa, capacidad_kg, estado, usuario_id }) => {
    const [result] = await pool.query(
        "INSERT INTO vehiculos (tipo, placa, capacidad_kg, estado, usuario_id) VALUES (?, ?, ?, ?, ?)",
        [tipo, placa, capacidad_kg, estado || 'Disponible', usuario_id]
    );
    return result.insertId;
};

// Obtener todos los vehículos registrados
export const obtenerVehiculosDB = async () => {
    const [rows] = await pool.query(`
        SELECT v.*, CONCAT(u.nombres, ' ', u.apellidos) AS propietario 
        FROM vehiculos v 
        LEFT JOIN usuarios u ON v.usuario_id = u.id
    `);
    return rows;
};