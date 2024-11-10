import express, { json } from 'express';
import clienti from './routes/clienti.js'
import fornitori from './routes/fornitori.js'
import materiali from './routes/materiali.js';
import situazione_materiali from './routes/situazione-materiali.js';

const app = express();
const port = 3000;

// Middleware per parsare il corpo delle richieste JSON
app.use(json());

// Monta i vari router
app.use('/api/clienti', clienti);
app.use('/api/fornitori', fornitori);
app.use('/api/materiali', materiali);
app.use('/api/situazione-materiali', situazione_materiali);

app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});