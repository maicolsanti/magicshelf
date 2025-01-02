import { getAllFornitoriMateriali, getFornitoreMaterialiById } from '../models/materiali-fornitoriModel.js';

export const getAll = async (req, res) => {
    try {
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