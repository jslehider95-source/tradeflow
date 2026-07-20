import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Formato: Bearer <token>

    if (!token) {
        return res.status(403).json({ mensaje: "Token de acceso requerido" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).json({ mensaje: "Token inválido o expirado" });
        }
        req.user = user; // Guardamos los datos del usuario decodificados en la petición
        next();
    });
};