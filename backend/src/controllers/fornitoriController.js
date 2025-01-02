import {
  getAllFornitori,
  getFornitoreById,
  createFornitore,
  updateFornitore,
  deleteFornitore,
} from '../models/fornitoriModel.js';

export const getAll = async (req, res) => {
  try {
    // Attempt to retrieve all suppliers from the database
    const fornitori = await getAllFornitori();
    
    // Respond with the list of suppliers in JSON format
    res.json(fornitori);
  } catch (error) {
    // Log the error and respond with a 500 Internal Server Error
    console.error('Error retrieving suppliers:', error);
    res.status(500).send('Internal server error');
  }
};

export const getById = async (req, res) => {
  const { codice_fornitore } = req.params;
  try {
    // Attempt to retrieve the supplier by their unique ID
    const fornitore = await getFornitoreById(codice_fornitore);

    // If the supplier is not found, return a 404 error
    if (!fornitore) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Return the supplier data as a JSON response
    res.json(fornitore);
  } catch (error) {
    // Log the error and respond with a 500 Internal Server Error
    console.error('Error retrieving supplier:', error);
    res.status(500).send('Internal server error');
  }
};

export const create = async (req, res) => {
  const { custom_data } = req.body;  // Extract custom data from the request body
  try {
    // Attempt to create a new supplier in the database
    const id = await createFornitore(custom_data);
    
    // Return a success message and the new supplier's ID
    res.json({ message: 'Supplier successfully created', id });
  } catch (error) {
    // Log any error that occurs during the creation process
    console.error('Error occurred while creating supplier:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const update = async (req, res) => {
  const { codice_fornitore } = req.params;  // Extract the supplier's ID from the route parameters
  const { custom_data } = req.body;  // Extract the updated data from the request body
  try {
    // Attempt to update the supplier in the database
    const rowsAffected = await updateFornitore(codice_fornitore, custom_data);

    // If no rows were affected, return a 404 error indicating the supplier was not found
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Return a success message if the supplier was updated
    res.json({ message: 'Supplier successfully updated' });
  } catch (error) {
    // Log any error that occurs during the update process
    console.error('Error occurred while updating supplier:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};

export const remove = async (req, res) => {
  const { codice_fornitore } = req.params;  // Extract the supplier's ID from the route parameters
  try {
    // Attempt to delete the supplier from the database
    const rowsAffected = await deleteFornitore(codice_fornitore);

    // If no rows were affected, return a 404 error indicating the supplier was not found
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Return a success message if the supplier was successfully deleted
    res.json({ message: 'Supplier successfully removed' });
  } catch (error) {
    // Log any error that occurs during the removal process
    console.error('Error occurred while removing supplier:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};