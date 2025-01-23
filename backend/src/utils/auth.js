import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Call dotenv configuration to use environment variables
dotenv.config();

// Definition on JWT_SECRET and COOKIE_NAME const for authentication operation
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "magicshelf-access-token";

export const setUser = (req, res, user) => {
    // Create the access token with JWT
    const accessToken = jwt.sign(user, JWT_SECRET, { expiresIn: "1 day" });
    // Set the access token as cookie
    res.cookie(COOKIE_NAME, accessToken, {
        maxAge: 86400000, // 1 day in millisecond
        httpOnly: true,
        sameSite: true,
    });
};

export const getUser = (req, res) => {
    // Get the access token from the cookie
    const accessToken = req.cookies[COOKIE_NAME];
    // Get user data from the access token, if invalid return null
    if (!accessToken) return null;
    try {
        const user = jwt.verify(accessToken, JWT_SECRET);
        return user;
    } catch {
        return null;
    }
};

export const unsetUser = (req, res) => {
    // Delete the access token from the cookie
    res.clearCookie(COOKIE_NAME);
};