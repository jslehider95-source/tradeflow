import express from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuario.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensaje: "Hola soy Jonathan y este es mi primer servidor con Express",
    estado: "Servidor funcionando correctamente"
});
});

app.use("/usuarios", usuarioRoutes);

export default app;

