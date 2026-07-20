import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database.js"; // <--- Importante para verificar la base de datos
import usuarioRoutes from "./routes/usuario.routes.js";
import cargaRoutes from "./routes/carga.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Definir endpoints
app.use("/usuarios", usuarioRoutes);
app.use("/cargas", cargaRoutes);

const PORT = process.env.PORT || 3000;

async function iniciarservidor() {
    try {
        // Verifica la conexion con MySQL
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos MySQL establecida correctamente.');
        connection.release();
        
        app.listen(PORT, () => {
            console.log("=================================");
            console.log("TradeFlow iniciado");
            console.log(`http://localhost:${PORT}`);
            console.log("=================================");
        });
        
    } catch (error) {
        console.error("Error al conectar a la base de datos MySQL:", error);
        console.error(error.message);
    }
}

iniciarservidor();
import vehiculoRoutes from "./routes/vehiculo.routes.js";

// ... (dentro de tus app.use existentes)
app.use("/vehiculos", vehiculoRoutes);
import envioRoutes from "./routes/envio.routes.js";

// ... (en tus app.use existentes)
app.use("/envios", envioRoutes);
import cotizacionRoutes from "./routes/cotizacion.routes.js";
import reporteRoutes from "./routes/reporte.routes.js";

// ... (debajo de tus otras rutas app.use)
app.use("/cotizaciones", cotizacionRoutes);
app.use("/reportes", reporteRoutes);