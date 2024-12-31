import {
  getAllFornitori,
  getFornitoreById,
  createFornitore,
  updateFornitore,
  deleteFornitore,
} from '../models/fornitoriModel.js';

export const getAll = async (req, res) => {
  try {
    const fornitori = await getAllFornitori();
    res.json(fornitori);
  } catch (error) {
    console.error('Errore durante il recupero dei dati:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const getById = async (req, res) => {
  const { codice_fornitore } = req.params;
  try {
    const fornitore = await getFornitoreById(codice_fornitore);
    if (!fornitore) {
      return res.status(404).json({ message: 'Fornitore non trovato' });
    }
    res.json(fornitore);
  } catch (error) {
    console.error('Errore durante il recupero del fornitore:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const create = async (req, res) => {
  const { custom_data } = req.body;
  try {
    const id = await createFornitore(custom_data);
    res.json({ message: 'Fornitore creato con successo', id });
  } catch (error) {
    console.error('Errore durante la creazione del fornitore:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const update = async (req, res) => {
  const { codice_fornitore } = req.params;
  const { custom_data } = req.body;
  try {
    const rowsAffected = await updateFornitore(codice_fornitore, custom_data);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Fornitore non trovato' });
    }
    res.json({ message: 'Fornitore aggiornato correttamente' });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del fornitore:", error);
    res.status(500).send('Errore interno del server');
  }
};

export const remove = async (req, res) => {
  const { codice_fornitore } = req.params;
  try {
    const rowsAffected = await deleteFornitore(codice_fornitore);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Fornitore non trovato' });
    }
    res.json({ message: 'Fornitore eliminato correttamente' });
  } catch (error) {
    console.error("Errore durante l'eliminazione del fornitore:", error);
    res.status(500).send('Errore interno del server');
  }
};
