import { getAllSituazioni, getSituazioneById, createSituazione, updateSituazione, deleteSituazione } from '../models/situazione-materialiModel.js';
import { getUser } from '../utils/auth.js';

ROLE_NAME = 'FORNITORE';

export const getAll = async (req, res) => {
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Fetch all material situations from the database
    const situazioni = await getAllSituazioni();
    
    // Return the fetched data as JSON
    res.status(200).json(situazioni);
  } catch (error) {
    // Log any error that occurs during data retrieval
    console.error('Error occurred while retrieving material situations:', error);
    
    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const getById = async (req, res) => {
  const { codice_materiale } = req.params;
  
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Fetch material situation by its ID from the database
    const situazione = await getSituazioneById(codice_materiale);
    
    // If the material situation is not found, return a 404 error
    if (!situazione) {
      return res.status(404).send('Material situation not found');
    }
    
    // Return the found material situation as JSON
    res.status(200).json(situazione);
  } catch (error) {
    // Log any error that occurs during the retrieval
    console.error('Error occurred while retrieving material situation:', error);
    
    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const create = async (req, res) => {
  const { custom_data } = req.body;
  
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && custom_data.codice_fornitore == user.codice_fornitore) {
      return res.status(403).send('Insufficient permission');
    }

    // Create the material situation in the database
    const id = await createSituazione(custom_data);
    
    // Return success message with the ID of the newly created situation
    res.status(200).json({ message: 'Material situation successfully created', id });
  } catch (error) {
    // Log any error that occurs during the creation process
    console.error('Error occurred while creating material situation:', error);
    
    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const update = async (req, res) => {
  const { codice_materiale } = req.params;
  const { custom_data } = req.body;

  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && custom_data.codice_fornitore == user.codice_fornitore) {
      return res.status(403).send('Insufficient permission');
    }

    // Update the material situation in the database
    const affectedRows = await updateSituazione(codice_materiale, custom_data);
    
    // If no rows are affected, the material is not found
    if (affectedRows === 0) {
      return res.status(404).send('Material not found');
    }

    // Return success message after updating the material situation
    res.status(200).json({ message: 'Material situation successfully updated' });
  } catch (error) {
    // Log any error that occurs during the update process
    console.error('Error occurred while updating material situation:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const remove = async (req, res) => {
  const { codice_materiale } = req.params;

  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && custom_data.codice_fornitore == user.codice_fornitore) {
      return res.status(403).send('Insufficient permission');
    }

    // Remove the material situation from the database
    const affectedRows = await deleteSituazione(codice_materiale);
    
    // If no rows are affected, the material is not found
    if (affectedRows === 0) {
      return res.status(404).send('Material not found');
    }

    // Return success message after deleting the material situation
    res.status(200).json({ message: 'Material situation successfully deleted' });
  } catch (error) {
    // Log any error that occurs during the removal process
    console.error('Error occurred while deleting material situation:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};