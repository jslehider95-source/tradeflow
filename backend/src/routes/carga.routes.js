import { Router } from "express";
import { obtenerCargas, registrarCarga } from "../controllers/carga.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

// Ambas rutas están protegidas para que solo usuarios autenticados puedan ver o registrar cargas
router.get("/", verificarToken, obtenerCargas);
router.post("/registrar", verificarToken, registrarCarga);

export default router;