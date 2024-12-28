import { getAllMateriali, getMaterialeById, createMateriale, updateMateriale, deleteMateriale } from '../models/materialiModel.js';

export const getAll = async (req, res) => {
  try {
    const materiali = await getAllMateriali();
    res.json(materiali);
  } catch (error) {
    console.error('Errore durante il recupero dei materiali:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const getById = async (req, res) => {
  const { codice_materiale } = req.params;
  try {
    const materiale = await getMaterialeById(codice_materiale);
    if (!materiale) {
      return res.status(404).json({ message: 'Materiale non trovato' });
    }
    res.json(materiale);
  } catch (error) {
    console.error('Errore durante il recupero del materiale:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const create = async (req, res) => {
  const { custom_data } = req.body;
  try {
    const id = await createMateriale(custom_data);
    res.json({ message: 'Materiale creato con successo', id });
  } catch (error) {
    console.error('Errore durante la creazione del materiale:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const update = async (req, res) => {
  const { codice_materiale } = req.params;
  const { custom_data } = req.body;
  try {
    const affectedRows = await updateMateriale(codice_materiale, custom_data);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Materiale non trovato' });
    }
    res.json({ message: 'Materiale aggiornato correttamente' });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento del materiale:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const deleteById = async (req, res) => {
  const { codice_materiale } = req.params;
  try {
    const affectedRows = await deleteMateriale(codice_materiale);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Materiale non trovato' });
    }
    res.json({ message: 'Materiale eliminato correttamente' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione del materiale:', error);
    res.status(500).send('Errore interno del server');
  }
};
