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
import MaterialiFornitoriRoutes from './routes/materiali-fornitoriRoutes.js';

// Carica le variabili d'ambiente
dotenv.config();

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotte
app.use('/api/clienti', clientiRoutes);
app.use('/api/fornitori', fornitoriRoutes);
app.use('/api/localita', localitaRoutes);
app.use('/api/materiali', materialeRoutes);
app.use('/api/situazione-materiali', situazioneMaterialeRoutes);
app.use('/api/materiali-fornitori', MaterialiFornitoriRoutes);
app.use('/api/auth/clienti', authClientiRoutes);
app.use('/api/auth/fornitori', authFornitoriRoutes);

// Middleware per gestire le rotte non trovate (404)
app.use(notFoundHandler);

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server avviato su http://localhost:${PORT}`);
  console.log(`Documentazione Swagger disponibile su http://localhost:${PORT}/api-docs`);
});