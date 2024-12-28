import mysql from 'mysql2';
import dotenv from 'dotenv';

// load env variable from file .env
dotenv.config();

// Configurazione della connessione al database
const pool = mysql.createPool({
  // eslint-disable-next-line no-undef
  host: process.env.DB_HOST, // Host
  // eslint-disable-next-line no-undef
  user: process.env.DB_USER, // User
  // eslint-disable-next-line no-undef
  password: process.env.DB_PASSWORD, // Pwd
  // eslint-disable-next-line no-undef
  database: process.env.DB_NAME, // DBname
  // eslint-disable-next-line no-undef
  port: process.env.DB_PORT || 3306 // DBport
});

// Verifica della connessione usando getConnection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Errore nella connessione al database:', err);
    // eslint-disable-next-line no-undef
    process.exit(1);  // Esci con errore se la connessione fallisce
  } else {
    console.log('Connessione al database riuscita!');
    connection.release();  // Rilascia la connessione
  }
});

export default pool;