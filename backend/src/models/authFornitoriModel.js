import pool from '../config/db.js';

export const getFornitoreByEmail = async (codice_fiscale) => {
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_FORNITORI WHERE CODICE_FISCALE = ?',
    [codice_fiscale]
  );
  return rows.length > 0 ? rows : null;
};

export const insertFornitore = async (req) => {
    const fields = Object.keys(req).join(', ');
    const values = Object.values(req);

    const query = `
      INSERT INTO ANAGRAFICA_FORNITORI (${fields})
      VALUES (${values.map(() => '?').join(',')})
    `;

    const [result] = await pool.promise().execute(query, values);
    return result
};