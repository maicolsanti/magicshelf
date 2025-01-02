import bcrypt from 'bcrypt';
import { getUser, setUser, unsetUser } from "../utils/auth.js";
import { getFornitoreByEmail, insertFornitore } from "../models/authFornitoriModel.js";

export const registerFornitore = async (req, res) => {
    try {
        // Check if the user is already logged in
        const checklogout = getUser(req, res);
        if (checklogout) {
            res.status(401).send('You must log out before registering a new account');
            return;
        }

        // Check if the "codice fiscale" is already in use
        const codice_fiscale = req.body.CODICE_FISCALE;
        const rows = await getFornitoreByEmail(codice_fiscale);
        if (rows && rows.length > 0) {
            res.status(400).send('The provided "codice fiscale" is already in use');
            return;
        }

        // Hash the provided password
        const password = req.body.PASSWORD_HASH;
        const passwordHash = await bcrypt.hash(password, 10);
        req.body.PASSWORD_HASH = passwordHash;

        // Insert the new fornitore into the database
        const result = await insertFornitore(req.body);
        if (!(result.affectedRows > 0)) {
            throw new Error('Error while inserting data into the database');
        }

        // Retrieve the newly registered fornitore by "codice fiscale"
        const id = result.insertId;
        const users = await getFornitoreByEmail(codice_fiscale);
        const userData = users[0];

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
        // Check if the user is already logged in
        const checklogout = getUser(req, res);
        if (checklogout) {
            res.status(401).send('You must log out before logging in again');
            return;
        }

        // Retrieve the fornitore using their "codice fiscale"
        const codice_fiscale = req.body.CODICE_FISCALE;
        const users = await getFornitoreByEmail(codice_fiscale);
        
        // Check if the user exists
        if (!users.length > 0) {
            res.status(400).send('Supplier not registered');
            return;
        }

        const user = users[0];
        
        // Compare the provided password with the stored hashed password
        const password = req.body.PASSWORD_HASH;
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

export const logoutFornitore = async (req, res) => {
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

export const getProfileFornitore = async (req, res) => {
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
