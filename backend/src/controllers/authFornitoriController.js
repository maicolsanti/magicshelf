import bcrypt from 'bcrypt';
import { getUser, setUser } from "../utils/auth.js";
import { getFornitoreByEmail, insertFornitore } from "../models/authFornitoriModel.js";
import { registerSchema, loginSchema } from "../schemas/authFornitoriSchemas.js";

const SUPPLIER_NAME = 'FORNITORE';

export const registerFornitore = async (req, res) => {
    try {
        // Validate data
        const { error, value } = registerSchema.validate(req.body, { stripUnknown: true });
    
        if (error) {
            // If validation error
            return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((detail) => detail.message),
            });
        }

        // Check if the user is already logged in
        const checklogout = getUser(req, res);
        if (checklogout) {
            res.status(401).send('You must log out before registering a new account');
            return;
        }

        // Check if the "codice fiscale" is already in use
        const rows = await getFornitoreByEmail(value.CODICE_FISCALE);
        if (rows && rows.length > 0) {
            res.status(400).send('The provided "codice fiscale" is already in use');
            return;
        }

        // Hash the provided password
        const password = value.PASSWORD_HASH;
        const passwordHash = await bcrypt.hash(password, 10);
        value.PASSWORD_HASH = passwordHash;

        // Insert the new fornitore into the database
        const result = await insertFornitore(value);
        if (!(result.affectedRows > 0)) {
            throw new Error('Error while inserting data into the database');
        }

        // Retrieve the newly registered fornitore by "codice fiscale"
        const id = result.insertId;
        const users = await getFornitoreByEmail(value.CODICE_FISCALE);
        const userData = users[0];
        userData.RUOLO = SUPPLIER_NAME;

        // Set the user session or authentication cookie
        setUser(req, res, userData);

        // Respond with success message and newly created ID
        res.json({ message: 'Supplier registration successful', id });
    } catch (error) {
        // Log the error and send a generic server error response
        console.error('Error during supplier registration:', error);
        res.status(500).send('Internal server error');
    }
};

export const loginFornitore = async (req, res) => {
    try {

        // Validate data
        const { error, value } = loginSchema.validate(req.body, { stripUnknown: true });
    
        if (error) {
            // If validation error
            return res.status(400).json({
            message: 'Validation error',
            details: error.details.map((detail) => detail.message),
            });
        }

        // Check if the user is already logged in
        const checklogout = getUser(req, res);
        if (checklogout) {
            res.status(401).send('You must log out before logging in again');
            return;
        }

        // Retrieve the fornitore using their "codice fiscale"
        const users = await getFornitoreByEmail(value.CODICE_FISCALE);
        
        // Check if the user exists
        if (!users.length > 0) {
            res.status(400).send('Supplier not registered');
            return;
        }

        const user = users[0];
        
        // Compare the provided password with the stored hashed password
        const password = value.PASSWORD_HASH;
        const correctPassword = await bcrypt.compare(password, user.PASSWORD_HASH);
        if (!correctPassword) {
            res.status(403).send('Incorrect credentials');
            return;
        }

        // Remove the password from the response for security reasons
        delete user.PASSWORD_HASH;

        // Set the user session or authentication cookie
        setUser(req, res, user);

        // Respond with success message
        res.json({ message: 'Login successful' });
    } catch (error) {
        // Log the error and send a generic server error response
        console.error('Error during supplier login:', error);
        res.status(500).send('Internal server error');
    }
};