import { Router } from 'express';
import { createPool } from 'mysql2/promise';

const router = Router();

// Database config
const pool = createPool({
  host: 'localhost',
  user: 'admin',
  password: 'zaq23edx',
  database: 'magicshelf'
});



// GET



// Endpoint GET per recuperare tutti i dati di tutti i clienti
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM ANAGRAFICA_CLIENTI');
    res.json(rows);
  } catch (error) {
    console.error('Errore durante il recupero dei dati:', error);
    res.status(500).send('Errore interno del server');
  }
});

// Endpoint GET per recuperare tutti i dati di un cliente specifico
router.get('/:codice_cliente', async (req, res) => {
  const { codice_cliente } = req.params;

  try {
    const [rows] = await pool.execute('SELECT * FROM ANAGRAFICA_CLIENTI WHERE CODICE_CLIENTE = ?', [codice_cliente]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Cliente non trovato' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Errore durante il recupero del cliente:', error);
    res.status(500).send('Errore interno del server');
  }
});



// POST



// Endpoint POST per creare un nuovo cliente
router.post('/', async (req, res) => {
  const { custom_data } = req.body;

  // Costruisci la query SQL in modo dinamico per gestire tutti i campi
  const fields = Object.keys(custom_data).map(key => `\`${key}\` = ?`).join(', ');
  const values = Object.values(custom_data);

  const query = `
    INSERT INTO ANAGRAFICA_CLIENTI (${fields})
    VALUES (${values.map(() => '?').join(',')})
  `;

  try {
    const [result] = await pool.execute(query, values);
    res.json({ message: 'Cliente creato con successo', id: result.insertId });
  } catch (error) {
    console.error('Errore durante la creazione del cliente:', error);
    res.status(500).send('Errore interno del server');
  }
});



// PUT



// Endpoint PUT per modificare i dati di un cliente
router.put('/:codice_cliente', async (req, res) => {
  const codice_cliente = req.params.codice_cliente;
  const { custom_data } = req.body;

  // Costruisci la query SQL per aggiornare i dati
  const setClause = Object.keys(custom_data).map(key => `\`${key}\` = ?`).join(', ');
  const values = Object.values(custom_data);
  values.push(codice_cliente); // Aggiungi il codice cliente alla fine dei valori

  const query = `
    UPDATE ANAGRAFICA_CLIENTI
    SET ${setClause}
    WHERE CODICE_CLIENTE = ?
  `;

  try {
    const [result] = await pool.execute(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente non trovato' });
    }

    res.json({ message: 'Cliente aggiornato correttamente' });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del cliente:", error);
    res.status(500).send('Errore interno del server');
  }
});



// DELETE



// Endpoint DELETE per eliminare un cliente
router.delete('/:codice_cliente', async (req, res) => {
  const codice_cliente = req.params.codice_cliente;

  const query = 'DELETE FROM ANAGRAFICA_CLIENTI WHERE CODICE_CLIENTE = ?';

  try {
    const [result] = await pool.execute(query, [codice_cliente]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente non trovato' });
    }

    res.json({ message: 'Cliente eliminato correttamente' });
  } catch (error) {
    console.error("Errore durante l'eliminazione del cliente:", error);
    res.status(500).send('Errore interno del server');
  }
});

export default router;