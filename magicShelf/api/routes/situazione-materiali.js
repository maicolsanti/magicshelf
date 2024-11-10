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



// Endpoint GET per recuperare tutti i dati di tutti i materiali
router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM SITUAZIONE_MATERIALI');
      res.json(rows);
    } catch (error) {
      console.error('Errore durante il recupero dei dati:', error);
      res.status(500).send('Errore interno del server');
    }
});

// Endpoint GET per recuperare tutti i dati di un materiale specifico
router.get('/:codice_materiale', async (req, res) => {
    const { codice_materiale } = req.params;
  
    try {
      const [rows] = await pool.execute('SELECT * FROM SITUAZIONE_MATERIALI WHERE CODICE_MATERIALE = ?', [codice_materiale]);
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Materiale non trovato' });
      }
  
      res.json(rows[0]);
    } catch (error) {
      console.error('Errore durante il recupero del materiale:', error);
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
      INSERT INTO SITUAZIONE_MATERIALI (${fields})
      VALUES (${values.map(() => '?').join(',')})
    `;
  
    try {
      const [result] = await pool.execute(query, values);
      res.json({ message: 'Materiale creato con successo', id: result.insertId });
    } catch (error) {
      console.error('Errore durante la creazione del materiale:', error);
      res.status(500).send('Errore interno del server');
    }
});



// PUT



// Endpoint PUT per modificare i dati di un materiale
router.put('/:codice_materiale', async (req, res) => {
  const codice_materiale = req.params.codice_materiale;
  const { custom_data } = req.body;

  // Costruisci la query SQL per aggiornare i dati
  const setClause = Object.keys(custom_data).map(key => `\`${key}\` = ?`).join(', ');
  const values = Object.values(custom_data);
  values.push(codice_materiale); // Aggiungi il codice materiale alla fine dei valori

  const query = `
    UPDATE SITUAZIONE_MATERIALI
    SET ${setClause}
    WHERE CODICE_MATERIALE = ?
  `;

  try {
    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Materiale non trovato' });
    }

    res.json({ message: 'Materiale aggiornato correttamente' });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del materiale:", error);
    res.status(500).send('Errore interno del server');
  }
});



// DELETE



// Endpoint DELETE per eliminare un materiale
router.delete('/:codice_materiale', async (req, res) => {
  const codice_materiale = req.params.codice_materiale;

  const query = 'DELETE FROM SITUAZIONE_MATERIALI WHERE CODICE_MATERIALE = ?';

  try {
    const [result] = await pool.execute(query, [codice_materiale]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Materiale non trovato' });
    }

    res.json({ message: 'Materiale eliminato correttamente' });
  } catch (error) {
    console.error("Errore durante l'eliminazione del materiale:", error);
    res.status(500).send('Errore interno del server');
  }
});

export default router;