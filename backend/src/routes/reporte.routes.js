import { Router } from "express";
import { obtenerReporteGeneral } from "../controllers/reporte.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", verificarToken, obtenerReporteGeneral);

export default router;