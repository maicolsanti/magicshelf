import pool from '../config/db.js';

export const getClienteByEmail = async (email) => {
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_CLIENTI WHERE EMAIL = ?',
    [email]
  );
  return rows.length > 0 ? rows : null;
};

export const insertCliente = async (req) => {
    const fields = Object.keys(req).join(', ');
    const values = Object.values(req);

    const query = `
      INSERT INTO ANAGRAFICA_CLIENTI (${fields})
      VALUES (${values.map(() => '?').join(',')})
    `;

    const [result] = await pool.promise().execute(query, values);
    return result
};
