import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database.js";

// Importar todas las rutas al inicio
import usuarioRoutes from "./routes/usuario.routes.js";
import cargaRoutes from "./routes/carga.routes.js";
import vehiculoRoutes from "./routes/vehiculo.routes.js";
import envioRoutes from "./routes/envio.routes.js";
import cotizacionRoutes from "./routes/cotizacion.routes.js";
import reporteRoutes from "./routes/reporte.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Ruta raíz de bienvenida (evita el error 502 Bad Gateway en el navegador)
app.get("/", (req, res) => {
    res.json({ status: "success", message: "¡API de TradeFlow funcionando correctamente en Railway!" });
});

// Definir los endpoints de la API
app.use("/usuarios", usuarioRoutes);
app.use("/cargas", cargaRoutes);
app.use("/vehiculos", vehiculoRoutes);
app.use("/envios", envioRoutes);
app.use("/cotizaciones", cotizacionRoutes);
app.use("/reportes", reporteRoutes);

const PORT = process.env.PORT || 3000;

async function iniciarservidor() {
    try {
        // Verifica la conexión con MySQL en la nube
        const connection = await pool.getConnection();
        console.log('Conexión a la base de datos MySQL establecida correctamente.');
        
        // SOLUCIÓN DEFINITIVA: Crear la tabla automáticamente si no existe
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(255) NOT NULL,
                correo VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        
        await connection.query(createTableQuery);
        console.log('Tabla "usuarios" verificada o creada exitosamente.');
        
        connection.release();
        
        app.listen(PORT, () => {
            console.log("=================================");
            console.log("TradeFlow iniciado");
            console.log(`Puerto: ${PORT}`);
            console.log("=================================");
        });
        
    } catch (error) {
        console.error("Error al iniciar el servidor o la base de datos:", error);
        console.error(error.message);
    }
}

iniciarservidor();