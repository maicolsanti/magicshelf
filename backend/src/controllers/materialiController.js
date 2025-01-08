import { getAllMateriali, getMaterialeById, createMateriale, updateMateriale, deleteMateriale } from '../models/materialiModel.js';
import { getUser } from '../utils/auth.js';

export const getAll = async (req, res) => {
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Retrieve all materials from the database
    const materiali = await getAllMateriali();

    // Send the retrieved materials as a JSON response
    res.status(200).json(materiali);
  } catch (error) {
    // Log any error that occurs during the retrieval process
    console.error('Error occurred while retrieving materials:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const getById = async (req, res) => {
  const { codice_materiale } = req.params;  // Extract the material ID from the request parameters
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
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
  const { custom_data } = req.body;  // Extract custom data from the request body
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Attempt to create the material in the database
    const id = await createMateriale(custom_data);

    // If successful, send a response with the success message and the newly created material's ID
    res.status(200).json({ message: 'Material successfully created', id });
  } catch (error) {
    // Log any error that occurs during the creation process
    console.error('Error occurred while creating the material:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const update = async (req, res) => {
  const { codice_materiale } = req.params;  // Extract material code from request parameters
  const { custom_data } = req.body;         // Extract custom data from request body
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Attempt to update the material in the database
    const affectedRows = await updateMateriale(codice_materiale, custom_data);

    // If no rows were affected, send a 404 response indicating the material was not found
    if (affectedRows === 0) {
      return res.status(404).send('Material not found');
    }

    // If the update was successful, send a success message
    res.status(200).json({ message: 'Material successfully updated' });
  } catch (error) {
    // Log any error that occurs during the update process
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

    // Attempt to delete the material from the database
    const affectedRows = await deleteMateriale(codice_materiale);

    // If no rows were affected, send a 404 response indicating the material was not found
    if (affectedRows === 0) {
      return res.status(404).send('Material not found');
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