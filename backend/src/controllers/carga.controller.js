import { crearCarga, obtenerCargasDB } from "../models/carga.model.js";

// Obtener listado de cargas
export const obtenerCargas = async (req, res) => {
    try {
        const cargas = await obtenerCargasDB();
        res.json(cargas);
    } catch (error) {
        console.error("Error al obtener cargas:", error);
        res.status(500).json({ mensaje: "Error al obtener las cargas" });
    }
};

// Registrar nueva carga
export const registrarCarga = async (req, res) => {
    try {
        const { descripcion, peso_kg, volumen_m3, tipo_empaque } = req.body;
        
        // Obtenemos el ID del usuario directamente desde el token validado por el middleware
        const usuario_id = req.user.id; 

        if (!descripcion || !peso_kg || !volumen_m3) {
            return res.status(400).json({ mensaje: "Faltan campos obligatorios (descripcion, peso, volumen)" });
        }

        const idNuevo = await crearCarga({
            descripcion,
            peso_kg,
            volumen_m3,
            tipo_empaque,
            usuario_id
        });

        res.status(201).json({
            mensaje: "Carga registrada exitosamente",
            id: idNuevo
        });
    } catch (error) {
        console.error("Error al registrar carga:", error);
        res.status(500).json({ mensaje: "Error al registrar la carga", detalle: error.message });
    }
}; 