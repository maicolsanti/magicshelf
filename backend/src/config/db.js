import mysql from 'mysql2';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

// Database configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Database host address
  user: process.env.DB_USER, // Database username
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Name of the database
  port: process.env.DB_PORT || 3306 // Database port, defaulting to 3306 if not specified
});

// Check database connection
pool.getConnection((err, connection) => {
  if (err) {
    // Log an error message and terminate the process if the connection fails
    console.error('Failed to connect to the database. Error details:', err);
    process.exit(1);  // Exit the application with a failure code
  } else {
    // Log a success message if the connection is successful
    console.log(`Connected to the database successfully. Host: ${process.env.DB_HOST}, Database: ${process.env.DB_NAME}`);
    connection.release();  // Release the connection back to the pool
  }
});

// Export the database connection pool for use in other modules
export default pool;