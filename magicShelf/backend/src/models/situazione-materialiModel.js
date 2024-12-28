import pool from '../config/db.js';

// Recupera tutte le situazioni dei materiali
export const getAllSituazioni = async () => {
  const [rows] = await pool.query('SELECT * FROM SITUAZIONE_MATERIALI');
  return rows;
};

// Recupera una situazione specifica di un materiale
export const getSituazioneById = async (codice_materiale) => {
  const [rows] = await pool.execute(
    'SELECT * FROM SITUAZIONE_MATERIALI WHERE CODICE_MATERIALE = ?',
    [codice_materiale]
  );
  return rows.length > 0 ? rows[0] : null;
};

// Aggiungi una nuova situazione del materiale
export const createSituazione = async (custom_data) => {
  const fields = Object.keys(custom_data).join(', ');
  const values = Object.values(custom_data);

  const query = `
    INSERT INTO SITUAZIONE_MATERIALI (${fields})
    VALUES (${values.map(() => '?').join(',')})
  `;

  const [result] = await pool.execute(query, values);
  return result.insertId;
};

// Aggiorna una situazione del materiale esistente
export const updateSituazione = async (codice_materiale, custom_data) => {
  const setClause = Object.keys(custom_data).map(key => `\`${key}\` = ?`).join(', ');
  const values = Object.values(custom_data);
  values.push(codice_materiale);

  const query = `
    UPDATE SITUAZIONE_MATERIALI
    SET ${setClause}
    WHERE CODICE_MATERIALE = ?
  `;

  const [result] = await pool.execute(query, values);
  return result.affectedRows;
};

// Elimina una situazione del materiale
export const deleteSituazione = async (codice_materiale) => {
  const query = 'DELETE FROM SITUAZIONE_MATERIALI WHERE CODICE_MATERIALE = ?';
  const [result] = await pool.execute(query, [codice_materiale]);
  return result.affectedRows;
};
