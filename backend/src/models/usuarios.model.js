import pool from '../config/database.js';

export const buscarUsuariosPorCorreo = async (correo) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
    return rows;
};

export const obtenerUsuarioPorId = async (id) => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
};

export const crearUsuario = async (usuario) => {
    const {
        nombres,
        apellidos,
        correo,
        password,
        rol
    } = usuario;

    const [resultado] = await pool.query(
        `INSERT INTO usuarios
        (
            nombres,
            apellidos,
            correo,
            password,
            rol,
            estado
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            nombres,
            apellidos,
            correo,
            password,
            rol,
            1
        ]
    );

    return resultado.insertId;
};