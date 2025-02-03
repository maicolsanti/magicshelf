import pool from '../config/db.js';

// Get a specific material by its code
export const getMaterialeById = async (codice_materiale) => {
  // Execute a query to fetch a material by its code
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_MATERIALI WHERE CODICE_MATERIALE = ?',
    [codice_materiale]
  );

  // If a material is found, convert its image BLOB to a Base64 string
  if (rows.length > 0) {
    const materiale = rows[0];
    if (materiale.IMMAGINE) {
      materiale.IMMAGINE = materiale.IMMAGINE.toString('base64'); // Convert BLOB to Base64
    }
    return materiale;
  }

  // Return null if no material is found
  return null;
};

// Add a new material
export const createMateriale = async (custom_data, imageBuffer) => {
  // Ensure custom_data is an object and add the image field
  if (typeof custom_data === 'string') {
    custom_data = JSON.parse(custom_data); // Parse custom_data if it's a string
  }
  custom_data.IMMAGINE = imageBuffer; // Add image buffer to custom_data

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
export const updateMateriale = async (codice_materiale, custom_data, imageBuffer) => {
  // Add image buffer to custom data if it exists
  if (imageBuffer) {
    custom_data.IMMAGINE = imageBuffer;
  }

  // Prepare the set clause for the update query
  const setClause = Object.keys(custom_data)
    .map((key) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(custom_data);
  values.push(codice_materiale);

  // Prepare the update query
  const query = `
    UPDATE ANAGRAFICA_MATERIALI
    SET ${setClause},
        DATA_ULTIMA_MODIFICA = CURRENT_TIMESTAMP()
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