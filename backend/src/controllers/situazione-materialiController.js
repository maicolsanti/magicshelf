import { getSituazioneById, createSituazione, updateSituazione, deleteSituazione } from '../models/situazione-materialiModel.js';
import { getMaterialeById } from '../models/materialiModel.js';
import { situazioneMaterialiSchema } from '../schemas/situazione-materialiSchemas.js';
import { getUser } from '../utils/auth.js';

const ROLE_NAME = 'FORNITORE';

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
  
  try {

    let body;
    // Validate data
    const { error, value } = situazioneMaterialiSchema.validate(req.body.custom_data, { stripUnknown: true });

    if (error) {
        // If validation error
        return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
        });
    }

    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Retrieve the material details from the database
    const materiale = await getMaterialeById(value.CODICE_MATERIALE);

    if (materiale.length === 0) {
      res.status(404).send('Material not found');
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && materiale.CODICE_FORNITORE != user.CODICE_FORNITORE) {
      return res.status(403).send('Insufficient permission');
    }

    // Create the material situation in the database
    const id = await createSituazione(value);
    
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

  try {

    let body;
    // Validate data
    const { error, value } = situazioneMaterialiSchema.validate(req.body.custom_data, { stripUnknown: true });

    if (error) {
        // If validation error
        return res.status(400).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
        });
    }

    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Retrieve the material details from the database
    const materiale = await getMaterialeById(codice_materiale);

    // If no rows are affected, the material is not found
    if (materiale.length === 0) {
      res.status(404).send('Material not found');
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && materiale.CODICE_FORNITORE != user.CODICE_FORNITORE) {
      return res.status(403).send('Insufficient permission');
    }

    // Update the material situation in the database
    const affectedRows = await updateSituazione(codice_materiale, value);
    
    // If no rows are affected, the material is not found
    if (affectedRows === 0) {
      throw new Error('An error occured during updating the material situation');
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

    // Retrieve the material details from the database
    const materiale = await getMaterialeById(codice_materiale);

    // If no rows are affected, the material is not found
    if (materiale.length === 0) {
      res.status(404).send('Material not found');
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && materiale.CODICE_FORNITORE != user.CODICE_FORNITORE) {
      return res.status(403).send('Insufficient permission');
    }

    // Remove the material situation from the database
    const affectedRows = await deleteSituazione(codice_materiale);
    
    if (affectedRows === 0) {
      throw new Error('An error occured during deleting the material situation');
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