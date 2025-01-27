import pool from '../config/db.js';

// Get all suppliers
export const getAllFornitori = async () => {
  // Execute a query to fetch all suppliers
  const [rows] = await pool.promise().query('SELECT * FROM ANAGRAFICA_FORNITORI');
  return rows;
};

// Get supplier by ID
export const getFornitoreById = async (codice_fornitore) => {
  // Execute a query to fetch the supplier with the given supplier code (ID)
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_FORNITORI WHERE CODICE_FORNITORE = ?',
    [codice_fornitore]
  );
  // Return the supplier if found, otherwise return null
  return rows.length > 0 ? rows[0] : null;
};

// Update an existing supplier
export const updateFornitore = async (codice_fornitore, custom_data) => {
  // Prepare the set clause for the update query
  const setClause = Object.keys(custom_data)
    .map((key) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(custom_data);
  values.push(codice_fornitore);

  // Prepare the query to update the supplier data
  const query = `
    UPDATE ANAGRAFICA_FORNITORI
    SET ${setClause},
        DATA_ULTIMA_MODIFICA = CURRENT_TIMESTAMP()
    WHERE CODICE_FORNITORE = ?
  `;

  // Execute the update query and return the number of affected rows
  const [result] = await pool.promise().execute(query, values);
  return result.affectedRows;
};

// Delete a supplier by ID
export const deleteFornitore = async (codice_fornitore) => {
  // Prepare the query to delete the supplier with the given supplier code (ID)
  const query = 'DELETE FROM ANAGRAFICA_FORNITORI WHERE CODICE_FORNITORE = ?';
  
  // Execute the delete query and return the number of affected rows
  const [result] = await pool.promise().execute(query, [codice_fornitore]);
  return result.affectedRows;
};