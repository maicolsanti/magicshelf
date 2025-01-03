import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import cookieParser from 'cookie-parser'
import clientiRoutes from './routes/clientiRoutes.js';
import fornitoriRoutes from './routes/fornitoriRoutes.js';
import localitaRoutes from './routes/localitaRoutes.js';
import materialeRoutes from './routes/materialiRoutes.js';
import situazioneMaterialeRoutes from './routes/situazione-materialiRoutes.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import authClientiRoutes from './routes/authClientiRoutes.js';
import authFornitoriRoutes from './routes/authFornitoriRoutes.js';
import authGeneralRoutes from './routes/authGeneralRoutes.js';
import MaterialiFornitoriRoutes from './routes/materiali-fornitoriRoutes.js';

// Load environment variables from the .env file
dotenv.config();

const app = express(); // Create an Express application instance
const PORT = process.env.PORT || 3000; // Define the port to listen on

// Middleware to parse JSON in request bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

// Swagger route for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define API routes
app.use('/api/clienti', clientiRoutes); // Routes for client management
app.use('/api/fornitori', fornitoriRoutes); // Routes for supplier management
app.use('/api/localita', localitaRoutes); // Routes for managing locations
app.use('/api/materiali', materialeRoutes); // Routes for material management
app.use('/api/situazione-materiali', situazioneMaterialeRoutes); // Routes for tracking material situations
app.use('/api/materiali-fornitori', MaterialiFornitoriRoutes); // Routes for supplier materials
app.use('/api/auth/clienti', authClientiRoutes); // Authentication routes for clients
app.use('/api/auth/fornitori', authFornitoriRoutes); // Authentication routes for suppliers
app.use('/api/auth/general', authGeneralRoutes); // Authentication general routes

// Middleware to handle 404 errors for undefined routes
app.use(notFoundHandler);

// Start the server and listen on the defined port
app.listen(PORT, () => {
  console.log(`🚀 Server is running and listening on http://localhost:${PORT}`);
  console.log(`📖 Swagger documentation available at http://localhost:${PORT}/api-docs`);
});