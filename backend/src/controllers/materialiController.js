import { getMaterialeById, createMateriale, updateMateriale, deleteMateriale } from '../models/materialiModel.js';
import { createMaterialeSchema, updateMaterialeSchema } from '../schemas/materialiSchemas.js';
import { getUser } from '../utils/auth.js';
import multer from 'multer';

const storage = multer.memoryStorage(); // Save image as a buffer in memory
const upload = multer({ storage });

const ROLE_NAME = 'FORNITORE';

export const getById = async (req, res) => {
  const { codice_materiale } = req.params; // Extract the material ID from the request parameters
  try {
    const user = getUser(req, res);

    // Check if the user is logged in
    if (!user) {
      return res.status(401).send('This operation requires you to be logged in');
    }

    // Retrieve the material details from the database
    const materiale = await getMaterialeById(codice_materiale);

    // If no material is found, send a 404 error
    if (!materiale) {
      return res.status(404).send('Material not found');
    }

    // Send the material data as a JSON response
    res.status(200).json(materiale);
  } catch (error) {
    // Log any error that occurs during the retrieval process
    console.error('Error occurred while retrieving the material:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const create = async (req, res) => {
  try {

    // Parse custom_data if it's a string
    if (typeof req.body.custom_data === 'string') {
      req.body.custom_data = JSON.parse(req.body.custom_data);
    }

    // Validate data
    const { error, value } = createMaterialeSchema.validate(req.body.custom_data, { stripUnknown: true });

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
      return res.status(401).send('This operation requires you to be logged in');
    }

    const imageBuffer = req.file?.buffer || null; // Get the image buffer or null if no image is provided

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && value.CODICE_FORNITORE != user.CODICE_FORNITORE) {
      return res.status(403).send('Insufficient permission');
    }

    // Call the model function to create the material
    const id = await createMateriale(value, imageBuffer);

    // Send success response
    res.status(200).json({ message: 'Material successfully created', id });
  } catch (error) {
    console.error('Error occurred while creating the material:', error);

    // Send error response
    res.status(500).send('Internal server error');
  }
};

export const update = async (req, res) => {
  try {

    // Parse custom_data if it's a string
    if (typeof req.body.custom_data === 'string') {
      req.body.custom_data = JSON.parse(req.body.custom_data);
    }

    // Validate data
    const { error, value } = updateMaterialeSchema.validate(req.body.custom_data, { stripUnknown: true });

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
      return res.status(401).send('This operation requires you to be logged in');
    }

    const { codice_materiale } = req.params; // Extract material code from request parameters
    const imageBuffer = req.file?.buffer || null; // Extract image buffer or null if no image is provided
    
    // Retrieve the material details from the database
    const materiale = await getMaterialeById(codice_materiale);

    // If no rows were affected, send a 404 response indicating the material was not found
    if(materiale.length === 0) {
      return res.status(404).send('Material not found');
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && materiale.CODICE_FORNITORE != user.CODICE_FORNITORE) {
      return res.status(403).send('Insufficient permission');
    }

    // Call the model function to update the material
    const affectedRows = await updateMateriale(codice_materiale, value, imageBuffer);

    // If no rows were affected, send a 404 response indicating the material was not found
    if (affectedRows === 0) {
      throw new Error('An error occured during the material update');
    }

    // If the update was successful, send a success message
    res.status(200).json({ message: 'Material successfully updated' });
  } catch (error) {
    console.error('Error occurred while updating the material:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const remove = async (req, res) => {
  const { codice_materiale } = req.params;  // Extract material code from request parameters
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Retrieve the material details from the database
    const materiale = await getMaterialeById(codice_materiale);

    // If no rows were affected, send a 404 response indicating the material was not found
    if (materiale.length === 0) {
      return res.status(404).send('Material not found');
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && materiale.CODICE_FORNITORE != user.CODICE_FORNITORE) {
      return res.status(403).send('Insufficient permission');
    }

    // Attempt to delete the material from the database
    const affectedRows = await deleteMateriale(codice_materiale);

    if (affectedRows === 0) {
      throw new Error('An error occured during deleting the material');
    }

    // If the deletion was successful, send a success message
    res.status(200).json({ message: 'Material successfully deleted' });
  } catch (error) {
    // Log any error that occurs during the deletion process
    console.error('Error occurred while deleting the material:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};