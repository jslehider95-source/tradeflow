import { Router } from "express";
import { obtenerCotizaciones, registrarCotizacion } from "../controllers/cotizacion.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, obtenerCotizaciones);
router.post("/registrar", verificarToken, registrarCotizacion);

export default router;