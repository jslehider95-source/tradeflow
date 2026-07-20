import pool from "../config/database.js"; // Asegúrate de que importe tu archivo de conexión real

// Registrar una nueva carga
export const crearCarga = async ({ descripcion, peso_kg, volumen_m3, tipo_empaque, usuario_id }) => {
    const [result] = await pool.query(
        "INSERT INTO carga (descripcion, peso_kg, volumen_m3, tipo_empaque, usuario_id) VALUES (?, ?, ?, ?, ?)",
        [descripcion, peso_kg, volumen_m3, tipo_empaque, usuario_id]
    );
    return result.insertId;
};

// Obtener todas las cargas registradas
export const obtenerCargasDB = async () => {
    const [rows] = await pool.query(`
        SELECT c.*, CONCAT(u.nombres, ' ', u.apellidos) AS propietario 
        FROM carga c 
        LEFT JOIN usuarios u ON c.usuario_id = u.id
    `);
    return rows;
};