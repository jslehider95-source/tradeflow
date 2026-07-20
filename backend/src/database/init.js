import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads schema.sql and executes each statement against the MySQL pool,
 * creating any missing tables. Safe to run multiple times since every
 * statement uses CREATE TABLE IF NOT EXISTS.
 */
export const initDatabase = async () => {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split on semicolons so each CREATE TABLE statement runs independently.
    const statements = schema
        .split(';')
        .map((statement) => statement.trim())
        .filter((statement) => statement.length > 0);

    const connection = await pool.getConnection();

    try {
        for (const statement of statements) {
            await connection.query(statement);
        }
        console.log('Esquema de base de datos verificado/creado exitosamente.');
    } finally {
        connection.release();
    }
};

// Permite ejecutar este archivo directamente: `node src/database/init.js`
const isMainModule = process.argv[1] === __filename;

if (isMainModule) {
    initDatabase()
        .then(() => {
            console.log('Inicialización de la base de datos completada.');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error al inicializar la base de datos:', error);
            process.exit(1);
        });
}

export default initDatabase;
