import pool from '../config/db.js';

// Recupera tutti i materiali
export const getAllMateriali = async () => {
  const [rows] = await pool.promise().query('SELECT * FROM ANAGRAFICA_MATERIALI');
  return rows;
};

// Recupera un materiale specifico
export const getMaterialeById = async (codice_materiale) => {
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_MATERIALI WHERE CODICE_MATERIALE = ?',
    [codice_materiale]
  );
  return rows.length > 0 ? rows[0] : null;
};

// Aggiungi un nuovo materiale
export const createMateriale = async (custom_data) => {
  const fields = Object.keys(custom_data).join(', ');
  const values = Object.values(custom_data);
  
  const query = `
    INSERT INTO ANAGRAFICA_MATERIALI (${fields})
    VALUES (${values.map(() => '?').join(',')})
  `;
  
  const [result] = await pool.promise().execute(query, values);
  return result.insertId;
};

// Aggiorna un materiale esistente
export const updateMateriale = async (codice_materiale, custom_data) => {
  const setClause = Object.keys(custom_data).map(key => `\`${key}\` = ?`).join(', ');
  const values = Object.values(custom_data);
  values.push(codice_materiale);
  
  const query = `
    UPDATE ANAGRAFICA_MATERIALI
    SET ${setClause}
    WHERE CODICE_MATERIALE = ?
  `;
  
  const [result] = await pool.promise().execute(query, values);
  return result.affectedRows;
};

// Elimina un materiale
export const deleteMateriale = async (codice_materiale) => {
  const query = 'DELETE FROM ANAGRAFICA_MATERIALI WHERE CODICE_MATERIALE = ?';
  const [result] = await pool.promise().execute(query, [codice_materiale]);
  return result.affectedRows;
};
