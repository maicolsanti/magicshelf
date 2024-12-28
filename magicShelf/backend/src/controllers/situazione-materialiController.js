import { getAllSituazioni, getSituazioneById, createSituazione, updateSituazione, deleteSituazione } from '../models/situazione-materialiModel.js';

export const getAll = async (req, res) => {
  try {
    const situazioni = await getAllSituazioni();
    res.json(situazioni);
  } catch (error) {
    console.error('Errore durante il recupero delle situazioni dei materiali:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const getById = async (req, res) => {
  const { codice_materiale } = req.params;
  try {
    const situazione = await getSituazioneById(codice_materiale);
    if (!situazione) {
      return res.status(404).json({ message: 'Materiale non trovato' });
    }
    res.json(situazione);
  } catch (error) {
    console.error('Errore durante il recupero della situazione del materiale:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const create = async (req, res) => {
  const { custom_data } = req.body;
  try {
    const id = await createSituazione(custom_data);
    res.json({ message: 'Situazione del materiale creata con successo', id });
  } catch (error) {
    console.error('Errore durante la creazione della situazione del materiale:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const update = async (req, res) => {
  const { codice_materiale } = req.params;
  const { custom_data } = req.body;
  try {
    const affectedRows = await updateSituazione(codice_materiale, custom_data);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Materiale non trovato' });
    }
    res.json({ message: 'Situazione del materiale aggiornata correttamente' });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento della situazione del materiale:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const deleteById = async (req, res) => {
  const { codice_materiale } = req.params;
  try {
    const affectedRows = await deleteSituazione(codice_materiale);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Materiale non trovato' });
    }
    res.json({ message: 'Situazione del materiale eliminata correttamente' });
  } catch (error) {
    console.error('Errore durante l\'eliminazione della situazione del materiale:', error);
    res.status(500).send('Errore interno del server');
  }
};
