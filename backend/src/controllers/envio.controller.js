import { crearEnvioDB, obtenerEnviosDB } from "../models/envio.model.js";

// Listar envíos
export const obtenerEnvios = async (req, res) => {
    try {
        const envios = await obtenerEnviosDB();
        res.json(envios);
    } catch (error) {
        console.error("Error al obtener envíos:", error);
        res.status(500).json({ mensaje: "Error al obtener los envíos" });
    }
};

// Registrar / Crear un nuevo envío
export const registrarEnvio = async (req, res) => {
    try {
        const { carga_id, vehiculo_id, origen, destino, estado } = req.body;
        const usuario_id = req.user.id; // Obtenido del token

        if (!carga_id || !vehiculo_id || !origen || !destino) {
            return res.status(400).json({ mensaje: "Faltan campos obligatorios (carga_id, vehiculo_id, origen, destino)" });
        }

        const idNuevo = await crearEnvioDB({
            carga_id,
            vehiculo_id,
            origen,
            destino,
            estado,
            usuario_id
        });

        res.status(201).json({
            mensaje: "Envío programado y asignado exitosamente",
            id: idNuevo
        });
    } catch (error) {
        console.error("Error al registrar envío:", error);
        res.status(500).json({ mensaje: "Error al registrar el envío", detalle: error.message });
    }
};