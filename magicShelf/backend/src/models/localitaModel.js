import pool from '../config/db.js';

export const getAllLocalita = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM LOCALITA');
  return rows;
};

export const getLocalitaById = async (codice_istat) => {
  const [rows] = await pool.promise().execute(
    'SELECT * FROM LOCALITA WHERE CODICE_ISTAT = ?',
    [codice_istat]
  );
  return rows.length > 0 ? rows[0] : null;
};
