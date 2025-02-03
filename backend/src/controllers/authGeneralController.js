import { getUser, unsetUser } from "../utils/auth.js";
import { getClienteById, updateCliente } from "../models/clientiModel.js";
import { getFornitoreById, updateFornitore } from "../models/fornitoriModel.js";
import { changePasswordSchema } from "../schemas/authGeneralSchemas.js";
import bcrypt from "bcrypt";

export const getProfile = async (req, res) => {
    try {
        // Retrieve the current logged-in user
        const user = getUser(req, res);

        // If no user is found, return a 401 Unauthorized error
        if (!user) {
            res.status(401).send('You must be logged in to view your profile');
            return;
        }

        // Respond with the user's profile data
        res.json(user);
    } catch (error) {
        // Log the error and send a generic server error response
        console.error('Error retrieving supplier profile:', error);
        res.status(500).send('Internal server error');
    }
};

export const logout = async (req, res) => {
    try {
        // Retrieve the current logged-in user
        const user = getUser(req, res);

        // Check if the user is logged in
        if (!user) {
            res.status(401).send('You must be logged in to log out');
            return;
        }

        // Unset the user session or authentication cookie
        unsetUser(req, res);

        // Respond with a success message
        res.json({ message: 'Logout successful' });
    } catch (error) {
        // Log the error and send a generic server error response
        console.error('Error during supplier logout:', error);
        res.status(500).send('Internal server error');
    }
};

export const changePassword = async (req, res) => {
    try {

        // Validate data
        const { error, value } = changePasswordSchema.validate(req.body, { stripUnknown: true });
    
        if (error) {
            // If validation error
            return res.status(400).json({
            stripUnknown: true,
            message: 'Validation error',
            details: error.details.map((detail) => detail.message),
            });
        }

        // Retrieve the current logged-in user
        const user = getUser(req, res);
        // Check if the user is logged in
        if (!user) {
            res.status(401).send('You must be logged in to change password');
            return;
        }

        // Get ID
        let userVal;;
        if(user.RUOLO == 'CLIENTE') {
            userVal = await getClienteById(user.CODICE_CLIENTE);
        } else {
            userVal = await getFornitoreById(user.CODICE_FORNITORE);
        }
        const currentPassword = userVal.PASSWORD_HASH;

        // Compare the provided password with the stored hashed password
        const correctPassword = await bcrypt.compare(value.OLD_PASSWORD, currentPassword);
        if (!correctPassword) {
            res.status(403).send('Incorrect credentials');
            return;
        }


        let rowsAffected;;
        // Update the password
        if(user.RUOLO == 'CLIENTE') {
            rowsAffected = updateCliente(user.CODICE_CLIENTE, {
                "PASSWORD_HASH": await bcrypt.hash(value.NEW_PASSWORD, 10)
            });
        } else {
            rowsAffected = updateFornitore(user.CODICE_FORNITORE, {
                "PASSWORD_HASH": await bcrypt.hash(value.NEW_PASSWORD, 10)
            });
        }

        // If no rows were affected, return a 404 error indicating the supplier was not found
        if (rowsAffected === 0) {
            throw new Error('Unexpected error');
        }
  
        // Return a success message if the supplier was updated
        res.status(200).json({ message: 'Password successfully updated' });

    } catch (error) {
        // Log any error that occurs during the update process
        console.error('Error occurred while updating password:', error);

        // Send a generic error message to the client
        res.status(500).send('Internal server error');
    }
}