import pool from "../config/database.js";

export const crearCotizacionDB = async ({ carga_id, origen, destino, distancia_km, costo_estimado, usuario_id }) => {
    const [result] = await pool.query(
        "INSERT INTO cotizaciones (carga_id, origen, destino, distancia_km, costo_estimado, usuario_id) VALUES (?, ?, ?, ?, ?, ?)",
        [carga_id, origen, destino, distancia_km, costo_estimado, usuario_id]
    );
    return result.insertId;
};

export const obtenerCotizacionesDB = async () => {
    const [rows] = await pool.query(`
        SELECT 
            co.id, 
            co.origen, 
            co.destino, 
            co.distancia_km, 
            co.costo_estimado, 
            co.fecha_creacion,
            c.descripcion AS carga_descripcion,
            c.peso_kg,
            CONCAT(u.nombres, ' ', u.apellidos) AS cotizado_por
        FROM cotizaciones co
        LEFT JOIN carga c ON co.carga_id = c.id
        LEFT JOIN usuarios u ON co.usuario_id = u.id
    `);
    return rows;
};