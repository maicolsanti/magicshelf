import { getAllLocalita, getLocalitaById, getLocalitaByCap, getLocalitaByCapDenominazione } from '../models/localitaModel.js';

export const getAll = async (req, res) => {
  try {

    // Fetch all locations from the database
    const localita = await getAllLocalita();

    // Send the retrieved locations as a JSON response
    res.status(200).json(localita);
  } catch (error) {
    // Log any error that occurs during the data retrieval process
    console.error('Error occurred while retrieving locations:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const getById = async (req, res) => {
  // Extract the 'codice_istat' parameter from the request
  const { codice_istat } = req.params;

  try {

    // Fetch the location by its 'codice_istat'
    const localita = await getLocalitaById(codice_istat);

    // If the location is not found, return a 404 response
    if (!localita) {
      return res.status(404).send('Location not found');
    }

    // If the location is found, send it back in the response
    res.status(200).json(localita);
  } catch (error) {
    // Log any error that occurs during the data retrieval process
    console.error('Error occurred while retrieving the location:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const getByCap = async (req, res) => {
  // Extract the 'cap' parameter from the request
  const { cap } = req.params;

  try {

    // Fetch the location by its postal code (CAP)
    const localita = await getLocalitaByCap(cap);

    // If the location is not found, return a 404 response
    if (!localita) {
      return res.status(404).json('Location not found');
    }

    // If the location is found, send it back in the response
    res.json(localita);
  } catch (error) {
    // Log any error that occurs during the data retrieval process
    console.error('Error occurred while retrieving the location:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const getByCapDenominazione = async (req, res) => {
  // Extract the 'cap' and 'denominazione' parameters from the request
  const { cap, denominazione } = req.params;

  try {

    // Fetch the location using the postal code (CAP) and denomination
    const localita = await getLocalitaByCapDenominazione(cap, denominazione);

    // If the location is not found, return a 404 response
    if (!localita) {
      return res.status(404).send('Location not found');
    }

    // If the location is found, send it back in the response
    res.status(200).json(localita);
  } catch (error) {
    // Log any error that occurs during the data retrieval process
    console.error('Error occurred while retrieving the location:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};