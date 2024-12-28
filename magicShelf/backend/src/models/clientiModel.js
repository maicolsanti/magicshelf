import pool from '../config/db.js';

export const getAllClienti = async () => {
  const [rows] = await pool.query('SELECT * FROM ANAGRAFICA_CLIENTI');
  return rows;
};

export const getClienteById = async (codice_cliente) => {
  const [rows] = await pool.execute(
    'SELECT * FROM ANAGRAFICA_CLIENTI WHERE CODICE_CLIENTE = ?',
    [codice_cliente]
  );
  return rows.length > 0 ? rows[0] : null;
};

export const createCliente = async (custom_data) => {
  const fields = Object.keys(custom_data).join(', ');
  const values = Object.values(custom_data);

  const query = `
    INSERT INTO ANAGRAFICA_CLIENTI (${fields})
    VALUES (${values.map(() => '?').join(',')})
  `;

  const [result] = await pool.execute(query, values);
  return result.insertId;
};

export const updateCliente = async (codice_cliente, custom_data) => {
  const setClause = Object.keys(custom_data)
    .map((key) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(custom_data);
  values.push(codice_cliente);

  const query = `
    UPDATE ANAGRAFICA_CLIENTI
    SET ${setClause}
    WHERE CODICE_CLIENTE = ?
  `;

  const [result] = await pool.execute(query, values);
  return result.affectedRows;
};

export const deleteCliente = async (codice_cliente) => {
  const query = 'DELETE FROM ANAGRAFICA_CLIENTI WHERE CODICE_CLIENTE = ?';
  const [result] = await pool.execute(query, [codice_cliente]);
  return result.affectedRows;
};
