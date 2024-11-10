import { Router } from 'express';
import { createPool } from 'mysql2/promise';

const router = Router();

// Configura la connessione al database (sostituisci con i tuoi dati)
const pool = createPool({
  host: 'localhost',
  user: 'admin',
  password: 'zaq23edx',
  database: 'magicshelf'
});



// GET



// Endpoint GET per recuperare tutti i dati di tutte le località
router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM LOCALITA');
      res.json(rows);
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
      res.status(500).send('Errore interno del server');
    }
});

// Endpoint GET per recuperare tutti i dati di una località
router.get('/:codice_istat', async (req, res) => {
    const { codice_materiale } = req.params;
  
    try {
      const [rows] = await pool.execute('SELECT * FROM LOCALITA WHERE CODICE_ISTAT = ?', [codice_materiale]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Località non trovata' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Errore durante il recupero della località:', error);
      res.status(500).send('Errore interno del server');
    }
});

export default router;