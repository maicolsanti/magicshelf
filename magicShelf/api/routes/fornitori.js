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



// Endpoint GET per recuperare tutti i dati di tutti i fornitori
router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM ANAGRAFICA_FORNITORI');
      res.json(rows);
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
      res.status(500).send('Errore interno del server');
    }
});

// Endpoint GET per recuperare tutti i dati di un fornitore specifico
router.get('/:codice_fornitore', async (req, res) => {
    const { codice_fornitore } = req.params;
  
    try {
      const [rows] = await pool.execute('SELECT * FROM ANAGRAFICA_FORNITORI WHERE CODICE_FORNITORE = ?', [codice_fornitore]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Fornitore non trovato' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Errore durante il recupero del fornitore:', error);
      res.status(500).send('Errore interno del server');
    }
});



// POST



// Endpoint POST per creare un nuovo fornitore
router.post('/', async (req, res) => {
    const { custom_data } = req.body;
  
    // Costruisci la query SQL in modo dinamico per gestire tutti i campi
    const fields = Object.keys(custom_data).map(key => `\`${key}\` = ?`).join(', ');
    const values = Object.values(custom_data);
  
    const query = `
      INSERT INTO ANAGRAFICA_FORNITORI (${fields})
      VALUES (${values.map(() => '?').join(',')})
    `;
  
    try {
      const [result] = await pool.execute(query, values);
      res.json({ message: 'Fornitore creato con successo', id: result.insertId });
    } catch (error) {
      console.error('Errore durante la creazione del fornitore:', error);
      res.status(500).send('Errore interno del server');
    }
});



// PUT



// Endpoint PUT per modificare i dati di un fornitore
router.put('/:codice_fornitore', async (req, res) => {
    const codice_fornitore = req.params.codice_fornitore;
    const { custom_data } = req.body;
  
    // Costruisci la query SQL per aggiornare i dati
    const setClause = Object.keys(custom_data).map(key => `\`${key}\` = ?`).join(', ');
    const values = Object.values(custom_data);
    values.push(codice_fornitore); // Aggiungi il codice fornitore alla fine dei valori
  
    const query = `
      UPDATE ANAGRAFICA_FORNITORI
      SET ${setClause}
      WHERE CODICE_FORNITORE = ?
    `;
  
    try {
      const [result] = await pool.execute(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Fornitore non trovato' });
      }
  
      res.json({ message: 'Fornitore aggiornato correttamente' });
    } catch (error) {
      console.error("Errore durante l'aggiornamento del fornitore:", error);
      res.status(500).send('Errore interno del server');
    }
});



// DELETE



// Endpoint DELETE per eliminare un fornitore
router.delete('/:codice_fornitore', async (req, res) => {
    const codice_fornitore = req.params.codice_fornitore;
  
    const query = 'DELETE FROM ANAGRAFICA_FORNITORI WHERE CODICE_FORNITORE = ?';
  
    try {
      const [result] = await pool.execute(query, [codice_fornitore]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Fornitore non trovato' });
      }
  
      res.json({ message: 'Fornitore eliminato correttamente' });
    } catch (error) {
      console.error("Errore durante l'eliminazione del cliente:", error);
      res.status(500).send('Errore interno del server');
    }
  });
  
  export default router;