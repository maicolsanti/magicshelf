import pool from '../config/db.js';

// Get all clients
export const getAllClienti = async () => {
  // Execute a query to fetch all clients
  const [rows] = await pool.promise().query('SELECT * FROM ANAGRAFICA_CLIENTI');
  return rows;
};

// Get client by ID
export const getClienteById = async (codice_cliente) => {
  // Execute a query to fetch the client with the given client code (ID)
  const [rows] = await pool.promise().execute(
    'SELECT * FROM ANAGRAFICA_CLIENTI WHERE CODICE_CLIENTE = ?',
    [codice_cliente]
  );
  // Return the client if found, otherwise return null
  return rows.length > 0 ? rows[0] : null;
};

// Update an existing client
export const updateCliente = async (codice_cliente, custom_data) => {
  // Prepare the set clause for the update query
  const setClause = Object.keys(custom_data)
    .map((key) => `\`${key}\` = ?`)
    .join(', ');
  const values = Object.values(custom_data);
  values.push(codice_cliente);

  // Prepare the query to update the client data
  const query = `
    UPDATE ANAGRAFICA_CLIENTI
    SET ${setClause},
        DATA_ULTIMA_MODIFICA = CURRENT_TIMESTAMP()
    WHERE CODICE_CLIENTE = ?
  `;

  console.log(query);

  // Execute the update query and return the number of affected rows
  const [result] = await pool.promise().execute(query, values);
  return result.affectedRows;
};

// Delete a client by ID
export const deleteCliente = async (codice_cliente) => {
  // Prepare the query to delete the client with the given client code (ID)
  const query = 'DELETE FROM ANAGRAFICA_CLIENTI WHERE CODICE_CLIENTE = ?';
  
  // Execute the delete query and return the number of affected rows
  const [result] = await pool.promise().execute(query, [codice_cliente]);
  return result.affectedRows;
};