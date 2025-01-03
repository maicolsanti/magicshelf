import { getAllFornitoriMateriali, getFornitoreMaterialiById } from '../models/materiali-fornitoriModel.js';
import { getUser } from '../utils/auth.js';

const ROLE_NAME = 'FORNITORE';

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

        // Fetch all supplier materials from the database
        const fornitori_materiali = await getAllFornitoriMateriali();

        // Send the retrieved data as a JSON response
        res.json(fornitori_materiali);
    } catch (error) {
        // Log any error that occurs during the data retrieval process
        console.error('Error occurred while retrieving the supplier materials:', error);

        // Send a generic error message to the client
        res.status(500).send('Internal server error');
    }
};

export const getById = async (req, res) => {
    const { codice_fornitore } = req.params; // Extract 'codice_fornitore' from request parameters
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

        // Retrieve supplier material by its unique identifier (codice_fornitore)
        const fornitore_materiali = await getFornitoreMaterialiById(codice_fornitore);

        // If no supplier material is found, return a 404 response
        if (!fornitore_materiali) {
            return res.status(404).json({ message: 'Supplier material not found' });
        }

        // Send the supplier material data as a JSON response
        res.json(fornitore_materiali);
    } catch (error) {
        // Log any error that occurs during the retrieval process
        console.error('Error occurred while retrieving the supplier material:', error);

        // Send a generic error message to the client
        res.status(500).send('Internal server error');
    }
};