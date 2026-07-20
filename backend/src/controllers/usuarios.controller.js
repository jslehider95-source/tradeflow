import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { buscarUsuariosPorCorreo, crearUsuario } from "../models/usuarios.model.js";

export const obtenerUsuarios = async (req, res) => {
    try {
        res.json({ mensaje: "Lista de usuarios obtenida correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al obtener los usuarios" });
    }
};

export const registrarUsuario = async (req, res) => {
    try {
        const { nombres, apellidos, correo, password, rol } = req.body;
        
        const existe = await buscarUsuariosPorCorreo(correo);
        if (existe.length > 0) {
            return res.status(400).json({ mensaje: "El correo ya está registrado" });
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const idNuevo = await crearUsuario({ 
            nombres, 
            apellidos, 
            correo, 
            password: passwordHash, 
            rol 
        });
        
        res.status(201).json({ 
            mensaje: "Usuario registrado correctamente", 
            id: idNuevo 
        });
    } catch (error) {
        console.error("Error al registrar:", error);
        res.status(500).json({ mensaje: "Error al registrar usuario", detalle: error.message });
    }
};

// --- FUNCIÓN DE LOGIN ---
export const loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;
        
        const usuarios = await buscarUsuariosPorCorreo(correo);
        if (usuarios.length === 0) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const usuario = usuarios[0];

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "8h" }
        );

        res.json({
            mensaje: "Inicio de sesión exitoso",
            token,
            usuario: {
                id: usuario.id,
                nombres: usuario.nombres,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ mensaje: "Error al iniciar sesión" });
    }
};