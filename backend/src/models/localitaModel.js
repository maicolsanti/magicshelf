import pool from '../config/db.js';

// Get all locations
export const getAllLocalita = async () => {
  // Execute a query to fetch all locations from the database
  const [rows] = await pool.promise().query('SELECT * FROM LOCALITA');
  return rows;
};

// Get location by ISTAT code
export const getLocalitaById = async (codice_istat) => {
  // Execute a query to fetch the location by ISTAT code
  const [rows] = await pool.promise().execute(
    'SELECT * FROM LOCALITA WHERE CODICE_ISTAT = ?',
    [codice_istat]
  );
  // Return the location if found, otherwise return null
  return rows.length > 0 ? rows[0] : null;
};

// Get location by CAP code
export const getLocalitaByCap = async (cap) => {
  // Execute a query to fetch the location by CAP code
  const [rows] = await pool.promise().execute(
    'SELECT * FROM LOCALITA WHERE CAP = ?',
    [cap]
  );
  return rows;
};

// Get location by name
export const getLocalitaByDenominazione = async (denominazione) => {
  // Execute a query to fetch the location by CAP code
  const [rows] = await pool.promise().execute(
    'SELECT * FROM LOCALITA WHERE DENOMINAZIONE_LOCALITA = ?',
    [denominazione]
  );
  return rows;
};

// Get location by CAP and name
export const getLocalitaByCapDenominazione = async (cap, denominazione) => {
  // Execute a query to fetch the location by both CAP and location name
  const [rows] = await pool.promise().execute(
    'SELECT * FROM LOCALITA WHERE CAP = ? AND DENOMINAZIONE_LOCALITA = ?',
    [cap, denominazione]
  );
  // Return the first result
  return rows[0];
};