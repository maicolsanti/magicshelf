import pool from '../config/db.js';

// Get client by email
export const getClienteByEmail = async (email) => {
  // Execute a query to fetch the client with the given email
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_CLIENTI WHERE EMAIL = ?',
    [email]
  );
  // Return the rows if the client exists, otherwise return null
  return rows.length > 0 ? rows : null;
};

// Insert a new client into the database
export const insertCliente = async (req) => {
    // Get the keys and values from the request body
    const fields = Object.keys(req).join(', ');
    const values = Object.values(req);

    // Prepare the query to insert the new client into the database
    const query = `
      INSERT INTO ANAGRAFICA_CLIENTI (${fields})
      VALUES (${values.map(() => '?').join(',')})
    `;

    // Execute the query with the values
    const [result] = await pool.promise().execute(query, values);
    // Return the result of the insertion (e.g., number of affected rows, insertId)
    return result;
};