import mysql from 'mysql2';
import dotenv from 'dotenv';

// load env variable from file .env
dotenv.config();

// Configurazione della connessione al database
const connection = mysql.createConnection({
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

// Check connection
connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione al database:', err.stack);
    return;
  }
  console.log('Connesso al database MySQL.');
});

export default connection;