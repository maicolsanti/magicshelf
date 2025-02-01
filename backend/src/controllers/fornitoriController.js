import {
  updateFornitore,
  deleteFornitore,
} from '../models/fornitoriModel.js';
import {
  getUser
} from '../utils/auth.js';
import {
  updateSchema
} from '../schemas/fornitoriSchemas.js'

const ROLE_NAME = 'FORNITORE';

export const update = async (req, res) => {
  const { codice_fornitore } = req.params;  // Extract the supplier's ID from the route parameters

  try {

    // Validate data
    const { error, value } = updateSchema.validate(req.body.custom_data, { stripUnknown: true });

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

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && codice_fornitore != user.CODICE_FORNITORE) {
      return res.status(403).send('Insufficient permission');
    }

    // Attempt to update the supplier in the database
    const rowsAffected = await updateFornitore(codice_fornitore, value);

    // If no rows were affected, return a 404 error indicating the supplier was not found
    if (rowsAffected === 0) {
      return res.status(404).send('Supplier not found');
    }

    // Return a success message if the supplier was updated
    res.status(200).json({ message: 'Supplier successfully updated' });
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
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Check if the user role is supplier and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && codice_fornitore != user.CODICE_FORNITORE) {
      return res.status(403).send('Insufficient permission');
    }

    // Attempt to delete the supplier from the database
    const rowsAffected = await deleteFornitore(codice_fornitore);

    // If no rows were affected, return a 404 error indicating the supplier was not found
    if (rowsAffected === 0) {
      return res.status(404).send('Supplier not found');
    }

    // Return a success message if the supplier was successfully deleted
    res.status(200).json({ message: 'Supplier successfully removed' });
  } catch (error) {
    // Log any error that occurs during the removal process
    console.error('Error occurred while removing supplier:', error);

    // Send a generic error message to the client
    res.status(500).send('Internal server error');
  }
};