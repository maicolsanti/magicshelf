import { getAllLocalita, getLocalitaById, getLocalitaByCap, getLocalitaByCapDenominazione } from '../models/localitaModel.js';

export const getAll = async (req, res) => {
  try {
    const localita = await getAllLocalita();
    res.json(localita);
  } catch (error) {
    console.error('Errore durante il recupero delle località:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const getById = async (req, res) => {
  const { codice_istat } = req.params;
  try {
    const localita = await getLocalitaById(codice_istat);
    if (!localita) {
      return res.status(404).json({ message: 'Località non trovata' });
    }
    res.json(localita);
  } catch (error) {
    console.error('Errore durante il recupero della località:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const getByCap = async (req, res) => {
  const { cap } = req.params;
  try {
    const localita = await getLocalitaByCap(cap);
    if (!localita) {
      return res.status(404).json({ message: 'Località non trovata' });
    }
    res.json(localita);
  } catch (error) {
    console.error('Errore durante il recupero della località:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const getByCapDenominazione = async (req, res) => {
  const { cap, denominazione } = req.params;
  try {
    const localita = await getLocalitaByCapDenominazione(cap, denominazione);
    if (!localita) {
      return res.status(404).json({ message: 'Località non trovata' });
    }
    res.json(localita);
  } catch (error) {
    console.error('Errore durante il recupero della località:', error);
    res.status(500).send('Errore interno del server');
  }
};