import pool from '../config/db.js';

// Get all materials
export const getAllMateriali = async () => {
  // Execute a query to fetch all materials from the database
  const [rows] = await pool.promise().query('SELECT * FROM ANAGRAFICA_MATERIALI');
  return rows;
};

// Get a specific material by its code
export const getMaterialeById = async (codice_materiale) => {
  // Execute a query to fetch a material by its code
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_MATERIALI WHERE CODICE_MATERIALE = ?',
    [codice_materiale]
  );
  // Return the material if found, otherwise return null
  return rows.length > 0 ? rows[0] : null;
};

// Add a new material
export const createMateriale = async (custom_data) => {
  // Extract fields and values from the custom data
  const fields = Object.keys(custom_data).join(', ');
  const values = Object.values(custom_data);

  // Prepare the insert query
  const query = `
    INSERT INTO ANAGRAFICA_MATERIALI (${fields})
    VALUES (${values.map(() => '?').join(',')})
  `;

  // Execute the query and return the insert ID
  const [result] = await pool.promise().execute(query, values);
  return result.insertId;
};

// Update an existing material
export const updateMateriale = async (codice_materiale, custom_data) => {
  // Prepare the set clause for the update query
  const setClause = Object.keys(custom_data)
    .map((key) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(custom_data);
  values.push(codice_materiale);

  // Prepare the update query
  const query = `
    UPDATE ANAGRAFICA_MATERIALI
    SET ${setClause}
    WHERE CODICE_MATERIALE = ?
  `;

  // Execute the query and return the number of affected rows
  const [result] = await pool.promise().execute(query, values);
  return result.affectedRows;
};

// Delete a material
export const deleteMateriale = async (codice_materiale) => {
  // Prepare the delete query
  const query = 'DELETE FROM ANAGRAFICA_MATERIALI WHERE CODICE_MATERIALE = ?';
  const [result] = await pool.promise().execute(query, [codice_materiale]);
  // Return the number of affected rows
  return result.affectedRows;
};