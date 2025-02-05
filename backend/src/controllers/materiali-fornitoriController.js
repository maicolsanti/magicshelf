import { getFornitoreMaterialiById, getFilteredFornitoreMateriali } from '../models/materiali-fornitoriModel.js';
import { getUser } from '../utils/auth.js';
import { getLocalitaByCap } from '../models/localitaModel.js';
import { getFilteredSchema } from '../schemas/materiali-fornitoriSchemas.js';
import multer from 'multer';

const ROLE_NAME = 'FORNITORE';

export const getById = async (req, res) => {
    const { codice_fornitore } = req.params; // Extract 'codice_fornitore' from request parameters
    try {
        const user = getUser(req, res);
        // Check if the user is logged in
        if (!user) {
            res.status(401).send('This operation requires you to be logged in');
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

export const getFiltered = async (req, res) => {
    try {

        // Validate data
        const { error, value } = getFilteredSchema.validate(req.body, { stripUnknown: true });

        if (error) {
            // If validation error
            return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((detail) => detail.message),
            });
        }

        const reqBody = value; // Get filter by request payload
        const start_locality = reqBody.ZONA_DI_PARTENZA;
        const localities = await getLocalitaByCap(start_locality);
        const locality = localities[0];

        const filters = Object.assign(reqBody, locality);

        const materials = await getFilteredFornitoreMateriali(filters);

        if (materials.length === 0) {
            return res.status(404).json({ message: 'No materials found with the given filters' });
        }

        res.status(200).json(materials); // Return results
    } catch (error) {
        console.error('Error while fetching filtered materials:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};