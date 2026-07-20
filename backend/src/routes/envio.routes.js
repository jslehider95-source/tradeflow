import { Router } from "express";
import { obtenerEnvios, registrarEnvio } from "../controllers/envio.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, obtenerEnvios);
router.post("/registrar", verificarToken, registrarEnvio);

export default router;