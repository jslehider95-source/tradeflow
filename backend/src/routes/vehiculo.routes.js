import { Router } from "express";
import { obtenerVehiculos, registrarVehiculo } from "../controllers/vehiculo.controller.js";
import { verificarToken } from "../middleware/auth.middleware.js"; // Asegúrate de que la ruta a tu middleware sea correcta

const router = Router();

router.get("/", verificarToken, obtenerVehiculos);
router.post("/registrar", verificarToken, registrarVehiculo);

export default router;