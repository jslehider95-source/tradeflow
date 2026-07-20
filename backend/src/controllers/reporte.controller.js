import pool from "../config/database.js";

export const obtenerReporteGeneral = async (req, res) => {
    try {
        const [totalCargas] = await pool.query("SELECT COUNT(*) AS count FROM carga");
        const [totalVehiculos] = await pool.query("SELECT COUNT(*) AS count FROM vehiculos");
        const [totalEnvios] = await pool.query("SELECT COUNT(*) AS count FROM envios");
        const [totalCotizaciones] = await pool.query("SELECT COUNT(*) AS count FROM cotizaciones");

        res.json({
            mensaje: "Reporte general generado exitosamente",
            estadisticas: {
                cargas_registradas: totalCargas[0].count,
                vehiculos_disponibles: totalVehiculos[0].count,
                envios_realizados: totalEnvios[0].count,
                cotizaciones_generadas: totalCotizaciones[0].count
            }
        });
    } catch (error) {
        console.error("Error al generar reporte:", error);
        res.status(500).json({ mensaje: "Error al generar el reporte", detalle: error.message });
    }
};