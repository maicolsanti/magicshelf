import pool from '../config/db.js';

// Get supplier by codice_fiscale
export const getFornitoreByEmail = async (codice_fiscale) => {
  // Execute a query to fetch the supplier with the given fiscal code
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_FORNITORI WHERE CODICE_FISCALE = ?',
    [codice_fiscale]
  );
  // Return the rows if the supplier exists, otherwise return null
  return rows.length > 0 ? rows : null;
};

// Insert a new supplier into the database
export const insertFornitore = async (req) => {
    // Get the keys and values from the request body
    const fields = Object.keys(req).join(', ');
    const values = Object.values(req);

    // Prepare the query to insert the new supplier into the database
    for (let i = 0; i < fields.length; i++) {
      if (typeof values[i] === 'object') {
        console.log(JSON.stringify(fields[i]) + JSON.stringify(values[i]));
      }
    }
  

    const query = `
      INSERT INTO ANAGRAFICA_FORNITORI (${fields})
      VALUES (${values.map(() => '?').join(',')})
    `;

    // Execute the query with the values
    const [result] = await pool.promise().execute(query, values);
    // Return the result of the insertion (e.g., number of affected rows, insertId)
    return result;
};