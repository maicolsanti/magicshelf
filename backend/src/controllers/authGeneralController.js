import { getUser, unsetUser } from "../utils/auth.js";

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