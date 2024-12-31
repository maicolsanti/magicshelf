import pool from '../config/db.js';

export const getAllFornitoriMateriali = async () => {
    const [rows] = await pool.promise().query('SELECT * FROM MATERIALI_FORNITORI');
    return rows;
  };

export const getFornitoreMaterialiById = async (codice_fornitore) => {
    const [rows] = await pool.promise().execute(
        'SELECT * FROM MATERIALI_FORNITORI WHERE CODICE_FORNITORE = ?',
        [codice_fornitore]
    );
    return rows.length > 0 ? rows[0] : null;
};