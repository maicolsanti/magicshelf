import bcrypt from 'bcrypt';
import { getUser, setUser, unsetUser } from "../utils/auth.js";
import { getClienteByEmail, insertCliente } from "../models/authClientiModel.js";

export const registerCliente = async (req, res) => {
    try {
        // Check if the user is already logged in
        const checklogout = getUser(req, res);
        if (checklogout) {
            res.status(401).send('This operation requires you to log out first');
            return;
        }

        // Extract the email from the request body
        const email = req.body.EMAIL;

        // Check if the email is already in use
        const rows = await getClienteByEmail(email);
        if (rows && rows.length > 0) {
            res.status(400).send('This email address is already in use');
            return;
        }

        // Hash the password before storing it in the database
        const password = req.body.PASSWORD_HASH;
        const passwordHash = await bcrypt.hash(password, 10);
        req.body.PASSWORD_HASH = passwordHash;

        // Insert the new client data into the database
        const result = await insertCliente(req.body);
        if (!(result.affectedRows > 0)) {
            throw new Error('An error occurred while inserting the data into the database');
        }
        
        // Retrieve the ID of the newly inserted client
        const id = result.insertId;

        // Fetch the client data by email
        const users = await getClienteByEmail(email);
        const userData = users[0];

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
        // Check if the user is already logged in
        const checklogout = getUser(req, res);
        if (checklogout) {
            res.status(401).send('This operation requires you to log out first');
            return;
        }

        // Extract the email from the request body
        const email = req.body.EMAIL;

        // Retrieve the client data by email
        const users = await getClienteByEmail(email);
        if (!users.length > 0) {
            res.status(400).send('User not registered');
            return;
        }

        // Get the first user from the retrieved data
        const user = users[0];

        // Compare the provided password with the stored hash
        const password = req.body.PASSWORD_HASH;
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

export const logoutCliente = async (req, res) => {
    try {
        // Check if the user is logged in
        const user = getUser(req, res);
        if (!user) {
            res.status(401).send('This operation requires you to be logged in');
            return;
        }

        // Unset the user session or authentication cookie
        unsetUser(req, res);

        // Send a success response
        res.json({ message: 'Logout successful' });
    } catch (error) {
        // Log the error and send a generic server error response
        console.error('Error during client logout:', error);
        res.status(500).send('Internal server error');
    }
};

export const getProfileCliente = async (req, res) => {
    try {
        // Retrieve the currently logged-in user's data from the session or cookie
        const user = getUser(req, res);

        // Check if the user is logged in
        if (!user) {
            res.status(401).send('You must be logged in to access your profile');
            return;
        }

        // Respond with the user's profile data
        res.json(user);
    } catch (error) {
        // Log the error and send a generic server error response
        console.error('Error retrieving client profile:', error);
        res.status(500).send('Internal server error');
    }
};
