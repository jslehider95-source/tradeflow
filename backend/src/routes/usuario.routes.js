import { Router } from "express";
import { registrarUsuario, loginUsuario } from "../controllers/usuarios.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

// Rutas públicas
router.post("/registrar", registrarUsuario);
router.post("/login", loginUsuario);

// Ruta protegida de perfil
router.get("/perfil", verificarToken, (req, res) => {
    res.json({ 
        mensaje: "Acceso concedido", 
        usuario: req.user 
    });
});

export default router;