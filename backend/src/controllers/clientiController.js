import {
  updateCliente,
  deleteCliente,
} from '../models/clientiModel.js';
import {
  getUser
} from '../utils/auth.js';
import {
  updateSchema
} from '../schemas/clientiSchemas.js';

const ROLE_NAME = 'CLIENTE';

export const update = async (req, res) => {
  const { codice_cliente } = req.params;  // Extract the client ID from the URL parameters

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
    if(ROLE_NAME != user.ROLE_NAME && codice_cliente != user.CODICE_CLIENTE) {
      return res.status(403).send('Insufficient permission');
    }

    // Update the client data based on the provided client ID and custom data
    const rowsAffected = await updateCliente(codice_cliente, value);

    // If no rows were affected, return a 404 Not Found error with a message
    if (rowsAffected === 0) {
      return res.status(404).send('Client not found');
    }

    // Respond with a success message
    res.status(200).json({ message: 'Client successfully updated' });
  } catch (error) {
    // Log the error and send a generic server error response
    console.error("Error updating client:", error);
    res.status(500).send('Internal server error');
  }
};

export const remove = async (req, res) => {
  const { codice_cliente } = req.params;  // Extract the client ID from the URL parameters

  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Check if the user role is client and the user id is equal to the request id
    if(ROLE_NAME != user.ROLE_NAME && codice_cliente != user.CODICE_CLIENTE) {
      return res.status(403).send('Insufficient permission');
    }

    // Attempt to delete the client by their ID
    const rowsAffected = await deleteCliente(codice_cliente);

    // If no rows were affected, return a 404 Not Found error with a message
    if (rowsAffected === 0) {
      return res.status(404).send('Client not found');
    }

    // Respond with a success message indicating the client has been deleted
    res.status(200).json({ message: 'Client successfully deleted' });
  } catch (error) {
    // Log the error and send a generic server error response
    console.error("Error deleting client:", error);
    res.status(500).send('Internal server error');
  }
};