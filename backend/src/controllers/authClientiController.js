import bcrypt from 'bcrypt';
import { getUser, setUser } from "../utils/auth.js";
import { getClienteByEmail, insertCliente } from "../models/authClientiModel.js";
import { registerSchema, loginSchema } from "../schemas/authClientiSchemas.js";

const ROLE_NAME = 'CLIENTE';

export const registerCliente = async (req, res) => {
    try {
        // Validate data
        const { error, value } = registerSchema.validate(req.body);
    
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
            res.status(401).send('This operation requires you to log out first');
            return;
        }

        // Check if the email is already in use
        const rows = await getClienteByEmail(value.EMAIL);
        if (rows && rows.length > 0) {
            res.status(400).send('This email address is already in use');
            return;
        }

        // Hash the password before storing it in the database
        const password = value.PASSWORD_HASH;
        const passwordHash = await bcrypt.hash(password, 10);
        value.PASSWORD_HASH = passwordHash;

        // Insert the new client data into the database
        const result = await insertCliente(value);
        if (!(result.affectedRows > 0)) {
            throw new Error('An error occurred while inserting the data into the database');
        }
        
        // Retrieve the ID of the newly inserted client
        const id = result.insertId;

        // Fetch the client data by email
        const users = await getClienteByEmail(value.EMAIL);
        const userData = users[0];
        userData.RUOLO = ROLE_NAME;

        // Set the user session or authentication cookie
        setUser(req, res, userData);

        // Send a success response with the client ID
        res.json({ message: 'Client registration successful', id });
    } catch (error) {
        // Log the error and send a generic server error response
        console.error('Error during client registration:', error);
        res.status(500).send('Internal server error');
    }
};

export const loginCliente = async (req, res) => {
    try {

        // Validate data
        const { error, value } = loginSchema.validate(req.body);
    
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
            res.status(401).send('This operation requires you to log out first');
            return;
        }

        // Retrieve the client data by email
        const users = await getClienteByEmail(value.EMAIL);
        if (!users.length > 0) {
            res.status(400).send('User not registered');
            return;
        }

        // Get the first user from the retrieved data
        const user = users[0];

        // Compare the provided password with the stored hash
        const password = value.PASSWORD_HASH;
        const correctPassword = await bcrypt.compare(password, user.PASSWORD_HASH);
        if (!correctPassword) {
            res.status(403).send('Invalid credentials');
            return;
        }

        // Remove the password hash before sending the user data in the response
        delete user.PASSWORD_HASH;

        // Set the user session or authentication cookie
        setUser(req, res, user);

        // Send a success response
        res.json({ message: 'Login successful' });
    } catch (error) {
        // Log the error and send a generic server error response
        console.error('Error during client login:', error);
        res.status(500).send('Internal server error');
    }
};