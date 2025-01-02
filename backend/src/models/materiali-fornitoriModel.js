import pool from '../config/db.js';

// Get all suppliers' materials
export const getAllFornitoriMateriali = async () => {
    // Execute a query to fetch all supplier materials from the database
    const [rows] = await pool.promise().query('SELECT * FROM MATERIALI_FORNITORI');
    return rows;
};

// Get supplier's material by supplier code
export const getFornitoreMaterialiById = async (codice_fornitore) => {
    // Execute a query to fetch the supplier material by supplier code
    const [rows] = await pool.promise().execute(
        'SELECT * FROM MATERIALI_FORNITORI WHERE CODICE_FORNITORE = ?',
        [codice_fornitore]
    );
    // Return the material if found, otherwise return null
    return rows.length > 0 ? rows[0] : null;
};