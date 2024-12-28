import pool from '../config/db.js';

export const getAllFornitori = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM ANAGRAFICA_FORNITORI');
  return rows;
};

export const getFornitoreById = async (codice_fornitore) => {
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_FORNITORI WHERE CODICE_FORNITORE = ?',
    [codice_fornitore]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const createFornitore = async (custom_data) => {
  const fields = Object.keys(custom_data).join(', ');
  const values = Object.values(custom_data);

  const query = `
    INSERT INTO ANAGRAFICA_FORNITORI (${fields})
    VALUES (${values.map(() => '?').join(',')})
  `;

  const [result] = await pool.promise().execute(query, values);
  return result.insertId;
};

export const updateFornitore = async (codice_fornitore, custom_data) => {
  const setClause = Object.keys(custom_data)
    .map((key) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(custom_data);
  values.push(codice_fornitore);

  const query = `
    UPDATE ANAGRAFICA_FORNITORI
    SET ${setClause}
    WHERE CODICE_FORNITORE = ?
  `;

  const [result] = await pool.promise().execute(query, values);
  return result.affectedRows;
};

export const deleteFornitore = async (codice_fornitore) => {
  const query = 'DELETE FROM ANAGRAFICA_FORNITORI WHERE CODICE_FORNITORE = ?';
  const [result] = await pool.promise().execute(query, [codice_fornitore]);
  return result.affectedRows;
};
