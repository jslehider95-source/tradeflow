import { crearVehiculoDB, obtenerVehiculosDB } from "../models/vehiculo.model.js";

// Listar vehículos
export const obtenerVehiculos = async (req, res) => {
    try {
        const vehiculos = await obtenerVehiculosDB();
        res.json(vehiculos);
    } catch (error) {
        console.error("Error al obtener vehículos:", error);
        res.status(500).json({ mensaje: "Error al obtener los vehículos" });
    }
};

// Registrar vehículo
export const registrarVehiculo = async (req, res) => {
    try {
        const { tipo, placa, capacidad_kg, estado } = req.body;
        const usuario_id = req.user.id; // Obtenido del token gracias al middleware de autenticación

        if (!tipo || !placa || !capacidad_kg) {
            return res.status(400).json({ mensaje: "Faltan campos obligatorios (tipo, placa, capacidad_kg)" });
        }

        const idNuevo = await crearVehiculoDB({
            tipo,
            placa,
            capacidad_kg,
            estado,
            usuario_id
        });

        res.status(201).json({
            mensaje: "Vehículo registrado exitosamente",
            id: idNuevo
        });
    } catch (error) {
        console.error("Error al registrar vehículo:", error);
        res.status(500).json({ mensaje: "Error al registrar el vehículo", detalle: error.message });
    }
};