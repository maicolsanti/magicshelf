import {
  getAllClienti,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../models/clientiModel.js';

export const getAll = async (req, res) => {
  try {
    const clienti = await getAllClienti();
    res.json(clienti);
  } catch (error) {
    console.error('Errore durante il recupero dei dati:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const getById = async (req, res) => {
  const { codice_cliente } = req.params;
  try {
    const cliente = await getClienteById(codice_cliente);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente non trovato' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Errore durante il recupero del cliente:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const create = async (req, res) => {
  const { custom_data } = req.body;
  try {
    const id = await createCliente(custom_data);
    res.json({ message: 'Cliente creato con successo', id });
  } catch (error) {
    console.error('Errore durante la creazione del cliente:', error);
    res.status(500).send('Errore interno del server');
  }
};

export const update = async (req, res) => {
  const { codice_cliente } = req.params;
  const { custom_data } = req.body;
  try {
    const rowsAffected = await updateCliente(codice_cliente, custom_data);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Cliente non trovato' });
    }
    res.json({ message: 'Cliente aggiornato correttamente' });
  } catch (error) {
    console.error("Errore durante l'aggiornamento del cliente:", error);
    res.status(500).send('Errore interno del server');
  }
};

export const remove = async (req, res) => {
  const { codice_cliente } = req.params;
  try {
    const rowsAffected = await deleteCliente(codice_cliente);
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Cliente non trovato' });
    }
    res.json({ message: 'Cliente eliminato correttamente' });
  } catch (error) {
    console.error("Errore durante l'eliminazione del cliente:", error);
    res.status(500).send('Errore interno del server');
  }
};
