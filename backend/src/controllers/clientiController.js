import {
  getAllClienti,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../models/clientiModel.js';
import {
  getUser
} from '../utils/auth.js';

const ROLE_NAME = 'CLIENTE';

export const getAll = async (req, res) => {
  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Check if the user is authorized
    if(user.ROLE != ROLE_NAME) {
      res.status(403).send('Insufficient permission');
      return;
    }

    // Retrieve all clients from the database
    const clienti = await getAllClienti();

    // Respond with the list of clients
    res.json(clienti);
  } catch (error) {
    // Log the error and send a generic server error response
    console.error('Error retrieving clients data:', error);
    res.status(500).send('Internal server error');
  }
};

export const getById = async (req, res) => {
  const { codice_cliente } = req.params;

  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Check if the user is authorized
    if(user.ROLE != ROLE_NAME) {
      res.status(403).send('Insufficient permission');
      return;
    }

    // Retrieve the client by their ID from the database
    const cliente = await getClienteById(codice_cliente);

    // If no client is found, return a 404 Not Found error with a message
    if (!cliente) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Respond with the client data
    res.json(cliente);
  } catch (error) {
    // Log the error and send a generic server error response
    console.error('Error retrieving client:', error);
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

    // Check if the user is authorized
    if(user.ROLE != ROLE_NAME) {
      res.status(403).send('Insufficient permission');
      return;
    }

    // Create a new client using the provided custom data
    const id = await createCliente(custom_data);

    // Respond with a success message and the created client's ID
    res.json({ message: 'Client successfully created', id });
  } catch (error) {
    // Log the error and send a generic server error response
    console.error('Error creating client:', error);
    res.status(500).send('Internal server error');
  }
};

export const update = async (req, res) => {
  const { codice_cliente } = req.params;  // Extract the client ID from the URL parameters
  const { custom_data } = req.body;       // Extract the custom data from the request body

  try {
    const user = getUser(req, res);
    // Check if the user is logged in
    if (!user) {
      res.status(401).send('This operation requires you to be logged in');
      return;
    }

    // Check if the user is authorized
    if(user.ROLE != ROLE_NAME) {
      res.status(403).send('Insufficient permission');
      return;
    }

    // Update the client data based on the provided client ID and custom data
    const rowsAffected = await updateCliente(codice_cliente, custom_data);

    // If no rows were affected, return a 404 Not Found error with a message
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Respond with a success message
    res.json({ message: 'Client successfully updated' });
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

    // Check if the user is authorized
    if(user.ROLE != ROLE_NAME) {
      res.status(403).send('Insufficient permission');
      return;
    }

    // Attempt to delete the client by their ID
    const rowsAffected = await deleteCliente(codice_cliente);

    // If no rows were affected, return a 404 Not Found error with a message
    if (rowsAffected === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Respond with a success message indicating the client has been deleted
    res.json({ message: 'Client successfully deleted' });
  } catch (error) {
    // Log the error and send a generic server error response
    console.error("Error deleting client:", error);
    res.status(500).send('Internal server error');
  }
};