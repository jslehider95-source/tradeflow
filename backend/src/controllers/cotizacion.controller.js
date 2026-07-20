import { crearCotizacionDB, obtenerCotizacionesDB } from "../models/cotizacion.model.js";
import pool from "../config/database.js";

export const obtenerCotizaciones = async (req, res) => {
    try {
        const cotizaciones = await obtenerCotizacionesDB();
        res.json(cotizaciones);
    } catch (error) {
        console.error("Error al obtener cotizaciones:", error);
        res.status(500).json({ mensaje: "Error al obtener las cotizaciones" });
    }
};

export const registrarCotizacion = async (req, res) => {
    try {
        const { carga_id, origen, destino, distancia_km } = req.body;
        const usuario_id = req.user.id;

        if (!carga_id || !origen || !destino || !distancia_km) {
            return res.status(400).json({ mensaje: "Faltan campos obligatorios (carga_id, origen, destino, distancia_km)" });
        }

        // Consultar el peso de la carga para calcular el costo
        const [cargas] = await pool.query("SELECT peso_kg FROM carga WHERE id = ?", [carga_id]);
        if (cargas.length === 0) {
            return res.status(404).json({ mensaje: "La carga especificada no existe" });
        }

        const peso_kg = cargas[0].peso_kg;

        // Fórmula de ejemplo para el costo: (Peso * 2) + (Distancia * 5) + Tarifa Base (50)
        const costo_estimado = (Number(peso_kg) * 2) + (Number(distancia_km) * 5) + 50;

        const idNuevo = await crearCotizacionDB({
            carga_id,
            origen,
            destino,
            distancia_km,
            costo_estimado,
            usuario_id
        });

        res.status(201).json({
            mensaje: "Cotización generada exitosamente",
            costo_estimado,
            id: idNuevo
        });
    } catch (error) {
        console.error("Error al generar cotización:", error);
        res.status(500).json({ mensaje: "Error al generar la cotización", detalle: error.message });
    }
};