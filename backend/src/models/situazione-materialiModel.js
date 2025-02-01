import pool from '../config/db.js';

// Get a specific material situation by material code
export const getSituazioneById = async (codice_materiale) => {
  // Execute a query to fetch a material situation by its material code
  const [rows] = await pool.promise().execute(
    'SELECT * FROM SITUAZIONE_MATERIALI WHERE CODICE_MATERIALE = ?',
    [codice_materiale]
  );
  // Return the material situation if found, otherwise return null
  return rows.length > 0 ? rows[0] : null;
};

// Add a new material situation
export const createSituazione = async (custom_data) => {
  // Extract fields and values from the custom data
  const fields = Object.keys(custom_data).join(', ');
  const values = Object.values(custom_data);

  // Prepare the insert query
  const query = `
    INSERT INTO SITUAZIONE_MATERIALI (${fields})
    VALUES (${values.map(() => '?').join(',')})
  `;

  // Execute the query and return the insert ID
  const [result] = await pool.promise().execute(query, values);
  return result.insertId;
};

// Update an existing material situation
export const updateSituazione = async (codice_materiale, custom_data) => {
  // Prepare the set clause for the update query
  const setClause = Object.keys(custom_data)
    .map((key) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(custom_data);
  values.push(codice_materiale);

  // Prepare the update query
  const query = `
    UPDATE SITUAZIONE_MATERIALI
    SET ${setClause},
        DATA_ULTIMA_MODIFICA = CURRENT_TIMESTAMP()
    WHERE CODICE_MATERIALE = ?
  `;

  // Execute the query and return the number of affected rows
  const [result] = await pool.promise().execute(query, values);
  return result.affectedRows;
};

// Delete a material situation
export const deleteSituazione = async (codice_materiale) => {
  // Prepare the delete query
  const query = 'DELETE FROM SITUAZIONE_MATERIALI WHERE CODICE_MATERIALE = ?';
  const [result] = await pool.promise().execute(query, [codice_materiale]);
  // Return the number of affected rows
  return result.affectedRows;
};